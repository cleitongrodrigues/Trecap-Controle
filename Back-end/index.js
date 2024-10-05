const express = require("express");

const cors = require("cors");

const multer = require("multer");

const path = require("path");

const router = require("./routes/routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

const porta = 3333;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const userCode = req.body.userCode;
    cb(null, `${userCode}--${Date.now()}--${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post("/upload/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: "Nenhum arquivo foi enviado!" });
  }

  const imagePath = `/uploads/${req.file.filename}`;
  res.send({ imagePath });
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(porta, () => {
  console.log(`Servidor iniciado na porta ${porta}`);
});

app.get("/", (request, response) => {
  response.send("Hello World");
});
