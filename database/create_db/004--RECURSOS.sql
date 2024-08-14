    -- SELECT DE TODOS CAMPOS --
SELECT * FROM TipoUsuario;
SELECT tipo_usuario_id, tipo_usuario_descricao, tipo_usuario_ativo FROM TipoUsuario;

SELECT * FROM Usuario;
SELECT usu_id, usu_nome, usu_CPF, tipo_usuario_id FROM Usuario;

SELECT * FROM Eventos;
SELECT evento_id, evento_nome, evento_data, evento_local, evento_hora_inicio, evento_hora_termino FROM Eventos;

SELECT * FROM Turma;
SELECT turma_id, turma_descricao FROM Turma;

SELECT * FROM Colaboradores;
SELECT colaborador_id, colaborador_nome, colaborador_CPF, colaborador_endereco, colaborador_biometria FROM Colaboradores;

SELECT * FROM EventoTurma;
SELECT evento_turma_id, evento_id, turma_id FROM EventoTurma;

SELECT * FROM TurmaColaboradores;
SELECT turma_colaboradores_id, turma_id, colaborador_id, turma_colaboradores_comparecimento, usu_id, turma_colaboradores_assinatura FROM TurmaColaboradores;

 -- DROP DE TODOS OS CAMPOS EM ORDEM CORRETA
DROP TABLE TurmaColaboradores;
DROP TABLE EventoTurma;
DROP TABLE Colaboradores;
DROP TABLE Turma;
DROP TABLE Eventos;
DROP TABLE Usuario;
DROP TABLE TipoUsuario;

-- DESCRIBE DE TODOS AS TABELAS
DESCRIBE TipoUsuario;
DESCRIBE Usuario;
DESCRIBE Eventos;
DESCRIBE Turma;
DESCRIBE Colaboradores;
DESCRIBE EventoTurma;
DESCRIBE TurmaColaboradores;

-- DELETE PARA APAGAR OS REGISTROS
DELETE FROM TurmaColaboradores;
DELETE FROM EventoTurma;
DELETE FROM Colaboradores;
DELETE FROM Turma;
DELETE FROM Eventos;
DELETE FROM Usuario;
DELETE FROM TipoUsuario;