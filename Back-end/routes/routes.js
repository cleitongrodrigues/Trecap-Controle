const express = require('express');
const router = express.Router();

const UsuarioController = require('../controllers/Usuario');
const ColaboradorController = require('../controllers/Colaboradores');
const EmpresaController = require('../controllers/Empresa');
const EventoController = require('../controllers/Eventos');
const RegistroController = require('../controllers/Registros');
const SetoresController = require('../controllers/Setores')

router.get('/Usuario', UsuarioController.ListarUSuario);
router.post('/Usuario', UsuarioController.CadastrarUsuario);
router.patch('/Usuario/:usu_id', UsuarioController.EditarUsuario);
router.delete('/Usuario/:usu_id', UsuarioController.ApagarUsuario);

router.get('/Colaboradores', ColaboradorController.ListarColaboradores);
router.post('/Colaboradores', ColaboradorController.CadastrarColaboradores);
router.patch('/Colaboradores/:colaborador_id', ColaboradorController.EditarColaboradores);
router.delete('/Colaboradores/:colaborador_id', ColaboradorController.ApagarColaboradores);

router.get('/Empresa', EmpresaController.ListarEmpresa);
router.post('/Empresa', EmpresaController.CadastrarEmpresa);
router.patch('/Empresa/:empresa_id', EmpresaController.EditarEmpresa);
router.delete('/Empresa/:empresa_id', EmpresaController.ApagarEmpresa);

router.get('/Evento', EventoController.ListarEvento);
router.post('/Evento', EventoController.CadastrarEvento);
router.patch('/Evento/:evento_id', EventoController.EditarEvento);
router.delete('/Evento/:evento_id', EventoController.ApagarEvento);

router.get('/Registro', RegistroController.ListarRegistros);
router.post('/Registro', RegistroController.CadastrarRegistros);
router.patch('/Registro/:registros_id', RegistroController.EditarRegistros);
router.delete('/Registro/:registros_id', RegistroController.ApagarRegistros);

router.get('/Setores/:empresa_id', SetoresController.ListarSetores);
module.exports = router;