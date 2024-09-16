-- TipoUsuario
INSERT INTO TipoUsuario (tipo_usuario_descricao, tipo_usuario_ativo) VALUES ('Administrador', 1);
INSERT INTO TipoUsuario (tipo_usuario_descricao, tipo_usuario_ativo) VALUES ('Usuário Padrão', 1);
INSERT INTO TipoUsuario (tipo_usuario_descricao, tipo_usuario_ativo) VALUES ('Colaborador', 1);

-- Usuario
INSERT INTO Usuario (usu_nome, usu_CPF, tipo_usuario_id, usu_ativo, usu_email, usu_telefone) VALUES ('João Silva', '12345678901', 1, 1, 'joao@example.com', '1111111111');
INSERT INTO Usuario (usu_nome, usu_CPF, tipo_usuario_id, usu_ativo, usu_email, usu_telefone) VALUES ('Maria Souza', '98765432100', 2, 1, 'maria@example.com', '2222222222');
INSERT INTO Usuario (usu_nome, usu_CPF, tipo_usuario_id, usu_ativo, usu_email, usu_telefone) VALUES ('Carlos Santos', '11122233344', 3, 1, 'carlos@example.com', '3333333333');

-- Empresa
INSERT INTO Empresa (empresa_nome, empresa_CNPJ, empresa_endereco, empresa_telefone, empresa_email, empresa_ativo, usu_id) VALUES ('Empresa Alpha', '12345678000101', 'Rua A, 123', '4444444444', 'alpha@empresa.com', 1, 1);
INSERT INTO Empresa (empresa_nome, empresa_CNPJ, empresa_endereco, empresa_telefone, empresa_email, empresa_ativo, usu_id) VALUES ('Empresa Beta', '98765432000199', 'Rua B, 456', '5555555555', 'beta@empresa.com', 1, 2);
INSERT INTO Empresa (empresa_nome, empresa_CNPJ, empresa_endereco, empresa_telefone, empresa_email, empresa_ativo, usu_id) VALUES ('Empresa Gamma', '11122233000188', 'Rua C, 789', '6666666666', 'gamma@empresa.com', 1, 3);

-- Colabores
INSERT INTO Colaboradores (colaborador_nome, colaborador_CPF, colaborador_endereco, colaborador_biometria, colaborador_ativo, colaborador_telefone, colaborador_email) VALUES ('Ana Pereira', '44455566677', 'Rua D, 100', 'biometria1', 1, '7777777777', 'ana@colaborador.com');
INSERT INTO Colaboradores (colaborador_nome, colaborador_CPF, colaborador_endereco, colaborador_biometria, colaborador_ativo, colaborador_telefone, colaborador_email) VALUES ('José Lima', '88899900011', 'Rua E, 200', 'biometria2', 1, '8888888888', 'jose@colaborador.com');
INSERT INTO Colaboradores (colaborador_nome, colaborador_CPF, colaborador_endereco, colaborador_biometria, colaborador_ativo, colaborador_telefone, colaborador_email) VALUES ('Lucia Gomes', '22233344455', 'Rua F, 300', 'biometria3', 1, '9999999999', 'lucia@colaborador.com');

-- Endereços para Usuários
INSERT INTO Endereco (endereco_logradouro, endereco_numero, endereco_complemento, endereco_bairro, endereco_cidade, endereco_estado, endereco_cep, endereco_tipo, entidade_id) VALUES ('Rua A', '123', 'Apto 1', 'Centro', 'São Paulo', 'SP', '01001000', 'Usuario', 1);
INSERT INTO Endereco (endereco_logradouro, endereco_numero, endereco_complemento, endereco_bairro, endereco_cidade, endereco_estado, endereco_cep, endereco_tipo, entidade_id) VALUES ('Rua B', '456', 'Casa 2', 'Jardim', 'Rio de Janeiro', 'RJ', '20020000', 'Usuario', 2);
INSERT INTO Endereco (endereco_logradouro, endereco_numero, endereco_complemento, endereco_bairro, endereco_cidade, endereco_estado, endereco_cep, endereco_tipo, entidade_id) VALUES ('Rua C', '789', 'Sala 3', 'Bela Vista', 'Belo Horizonte', 'MG', '30030000', 'Usuario', 3);

-- Endereços para Empresas
INSERT INTO Endereco (endereco_logradouro, endereco_numero, endereco_complemento, endereco_bairro, endereco_cidade, endereco_estado, endereco_cep, entidade_id) VALUES ('Av. Paulista', '1000', '10º Andar', 'Centro', 'São Paulo', 'SP', '01310000',1);
INSERT INTO Endereco (endereco_logradouro, endereco_numero, endereco_complemento, endereco_bairro, endereco_cidade, endereco_estado, endereco_cep, entidade_id) VALUES ('Av. Rio Branco', '500', '5º Andar', 'Centro', 'Rio de Janeiro', 'RJ', '20040000',2);
INSERT INTO Endereco (endereco_logradouro, endereco_numero, endereco_complemento, endereco_bairro, endereco_cidade, endereco_estado, endereco_cep, entidade_id) VALUES ('Av. Afonso Pena', '300', 'Sala 20', 'Centro', 'Belo Horizonte', 'MG', '30130000',3);

