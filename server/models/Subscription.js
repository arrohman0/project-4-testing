import mongoose from 'mongoose';

const { Schema } = mongoose;

const SubscriptionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    plan: {
      type: String,
      enum: ['monthly', 'yearly'],
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'canceled', 'expired'],
      default: 'active',
    },
    startDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    endDate: {
      type: Date,
      required: true,
    },
    autoRenew: {
      type: Boolean,
      default: true,
    },
    paymentMethod: {
      type: String,
    },
    transactionId: {
      type: String,
    },
  },
  { timestamps: true }
);

const Subscription = mongoose.model('Subscription', SubscriptionSchema);

export default Subscription;