import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, "./public/images");
    cb(null, path.join(__dirname, 'public', 'images'));
  },
  filename: function (req, file, cb) {
    //let data = new Date().toISOString().replace(/:/g, '-') + '-';
    //let data = Date.now().toString();
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // identificar extensão
    const ext =
      file.mimetype === "image/jpeg"
        ? "jpeg"
        : file.mimetype.slice(file.mimetype.length - 3);
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + ext);
    //cb(null, data + '_' + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

export default upload