-- Endereços para Colaboradores
INSERT INTO Endereco (endereco_logradouro, endereco_numero, endereco_complemento, endereco_bairro, endereco_cidade, endereco_estado, endereco_cep, entidade_id) VALUES ('Rua G', '101', 'Apto 10', 'Vila Nova', 'Curitiba', 'PR', '80010000', 1);
INSERT INTO Endereco (endereco_logradouro, endereco_numero, endereco_complemento, endereco_bairro, endereco_cidade, endereco_estado, endereco_cep, entidade_id) VALUES ('Rua H', '202', 'Casa 5', 'Centro', 'Porto Alegre', 'RS', '90020000', 2);
INSERT INTO Endereco (endereco_logradouro, endereco_numero, endereco_complemento, endereco_bairro, endereco_cidade, endereco_estado, endereco_cep, entidade_id) VALUES ('Rua I', '303', 'Sala 1', 'Jardim América', 'Fortaleza', 'CE', '60030000', 3);

-- Eventos
INSERT INTO Eventos (evento_nome, evento_data, evento_local, evento_hora_inicio, evento_hora_termino, evento_capacidade, usu_id) VALUES ('Evento Tech', '2024-10-10', 'Auditório Central', '2024-10-10 09:00:00', '2024-10-10 18:00:00', 200, 1);
INSERT INTO Eventos (evento_nome, evento_data, evento_local, evento_hora_inicio, evento_hora_termino, evento_capacidade, usu_id) VALUES ('Workshop de Marketing', '2024-11-15', 'Sala de Conferências', '2024-11-15 10:00:00', '2024-11-15 17:00:00', 100, 2);
INSERT INTO Eventos (evento_nome, evento_data, evento_local, evento_hora_inicio, evento_hora_termino, evento_capacidade, usu_id) VALUES ('Seminário de Vendas', '2024-12-01', 'Auditório da Empresa', '2024-12-01 08:00:00', '2024-12-01 12:00:00', 150, 3);

-- Turma
INSERT INTO Turma (turma_descricao) VALUES ('Turma de Desenvolvimento Web');
INSERT INTO Turma (turma_descricao) VALUES ('Turma de Marketing Digital');
INSERT INTO Turma (turma_descricao) VALUES ('Turma de Vendas Corporativas');

-- TurmaResponsaveis
INSERT INTO TurmaResponsaveis (turma_id, usu_id) VALUES (1, 1);
INSERT INTO TurmaResponsaveis (turma_id, usu_id) VALUES (2, 2);
INSERT INTO TurmaResponsaveis (turma_id, usu_id) VALUES (3, 3);

-- EventoTurma
INSERT INTO EventoTurma (evento_id, turma_id) VALUES (1, 1);
INSERT INTO EventoTurma (evento_id, turma_id) VALUES (2, 2);
INSERT INTO EventoTurma (evento_id, turma_id) VALUES (3, 3);

-- TurmaColabores
INSERT INTO TurmaColaboradores 
(turma_colaboradores_id, turma_id, colaborador_id, turma_colaboradores_comparecimento, turma_colaboradores_assinatura, turma_colaboradores_justificativa, turma_colaboradores_avaliacao, turma_colaboradores_hora_entrada, turma_colaboradores_hora_saida, usu_id) 
VALUES 
(1, 1, 1, 1, 'Assinatura1', 'Justificativa1', 'Avaliação1', '2024-10-10 09:00:00', '2024-10-10 17:00:00', 1),
(2, 1, 1, 1, 'Assinatura2', 'Justificativa2', 'Avaliação2', '2024-10-10 09:00:00', '2024-10-10 17:00:00', 2),
(3, 1, 1, 1, 'Assinatura3', 'Justificativa3', 'Avaliação3', '2024-10-10 09:00:00', '2024-10-10 17:00:00', 3);

-- FeedbackEvento
INSERT INTO FeedbackEvento (evento_id, colaborador_id, feedback_comentario, feedback_nota) VALUES (1, 1, 'Ótimo evento!', 9);
INSERT INTO FeedbackEvento (evento_id, colaborador_id, feedback_comentario, feedback_nota) VALUES (2, 2, 'Muito bom.', 8);
INSERT INTO FeedbackEvento (evento_id, colaborador_id, feedback_comentario, feedback_nota) VALUES (3, 3, 'Excelente conteúdo!', 10);
