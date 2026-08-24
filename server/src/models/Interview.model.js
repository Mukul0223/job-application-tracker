const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema(
  {
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    scheduledAt: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      enum: ['Phone', 'Technical', 'Onsite', 'Final', 'Other'],
    },
    interviewerName: String,
    notes: String,
    outcome: {
      type: String,
      enum: ['Passed', 'Pending', 'Failed'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

interviewSchema.index({ userId: 1, scheduledAt: 1 });

interviewSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject._id = returnedObject._id.toString();
    delete returnedObject.__v;
    return returnedObject;
  },
});

const Interview = mongoose.model('Interview', interviewSchema);
module.exports = Interview;
