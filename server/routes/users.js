import express from 'express';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/users
// @desc    Get all users (with pagination)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .select('-password')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments();

    res.status(200).json({
      users,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
  try {
    const {
      name,
      bio,
      title,
      location,
      skills,
      socialLinks,
    } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        name,
        bio,
        title,
        location,
        skills: Array.isArray(skills) ? skills : skills.split(',').map(skill => skill.trim()),
        socialLinks,
      },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/users/education
// @desc    Add education to profile
// @access  Private
router.put('/education', protect, async (req, res) => {
  try {
    const {
      institution,
      degree,
      field,
      startDate,
      endDate,
      current,
      description,
    } = req.body;

    const newEducation = {
      institution,
      degree,
      field,
      startDate,
      endDate: current ? undefined : endDate,
      current: current || false,
      description,
    };

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.education.unshift(newEducation);
    await user.save();

    res.status(200).json(user.education);
  } catch (error) {
    console.error('Add education error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/users/experience
// @desc    Add experience to profile
// @access  Private
router.put('/experience', protect, async (req, res) => {
  try {
    const {
      company,
      position,
      location,
      startDate,
      endDate,
      current,
      description,
    } = req.body;

    const newExperience = {
      company,
      position,
      location,
      startDate,
      endDate: current ? undefined : endDate,
      current: current || false,
      description,
    };

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.experience.unshift(newExperience);
    await user.save();

    res.status(200).json(user.experience);
  } catch (error) {
    console.error('Add experience error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/users/achievement
// @desc    Add achievement to profile
// @access  Private
router.put('/achievement', protect, async (req, res) => {
  try {
    const { title, date, description, url } = req.body;

    const newAchievement = {
      title,
      date,
      description,
      url,
    };

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.achievements.unshift(newAchievement);
    await user.save();

    res.status(200).json(user.achievements);
  } catch (error) {
    console.error('Add achievement error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add more routes for updating education, experience, achievements, etc.

export default router;