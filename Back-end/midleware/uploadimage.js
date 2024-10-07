const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
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
module.exports = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 5, // Imagem de no maximo 5mb
  },
  fileFilter: fileFilter,
});
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/'); // Diretório onde as imagens serão armazenadas
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, uniqueSuffix + path.extname(file.originalname)); // Nome do arquivo
//     }
// });

// const upload = multer({ storage: storage });

// module.exports = upload;
