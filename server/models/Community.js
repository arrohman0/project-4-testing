import mongoose from 'mongoose';

const { Schema } = mongoose;

// Comment schema
const CommentSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: [true, 'Comment content is required'],
      trim: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

// Post schema
const PostSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: [true, 'Post content is required'],
      trim: true,
    },
    media: [
      {
        type: String,
      },
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    comments: [CommentSchema],
  },
  { timestamps: true }
);

// Poll option schema
const PollOptionSchema = new Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  votes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

// Poll schema
const PollSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    options: [PollOptionSchema],
    expiresAt: {
      type: Date,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

// Community schema
const CommunitySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Community name is required'],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Community description is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Community category is required'],
      trim: true,
    },
    image: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    moderators: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    isPrivate: {
      type: Boolean,
      default: false,
    },
    passcode: {
      type: String,
      select: false,
    },
    posts: [PostSchema],
    polls: [PollSchema],
  },
  { timestamps: true }
);

const Community = mongoose.model('Community', CommunitySchema);

export default Community;