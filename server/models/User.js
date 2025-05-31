import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;

// Education schema
const EducationSchema = new Schema({
  institution: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  field: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  current: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
  },
});

// Experience schema
const ExperienceSchema = new Schema({
  company: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  current: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
  },
});

// Achievement schema
const AchievementSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
  },
  url: {
    type: String,
  },
});

// Social links schema
const SocialLinksSchema = new Schema({
  website: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  twitter: {
    type: String,
  },
  github: {
    type: String,
  },
  youtube: {
    type: String,
  },
  instagram: {
    type: String,
  },
});

// Verification status schema
const VerificationStatusSchema = new Schema({
  identity: {
    type: Boolean,
    default: false,
  },
  education: {
    type: Boolean,
    default: false,
  },
  professional: {
    type: Boolean,
    default: false,
  },
});

// User schema
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false,
    },
    role: {
      type: String,
      enum: ['professional', 'student', 'educator', 'recruiter', 'company', 'admin'],
      default: 'professional',
    },
    avatar: {
      type: String,
    },
    bio: {
      type: String,
    },
    title: {
      type: String,
    },
    location: {
      type: String,
    },
    education: [EducationSchema],
    experience: [ExperienceSchema],
    skills: [String],
    achievements: [AchievementSchema],
    socialLinks: SocialLinksSchema,
    verified: {
      type: Boolean,
      default: false,
    },
    verificationStatus: {
      type: VerificationStatusSchema,
      default: {},
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', UserSchema);

export default User;