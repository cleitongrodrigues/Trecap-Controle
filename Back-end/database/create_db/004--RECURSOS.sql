    -- SELECT DE TODOS CAMPOS --
SELECT * FROM TipoUsuario;
SELECT tipo_usuario_id, tipo_usuario_descricao, tipo_usuario_ativo
FROM TipoUsuario;

SELECT * FROM Usuario;
SELECT usu_id, usu_nome, usu_CPF, tipo_usuario_id, usu_ativo, usu_email, usu_telefone, usu_data_cadastro, usu_ultimo_login
FROM Usuario;

SELECT * FROM Empresa;
SELECT empresa_id, empresa_nome, empresa_CNPJ, empresa_endereco, empresa_telefone, empresa_email, empresa_ativo, usu_id
FROM Empresa;

SELECT * FROM Colaboradores;
SELECT colaborador_id, colaborador_nome, colaborador_CPF, colaborador_endereco, colaborador_biometria, colaborador_ativo, colaborador_telefone, colaborador_email, colaborador_historico_treinamento
FROM Colaboradores;

SELECT * FROM Endereco;
SELECT endereco_id, endereco_logradouro, endereco_numero, endereco_complemento, endereco_bairro, endereco_cidade, endereco_estado, endereco_cep, endereco_tipo, entidade_id
FROM Endereco;

SELECT * FROM Eventos;
SELECT evento_id, evento_nome, evento_data, evento_local, evento_hora_inicio, evento_hora_termino, evento_capacidade, usu_id
FROM Eventos;

SELECT * FROM Turma;
SELECT turma_id, turma_descricao
FROM Turma;

SELECT * FROM TurmaResponsaveis;
SELECT turma_responsavel_id, turma_id, usu_id
FROM TurmaResponsaveis;

SELECT * FROM EventoTurma;
SELECT evento_turma_id, evento_id, turma_id
FROM EventoTurma;

SELECT * FROM TurmaColaboradores;
SELECT turma_colaboradores_id, turma_id, colaborador_id, turma_colaboradores_comparecimento, turma_colaboradores_assinatura, turma_colaboradores_justificativa, turma_colaboradores_avaliacao, turma_colaboradores_hora_entrada, turma_colaboradores_hora_saida, usu_id
FROM TurmaColaboradores;

SELECT * FROM FeedbackEvento;
SELECT feedback_evento_id, evento_id, colaborador_id, feedback_comentario, feedback_nota
FROM FeedbackEvento;

 -- DROP DE TODOS OS CAMPOS EM ORDEM CORRETA
-- Tabelas sem dependências
-- Drop das tabelas na ordem inversa à criação para garantir a integridade referencial

DROP TABLE IF EXISTS TurmaColaboradores;

DROP TABLE IF EXISTS FeedbackEvento;

DROP TABLE IF EXISTS EventoTurma;

DROP TABLE IF EXISTS TurmaResponsaveis;

DROP TABLE IF EXISTS Turma;

DROP TABLE IF EXISTS Eventos;

DROP TABLE IF EXISTS Empresa;

DROP TABLE IF EXISTS Usuario;

DROP TABLE IF EXISTS Endereco;

DROP TABLE IF EXISTS Colaboradores;

DROP TABLE IF EXISTS TipoUsuario;


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
