const cloudinary = require('../config/cloudinary.js');
const Resume = require('../models/Resume.model.js');
const ApiError = require('../utils/ApiError.js');

const uploadToCloudinary = (fileBuffer, folder = 'resumes') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto',
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    uploadStream.end(fileBuffer);
  });
};

const uploadResume = async ({ userId, file }) => {
  const existingCount = await Resume.countDocuments({ userId });
  const version = existingCount + 1;

  const cloudResult = await uploadToCloudinary(file.buffer);

  const resume = await Resume.create({
    userId,
    fileName: file.originalname,
    cloudinaryUrl: cloudResult.secure_url,
    cloudinaryPublicId: cloudResult.public_id,
    version,
  });

  return resume;
};

const listResumes = async ({ userId }) => {
  const resumes = await Resume.find({ userId }).sort({ version: -1 });
  return resumes;
};

const deleteResume = async ({ userId, id }) => {
  const resume = await Resume.findOne({ _id: id, userId });
  if (!resume) {
    throw new ApiError(404, 'Resume not found');
  }

  let cloudResult = await cloudinary.uploader.destroy(
    resume.cloudinaryPublicId,
    {
      resource_type: 'image',
      invalidate: true,
    }
  );

  if (cloudResult.result !== 'ok') {
    cloudResult = await cloudinary.uploader.destroy(resume.cloudinaryPublicId, {
      resource_type: 'raw',
      invalidate: true,
    });
  }
  console.log('Cloudinary Deletion Response:', cloudResult);

  if (cloudResult.result !== 'ok' && cloudResult.result !== 'not found') {
    throw new ApiError(
      (500, `Failed to delete file from Cloudinary: ${cloudResult.result}`)
    );
  }

  const result = await Resume.findOneAndDelete({ _id: id, userId });
  return result;
};

module.exports = { uploadResume, listResumes, deleteResume };
