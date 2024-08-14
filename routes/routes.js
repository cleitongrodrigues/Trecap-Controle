const express = require('express');
const router = express.Router();

const UsuarioController = require('../controllers/Usuario');

router.get('/Usuarios', UsuarioController.ListarUSuario);

module.exports = router;