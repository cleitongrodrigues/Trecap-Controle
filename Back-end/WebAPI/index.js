// const express = require('express');

// const cors = require('cors');

// const router = require('./routes/routes');
import app from "./appConfig.js";

const porta = 3333;

app.listen(porta, () => {
    console.log(`Servidor iniciado na porta ${porta}`);
});
