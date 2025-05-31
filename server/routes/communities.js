import express from 'express';
import Community from '../models/Community.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/communities
// @desc    Get all communities (with pagination and filters)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Build filter object
    const filter = {};
    
    if (req.query.category) {
      filter.category = req.query.category;
    }
    
    if (req.query.isPrivate !== undefined) {
      filter.isPrivate = req.query.isPrivate === 'true';
    }
    
    const communities = await Community.find(filter)
      .populate('owner', 'name avatar')
      .select('-posts -polls -passcode')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    
    const total = await Community.countDocuments(filter);
    
    res.status(200).json({
      communities,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get communities error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/communities
// @desc    Create a new community
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { name, description, category, image, isPrivate, passcode } = req.body;
    
    // Check if community already exists
    const communityExists = await Community.findOne({ name });
    if (communityExists) {
      return res.status(400).json({ message: 'Community with that name already exists' });
    }
    
    // Create new community
    const community = await Community.create({
      name,
      description,
      category,
      image,
      owner: req.user.id,
      moderators: [req.user.id],
      members: [req.user.id],
      isPrivate: isPrivate || false,
      passcode: isPrivate ? passcode : undefined,
    });
    
    res.status(201).json(community);
  } catch (error) {
    console.error('Create community error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/communities/:id
// @desc    Get community by ID
// @access  Public (for basic info) / Private (for private communities)
router.get('/:id', async (req, res) => {
  try {
    const community = await Community.findById(req.params.id)
      .populate('owner', 'name avatar')
      .populate('moderators', 'name avatar')
      .populate('members', 'name avatar')
      .populate({
        path: 'posts',
        populate: {
          path: 'author',
          select: 'name avatar',
        },
      })
      .select('-passcode');
    
    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }
    
    // Check if the community is private
    if (community.isPrivate) {
      // If user is not authenticated, return limited info
      if (!req.user) {
        return res.status(200).json({
          _id: community._id,
          name: community.name,
          description: community.description,
          category: community.category,
          image: community.image,
          owner: community.owner,
          isPrivate: community.isPrivate,
          membersCount: community.members.length,
        });
      }
      
      // Check if user is a member
      const isMember = community.members.some(member => 
        member._id.toString() === req.user.id
      );
      
      if (!isMember) {
        return res.status(200).json({
          _id: community._id,
          name: community.name,
          description: community.description,
          category: community.category,
          image: community.image,
          owner: community.owner,
          isPrivate: community.isPrivate,
          membersCount: community.members.length,
        });
      }
    }
    
    res.status(200).json(community);
  } catch (error) {
    console.error('Get community error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/communities/:id/join
// @desc    Join a community
// @access  Private
router.post('/:id/join', protect, async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);
    
    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }
    
    // Check if user is already a member
    if (community.members.includes(req.user.id)) {
      return res.status(400).json({ message: 'You are already a member of this community' });
    }
    
    // If community is private, verify passcode
    if (community.isPrivate) {
      const { passcode } = req.body;
      
      // Get community with passcode
      const communityWithPasscode = await Community.findById(req.params.id).select('+passcode');
      
      if (!passcode || passcode !== communityWithPasscode.passcode) {
        return res.status(401).json({ message: 'Invalid passcode' });
      }
    }
    
    // Add user to members
    community.members.push(req.user.id);
    await community.save();
    
    res.status(200).json({ message: 'Successfully joined the community' });
  } catch (error) {
    console.error('Join community error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/communities/:id/posts
// @desc    Create a post in a community
// @access  Private (only members)
router.post('/:id/posts', protect, async (req, res) => {
  try {
    const { content, media } = req.body;
    
    const community = await Community.findById(req.params.id);
    
    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }
    
    // Check if user is a member
    if (!community.members.includes(req.user.id)) {
      return res.status(403).json({ message: 'You must be a member to post in this community' });
    }
    
    // Create new post
    const newPost = {
      author: req.user.id,
      content,
      media: media || [],
    };
    
    community.posts.unshift(newPost);
    await community.save();
    
    // Populate author details
    const updatedCommunity = await Community.findById(req.params.id)
      .populate({
        path: 'posts',
        populate: {
          path: 'author',
          select: 'name avatar',
        },
      });
    
    res.status(201).json(updatedCommunity.posts[0]);
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add more routes for community management, posts, comments, etc.

export default router;