const express = require('express');
const router = express.Router();

const UsuarioController = require('../controllers/Usuario');

router.get('/Usuarios', UsuarioController.ListarUSuario);
router.post('/Usuarios', UsuarioController.CadastrarUsuario);
router.patch('/Usuario', UsuarioController.EditarUsuario);
router.delete('/Usuario', UsuarioController.ApagarUsuario);

module.exports = router;