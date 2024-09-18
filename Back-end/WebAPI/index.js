// const express = require('express');

// const cors = require('cors');

// const router = require('./routes/routes');
import express from 'express';
import cors from 'cors';
import router from './routes/routes.js';


const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

const porta = 3333;

app.listen(porta, () => {
    console.log(`Servidor iniciado na porta ${porta}`);
});

app.get('/', (request, response) => {
    response.send('Hello World')
});