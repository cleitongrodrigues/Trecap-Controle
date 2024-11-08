const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const path = require("path");

const router = require("./routes/routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

const porta = 3333;

console.log(path.join(__dirname, 'public/images'))

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/public/images/:fileName', (req, res) => {
  console.log("ASsa")
  const { fileName } = req.params
  res.sendFile(path.join(__dirname, 'public/images', fileName));
});

app.listen(porta, () => {
  console.log(`Servidor iniciado na porta ${porta}`);
});

app.get("/", (request, response) => {
  response.send("Hello World");
});
