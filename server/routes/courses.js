import express from 'express';
import Course from '../models/Course.js';
import Subscription from '../models/Subscription.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/courses
// @desc    Get all courses (with pagination and filters)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Build filter object
    const filter = {
      isPublished: true, // Only return published courses
    };
    
    if (req.query.category) {
      filter.category = req.query.category;
    }
    
    if (req.query.isPaid !== undefined) {
      filter.isPaid = req.query.isPaid === 'true';
    }
    
    if (req.query.instructor) {
      filter.instructor = req.query.instructor;
    }
    
    const courses = await Course.find(filter)
      .populate('instructor', 'name avatar')
      .select('-content')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    
    const total = await Course.countDocuments(filter);
    
    res.status(200).json({
      courses,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/courses
// @desc    Create a new course
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      image,
      price,
      isPaid,
      content,
      isPublished,
    } = req.body;
    
    // Create new course
    const course = await Course.create({
      title,
      description,
      instructor: req.user.id,
      category,
      image,
      price: price || 0,
      isPaid: isPaid || false,
      content: content || [],
      isPublished: isPublished || false,
    });
    
    res.status(201).json(course);
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/courses/:id
// @desc    Get course by ID
// @access  Public (for basic info) / Private (for content if paid)
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'name avatar bio title')
      .populate({
        path: 'reviews',
        populate: {
          path: 'user',
          select: 'name avatar',
        },
      });
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // If course is not published and user is not the instructor, return 404
    if (!course.isPublished && (!req.user || req.user.id !== course.instructor._id.toString())) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // If course is paid, check if user has access
    if (course.isPaid) {
      // If user is not authenticated, return limited info
      if (!req.user) {
        return res.status(200).json({
          _id: course._id,
          title: course.title,
          description: course.description,
          instructor: course.instructor,
          category: course.category,
          image: course.image,
          price: course.price,
          isPaid: course.isPaid,
          rating: course.rating,
          reviews: course.reviews,
          createdAt: course.createdAt,
          updatedAt: course.updatedAt,
          // Only include free content or first lesson previews
          content: course.content.map(section => ({
            ...section.toObject(),
            lessons: section.lessons.filter(lesson => lesson.isFree || lesson.order === 1),
          })),
        });
      }
      
      // Check if user is the instructor
      const isInstructor = course.instructor._id.toString() === req.user.id;
      
      // Check if user has purchased the course
      const hasPurchased = course.students.includes(req.user.id);
      
      // Check if user has an active subscription
      const hasSubscription = await Subscription.findOne({
        user: req.user.id,
        status: 'active',
        endDate: { $gt: new Date() },
      });
      
      if (!isInstructor && !hasPurchased && !hasSubscription) {
        return res.status(200).json({
          _id: course._id,
          title: course.title,
          description: course.description,
          instructor: course.instructor,
          category: course.category,
          image: course.image,
          price: course.price,
          isPaid: course.isPaid,
          rating: course.rating,
          reviews: course.reviews,
          createdAt: course.createdAt,
          updatedAt: course.updatedAt,
          // Only include free content or first lesson previews
          content: course.content.map(section => ({
            ...section.toObject(),
            lessons: section.lessons.filter(lesson => lesson.isFree || lesson.order === 1),
          })),
        });
      }
    }
    
    res.status(200).json(course);
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/courses/:id/reviews
// @desc    Add a review to a course
// @access  Private (only enrolled students)
router.post('/:id/reviews', protect, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    // Validate rating
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }
    
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Check if user is enrolled in the course
    if (!course.students.includes(req.user.id)) {
      return res.status(403).json({ message: 'You must be enrolled in the course to leave a review' });
    }
    
    // Check if user has already reviewed this course
    const alreadyReviewed = course.reviews.find(
      review => review.user.toString() === req.user.id
    );
    
    if (alreadyReviewed) {
      return res.status(400).json({ message: 'You have already reviewed this course' });
    }
    
    // Create new review
    const newReview = {
      user: req.user.id,
      rating: Number(rating),
      comment,
    };
    
    course.reviews.push(newReview);
    
    // Update course rating
    course.rating =
      course.reviews.reduce((sum, review) => sum + review.rating, 0) /
      course.reviews.length;
    
    await course.save();
    
    // Populate user details in reviews
    const updatedCourse = await Course.findById(req.params.id).populate({
      path: 'reviews',
      populate: {
        path: 'user',
        select: 'name avatar',
      },
    });
    
    res.status(201).json(updatedCourse.reviews);
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/courses/:id/enroll
// @desc    Enroll in a course
// @access  Private
router.post('/:id/enroll', protect, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Check if user is already enrolled
    if (course.students.includes(req.user.id)) {
      return res.status(400).json({ message: 'You are already enrolled in this course' });
    }
    
    // If course is paid, handle payment (placeholder for now)
    if (course.isPaid) {
      // For now, just check if user has subscription
      const hasSubscription = await Subscription.findOne({
        user: req.user.id,
        status: 'active',
        endDate: { $gt: new Date() },
      });
      
      if (!hasSubscription) {
        // Here you would typically process payment
        // This is just a placeholder
        console.log('Processing payment for course enrollment');
      }
    }
    
    // Add user to students
    course.students.push(req.user.id);
    await course.save();
    
    res.status(200).json({ message: 'Successfully enrolled in the course' });
  } catch (error) {
    console.error('Enroll in course error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add more routes for course management, content, etc.

export default router;