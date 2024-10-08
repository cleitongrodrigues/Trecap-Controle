const express = require("express");

const cors = require("cors");
const bodyParser = require('body-parser');

const path = require("path");

const router = require("./routes/routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
app.use(bodyParser.urlencoded({ extended: true }));

const porta = 3333;

console.log(path.join(__dirname, 'public/images'))
app.use('public', express.static(path.join(__dirname, 'public/images')));

app.listen(porta, () => {
  console.log(`Servidor iniciado na porta ${porta}`);
});

app.get('/public/images/:fileName', (req, res) => {
  const { fileName } = req.params
  res.sendFile(path.join(__dirname, 'public/images', fileName));
});

app.get("/", (request, response) => {
  response.send("Hello World");
});
