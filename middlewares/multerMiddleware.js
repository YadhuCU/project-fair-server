const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    const fileName = `image-${Date.now()}-${file.originalname}`;
    callback(null, fileName);
  },
});

const multerFileFilter = (req, file, callback) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
    return callback(
      new Error(
        "Please upload files in the following extenstions: jpeg, jpg, png",
      ),
    );
  }
};

const multerConfig = multer({
  storage: multerStorage,
  fileFilter: multerFileFilter,
});

module.exports = multerConfig;
