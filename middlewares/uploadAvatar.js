const multer = require('multer');
const handleUpload = require('../helpers/handleUpload');

const storage = multer.memoryStorage();
const upload = multer({ storage });
const myUploadMiddleware = upload.single('avatar');

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, result => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

const uploadAvatar = async (req, res, next) => {
  try {
    await runMiddleware(req, res, myUploadMiddleware);

    if (!req.file) {
      req.body.avatarURL = req.body.avatar;
      delete req.body.avatar;
      return next();
    }

    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;
    const cldRes = await handleUpload(dataURI);

    req.body.avatarURL = cldRes.url;

    next();
  } catch (error) {
    console.log(error);
    res.send({
      message: error.message,
    });
  }
};

module.exports = uploadAvatar;
