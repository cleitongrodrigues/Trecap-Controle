const express = require('express');
const router = express.Router();

const UsuarioController = require('../controllers/Usuario');
const ColaboradorController = require('../controllers/Colaboradores');
const EventoController = require('../controllers/Eventos');
const EventoTurmaController = require('../controllers/EventoTurma');
const TipoUsuarioController = require('../controllers/TipoUsuario');
const TurmaController = require('../controllers/Turma');
const TurmaColaboradoresController = require('../controllers/TurmaColaboradores');

router.get('/Usuarios', UsuarioController.ListarUSuario);
router.post('/Usuarios', UsuarioController.CadastrarUsuario);
router.patch('/Usuarios/:usu_id', UsuarioController.EditarUsuario);
router.delete('/Usuarios/:usu_id', UsuarioController.ApagarUsuario);

router.get('/Colaboradores', ColaboradorController.ListarColaboradores);
router.post('/Colaboradores', ColaboradorController.CadastrarColaboradores);
router.patch('/Colaboradores/:colaborador_id', ColaboradorController.EditarColaboradores);
router.delete('/Colaboradores/:colaborador_id', ColaboradorController.ApagarColaboradores);

router.get('/Evento', EventoController.ListarEvento);
router.post('/Evento', EventoController.CadastrarEvento);
router.patch('/Evento/:evento_id', EventoController.EditarEvento);
router.delete('/Evento/:evento_id', EventoController.ApagarEvento);

router.get('/EventoTurma', EventoTurmaController.ListarEventoTurma);
router.post('/EventoTurma', EventoTurmaController.CadastrarEventoTurma);
router.patch('/EventoTurma/:evento_turma_id', EventoTurmaController.EditarEventoTurma);
router.delete('/EventoTurma/:evento_turma_id', EventoTurmaController.ApagarEventoTurma);

router.get('/TipoUsuario', TipoUsuarioController.ListarTipoUSuario);
router.post('/TipoUsuario', TipoUsuarioController.CadastrarTipoUsuario);
router.patch('/TipoUsuario/:tipo_usuario_id', TipoUsuarioController.EditarTipoUsuario);
router.delete('/TipoUsuario/:tipo_usuario_id', TipoUsuarioController.ApagarTipoUsuario);

router.get('/Turma', TurmaController.ListarTurma);
router.post('/Turma', TurmaController.CadastrarTurma);
router.patch('/Turma/:turma_id', TurmaController.EditarTurma);
router.delete('/Turma/:turma_id', TurmaController.ApagarTurma);

router.get('/TurmaColaboradores', TurmaColaboradoresController.ListarTurmaColaboradores);
router.post('/TurmaColaboradores', TurmaColaboradoresController.CadastrarTurmaColaboradores);
router.patch('/TurmaColaboradores/:turma_colaboradores_id', TurmaColaboradoresController.EditarTurmaColaboradores);
router.delete('/TurmaColaboradores/:turma_colaboradores_id', TurmaColaboradoresController.ApagarTurmaColaboradores);

module.exports = router;