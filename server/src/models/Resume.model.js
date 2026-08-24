const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fileName: { type: String, required: true },
    cloudinaryUrl: {
      type: String,
      required: true,
    },
    cloudinaryPublicId: {
      type: String,
      required: true,
    },
    version: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

resumeSchema.index({ userId: 1 });

resumeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject._id = returnedObject._id.toString();
    delete returnedObject.__v;
    return returnedObject;
  },
});

const Resume = mongoose.model('Resume', resumeSchema);
module.exports = Resume;
