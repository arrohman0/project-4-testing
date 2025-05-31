import mongoose from 'mongoose';

const { Schema } = mongoose;

// Lesson schema
const LessonSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Lesson title is required'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  type: {
    type: String,
    enum: ['video', 'text', 'quiz', 'assignment'],
    required: true,
  },
  duration: {
    type: Number, // in minutes
    default: 0,
  },
  videoUrl: {
    type: String,
  },
  content: {
    type: String,
  },
  isFree: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    required: true,
  },
});

// Content section schema
const ContentSectionSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Section title is required'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  lessons: [LessonSchema],
});

// Review schema
const ReviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: [true, 'Review comment is required'],
      trim: true,
    },
  },
  { timestamps: true }
);

// Course schema
const CourseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Course title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Course description is required'],
      trim: true,
    },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: String,
      required: [true, 'Course category is required'],
      trim: true,
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    content: [ContentSectionSchema],
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    rating: {
      type: Number,
      default: 0,
    },
    reviews: [ReviewSchema],
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Calculate average rating when reviews are modified
CourseSchema.pre('save', function (next) {
  if (this.reviews.length > 0) {
    this.rating =
      this.reviews.reduce((sum, review) => sum + review.rating, 0) /
      this.reviews.length;
  }
  next();
});

const Course = mongoose.model('Course', CourseSchema);

export default Course;