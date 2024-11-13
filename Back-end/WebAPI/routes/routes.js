// const express = require('express');
import express from 'express';
const router = express.Router();

import { UsuarioController } from '../controllers/UsuarioController.js';
import { isProtected } from '../middleware/AuthMiddleware.js';
import userValidation from '../middleware/validations/UserValidationMiddleware.js';
import { ColaboradorController } from '../controllers/ColaboradoresController.js';
import SetorController from '../controllers/Setores.js';



router.get('/usuarios', UsuarioController.ListarUsuarios);
router.get('/usuarios/:id', UsuarioController.ListarUsuario)
router.post('/usuarios', UsuarioController.CadastrarUsuario);
router.patch('/Usuarios/:usu_id', UsuarioController.EditarUsuario);

router.delete('/usuarios/:id', UsuarioController.ApagarUsuario);
router.post('/usuario-info/', UsuarioController.getUserInfo)

router.post('/login', UsuarioController.Login)
router.get('/protected', isProtected(['admin']), UsuarioController.private)

router.get('/colaboradores', isProtected(['admin']), ColaboradorController.ListarColaboradores);
router.get('/colaboradores/:colaborador_id', ColaboradorController.ListarColaborador);
router.post('/colaboradores', ColaboradorController.CadastrarColaborador)

// router.post('/Colaboradores', ColaboradorController.CadastrarColaboradores);
// router.patch('/Colaboradores/:colaborador_id', ColaboradorController.EditarColaboradores);
// router.delete('/Colaboradores/:colaborador_id', ColaboradorController.ApagarColaboradores);

// router.get('/Empresa', EmpresaController.ListarEmpresa);
// router.post('/Empresa', EmpresaController.CadastrarEmpresa);
// router.patch('/Empresa/:empresa_id', EmpresaController.EditarEmpresa);
// router.delete('/Empresa/:empresa_id', EmpresaController.ApagarEmpresa);


// router.get('/Evento', EventoController.ListarEvento);
// router.post('/Evento', EventoController.CadastrarEvento);
// router.patch('/Evento/:evento_id', EventoController.EditarEvento);
// router.delete('/Evento/:evento_id', EventoController.ApagarEvento);


// router.get('/TipoUsuario', TipoUsuarioController.ListarTipoUSuario);
// router.post('/TipoUsuario', TipoUsuarioController.CadastrarTipoUsuario);
// router.patch('/TipoUsuario/:tipo_usuario_id', TipoUsuarioController.EditarTipoUsuario);
// router.delete('/TipoUsuario/:tipo_usuario_id', TipoUsuarioController.ApagarTipoUsuario);

router.get("/setores/:empresa_id", SetorController.ListarSetores)

export default router