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

app.use('/uploads', express.static('uploads'));




app.listen(porta, () => {
  console.log(`Servidor iniciado na porta ${porta}`);
});

app.get("/", (request, response) => {
  response.send("Hello World");
});
