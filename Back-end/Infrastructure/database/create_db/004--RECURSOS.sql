    -- SELECT DE TODOS CAMPOS --
SELECT empresa_id, empresa_nome, empresa_CNPJ, empresa_telefone, empresa_email, empresa_ativo, usu_id FROM Empresa;

SELECT setor_id, setor_nome, empresa_id FROM Setores;

SELECT usu_id, usu_nome, usu_CPF, tipo_usuario_id, usu_ativo, usu_email, usu_telefone, usu_data_cadastro, empresa_id FROM Usuario;

SELECT colaborador_id, colaborador_nome, colaborador_CPF, colaborador_biometria, colaborador_ativo, colaborador_telefone, colaborador_email, empresa_id, setor_id FROM Colaboradores;

SELECT evento_id, evento_nome, evento_data_inicio, evento_data_termino, evento_local, evento_status, usu_id, evento_professor FROM Eventos;

SELECT registros_id, registros_presenca, registros_hora_entrada, registros_hora_saida, evento_id, colaborador_id FROM Registros;

 -- DROP DE TODOS OS CAMPOS EM ORDEM CORRETA
DROP TABLE Registros;

DROP TABLE Eventos;

DROP TABLE Colaboradores;

DROP TABLE Usuario;

DROP TABLE Setores;

DROP TABLE Empresa;


-- DESCRIBE DE TODOS AS TABELAS
-- Tabela TipoUsuario
DESCRIBE Registros;

-- Tabela Usuario
DESCRIBE Eventos;

-- Endereco
DESCRIBE Colaboradores;

-- Tabela Empresa
DESCRIBE Usuario;

-- Tabela Eventos
DESCRIBE Setores;

-- Tabela Turma
DESCRIBE Empresa;

-- DELETE PARA APAGAR OS REGISTROS
DELETE FROM Registros;

DELETE FROM Eventos;

DELETE FROM Colaboradores;

DELETE FROM Usuario;

DELETE FROM Setores;

DELETE FROM Empresa;