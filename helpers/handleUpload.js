const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const handleUpload = async file => {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: 'auto',
  });
  return res;
};

module.exports = handleUpload;
