const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    location: String,
    salary: {
      min: {
        type: Number,
        min: [0, 'Minimum salary cannot be negative'],
      },
      max: {
        type: Number,
        min: [0, 'Maximum salary cannot be negative'],
      },
      currency: {
        type: String,
        default: 'USD',
        uppercase: true,
        trim: true,
      },
    },
    jobUrl: String,
    status: {
      type: String,
      enum: [
        'Wishlist',
        'Applied',
        'Screening',
        'Interview',
        'Offer',
        'Rejected',
      ],
      default: 'Wishlist',
      required: true,
    },
    applicationDate: {
      type: Date,
    },
    recruiterName: String,
    recruiterEmail: {
      type: String,
      lowercase: true,
      trim: true,
    },
    notes: String,
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume',
      required: false,
    },
  },
  { timestamps: true }
);

// Compound Indexes for fast user queries
applicationSchema.index({ userId: 1, status: 1 });
applicationSchema.index({ userId: 1, applicationDate: -1 });
applicationSchema.index({ userId: 1, companyName: 1 });

applicationSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject._id = returnedObject._id.toString();
    delete returnedObject.__v;
    return returnedObject;
  },
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
