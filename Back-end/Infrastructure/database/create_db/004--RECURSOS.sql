    -- SELECT DE TODOS CAMPOS --
SELECT * FROM TipoUsuario;
SELECT tipo_usuario_id, tipo_usuario_descricao FROM TipoUsuario;

SELECT * FROM Usuario;
SELECT usu_id, usu_nome, usu_CPF, tipo_usuario_id, usu_ativo, usu_email, usu_senha, usu_telefone, usu_data_cadastro, usu_ultimo_login 
FROM Usuario;

SELECT * FROM Empresa;
SELECT empresa_id, empresa_nome, empresa_CNPJ, empresa_telefone, empresa_email, empresa_ativo, usu_id 
FROM Empresa;

SELECT * FROM Colaboradores;
SELECT colaborador_id, colaborador_nome, colaborador_CPF, colaborador_biometria, colaborador_ativo, colaborador_telefone, colaborador_email, colaborador_historico_treinamento 
FROM Colaboradores;

SELECT * FROM Endereco;
SELECT endereco_id, endereco_logradouro, endereco_numero, endereco_complemento, endereco_bairro, endereco_cidade, endereco_estado, endereco_cep, empresa_id, colaborador_id, usu_id 
FROM Endereco;

SELECT * FROM Eventos;
SELECT evento_id, evento_nome, evento_data_inicio, evento_data_termino, evento_local, evento_status, usu_id 
FROM Eventos;

SELECT * FROM Turma;
SELECT turma_id, turma_descricao, turma_ativo 
FROM Turma;

SELECT * FROM TurmaResponsaveis;
SELECT turma_responsavel_id, turma_responsavel_docente, turma_id, usu_id, turma_responsavel_status 
FROM TurmaResponsaveis;

SELECT * FROM EventoTurma;
SELECT evento_turma_id, evento_id, turma_id 
FROM EventoTurma;

SELECT * FROM TurmaColaboradores;
SELECT turma_colaboradores_id, turma_id, colaborador_id, turma_colaboradores_comparecimento, turma_colaboradores_assinatura, turma_colaboradores_hora_entrada, turma_colaboradores_hora_saida, usu_id 
FROM TurmaColaboradores;

SELECT * FROM FeedbackEvento;
SELECT feedback_evento_id, evento_id, colaborador_id, feedback_comentario, feedback_nota 
FROM FeedbackEvento;

 -- DROP DE TODOS OS CAMPOS EM ORDEM CORRETA
-- Tabelas sem dependências
-- Drop das tabelas na ordem inversa à criação para garantir a integridade referencial

DROP TABLE FeedbackEvento;

DROP TABLE TurmaColaboradores;

DROP TABLE EventoTurma;

DROP TABLE TurmaResponsaveis;

DROP TABLE Eventos;

DROP TABLE Turma;

DROP TABLE Endereco;

DROP TABLE Colaboradores;

DROP TABLE Empresa;

DROP TABLE Usuario;

DROP TABLE TipoUsuario;


-- DESCRIBE DE TODOS AS TABELAS
-- Tabela TipoUsuario
DESCRIBE TipoUsuario;

-- Tabela Usuario
DESCRIBE Usuario;

-- Endereco
DESCRIBE Endereco;

-- Tabela Empresa
DESCRIBE Empresa;

-- Tabela Eventos
DESCRIBE Eventos;

-- Tabela Turma
DESCRIBE Turma;

-- Tabela TurmaResponsaveis
DESCRIBE TurmaResponsaveis;

-- Tabela Colaboradores
DESCRIBE Colaboradores;

-- Tabela EventoTurma
DESCRIBE EventoTurma;

-- Tabela TurmaColaboradores
DESCRIBE TurmaColaboradores;

-- Tabela FeedbackEvento
DESCRIBE FeedbackEvento;


-- DELETE PARA APAGAR OS REGISTROS
-- Deletar dados de tabelas dependentes (que possuem chaves estrangeiras)
DELETE FROM FeedbackEvento;
DELETE FROM TurmaColaboradores;
DELETE FROM EventoTurma;
DELETE FROM TurmaResponsaveis;

-- Deletar dados de tabelas que possuem dependentes
DELETE FROM Colaboradores;
DELETE FROM Empresa;
DELETE FROM Eventos;
DELETE FROM Turma;
DELETE FROM Usuario;
DELETE FROM Endereco;

-- Deletar dados da tabela sem dependências
DELETE FROM TipoUsuario;