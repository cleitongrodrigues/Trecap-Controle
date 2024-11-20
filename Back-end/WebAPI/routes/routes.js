// const express = require('express');
import express from 'express';
const router = express.Router();

import { UsuarioController } from '../controllers/UsuarioController.js';
import { isProtected } from '../middleware/AuthMiddleware.js';
import userValidation from '../middleware/validations/UserValidationMiddleware.js';
import { ColaboradorController } from '../controllers/ColaboradoresController.js';
import SetorController from '../controllers/Setores.js';
import upload from '../../midleware/uploadimage.js';



router.get('/usuarios', UsuarioController.ListarUsuarios);
router.get('/usuarios/:id', UsuarioController.ListarUsuario)
router.post('/usuarios', UsuarioController.CadastrarUsuario);
router.patch('/usuario/:usu_id', UsuarioController.EditarUsuario);
router.patch("/usuario/:usu_id/image", upload.single('img'), UsuarioController.CadastrarImagem)

router.delete('/usuarios/:id', UsuarioController.ApagarUsuario);
router.post('/usuario-info/', UsuarioController.getUserInfo)

router.post('/login', UsuarioController.Login)
router.get('/verify-token', UsuarioController.verifyToken)
router.get('/protected', isProtected(['admin']), UsuarioController.private)

router.get('/colaboradores', isProtected(['admin']), ColaboradorController.ListarColaboradores);
router.get('/colaboradores/:colaborador_id', ColaboradorController.ListarColaborador);
router.post('/colaboradores', ColaboradorController.CadastrarColaborador)
router.delete('/colaboradores/:colaborador_id', ColaboradorController.ApagarColaborador)
router.patch('/colaboradores', ColaboradorController.AtualizarColaborador)

// router.get('/Empresa', EmpresaController.ListarEmpresa);
// router.post('/Empresa', EmpresaController.CadastrarEmpresa);
// router.patch('/Empresa/:empresa_id', EmpresaController.EditarEmpresa);
// router.delete('/Empresa/:empresa_id', EmpresaController.ApagarEmpresa);


// router.get('/Evento', EventoController.ListarEvento);
// router.post('/Evento', EventoController.CadastrarEvento);
// router.patch('/Evento/:evento_id', EventoController.EditarEvento);
// router.delete('/Evento/:evento_id', EventoController.ApagarEvento);

router.get("/setores/:empresa_id", SetorController.ListarSetores)
router.post("/setores/:empresa_id", SetorController.CadastrarSetores)

export default router