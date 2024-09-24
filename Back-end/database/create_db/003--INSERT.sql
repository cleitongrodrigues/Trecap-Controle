INSERT INTO TipoUsuario (tipo_usuario_descricao) VALUES ('Administrador');
INSERT INTO TipoUsuario (tipo_usuario_descricao) VALUES ('Colaborador');

INSERT INTO Usuario (usu_nome, usu_CPF, tipo_usuario_id, usu_ativo, usu_email, usu_senha, usu_telefone) 
VALUES ('João Silva', '12345678901', 1, 1, 'joao@exemplo.com', 'senha123', '1234567890');
INSERT INTO Usuario (usu_nome, usu_CPF, tipo_usuario_id, usu_ativo, usu_email, usu_senha, usu_telefone) 
VALUES ('Maria Souza', '98765432100', 2, 1, 'maria@exemplo.com', 'senha123', '0987654321');

INSERT INTO Empresa (empresa_nome, empresa_CNPJ, empresa_telefone, empresa_email, empresa_ativo, usu_id)
VALUES ('Tech Solutions', '12345678000199', '1123456789', 'contato@techsolutions.com', 1, 1);
INSERT INTO Empresa (empresa_nome, empresa_CNPJ, empresa_telefone, empresa_email, empresa_ativo, usu_id)
VALUES ('Innovate Corp', '98765432000188', '11987654321', 'contato@innovatecorp.com', 1, 2);

INSERT INTO Colaboradores (colaborador_nome, colaborador_CPF, colaborador_biometria, colaborador_ativo, colaborador_telefone, colaborador_email, colaborador_historico_treinamento)
VALUES ('Carlos Almeida', '11122233344', 'biometria123', 1, '1112345678', 'carlos@exemplo.com', 'Treinamento A, Treinamento B');
INSERT INTO Colaboradores (colaborador_nome, colaborador_CPF, colaborador_biometria, colaborador_ativo, colaborador_telefone, colaborador_email, colaborador_historico_treinamento)
VALUES ('Ana Pereira', '55566677788', 'biometria456', 1, '1198765432', 'ana@exemplo.com', 'Treinamento X, Treinamento Y');

INSERT INTO Endereco (endereco_logradouro, endereco_numero, endereco_complemento, endereco_bairro, endereco_cidade, endereco_estado, endereco_cep, empresa_id)
VALUES ('Rua das Flores', '100', 'Apt 301', 'Centro', 'São Paulo', 'SP', '12345678', 1);
INSERT INTO Endereco (endereco_logradouro, endereco_numero, endereco_complemento, endereco_bairro, endereco_cidade, endereco_estado, endereco_cep, colaborador_id)
VALUES ('Av. Paulista', '2000', 'Sala 400', 'Bela Vista', 'São Paulo', 'SP', '87654321', 1);
INSERT INTO Endereco (endereco_logradouro, endereco_numero, endereco_complemento, endereco_bairro, endereco_cidade, endereco_estado, endereco_cep, usu_id)
VALUES ('Av. Paulista', '2000', 'Sala 400', 'Bela Vista', 'São Paulo', 'SP', '87654321', 1);


INSERT INTO Eventos (evento_nome, evento_data_inicio, evento_data_termino, evento_local, evento_status, usu_id)
VALUES ('Seminário de TI', '2024-10-01', '2024-10-02', 'Centro de Convenções', 1, 1);
INSERT INTO Eventos (evento_nome, evento_data_inicio, evento_data_termino, evento_local, evento_status, usu_id)
VALUES ('Workshop de Inovação', '2024-11-15', '2024-11-16', 'Auditório Central', 1, 2);

INSERT INTO Turma (turma_descricao, turma_ativo)
VALUES ('Turma de Capacitação em Desenvolvimento', 1);
INSERT INTO Turma (turma_descricao, turma_ativo)
VALUES ('Turma de Gestão de Projetos', 1);

INSERT INTO TurmaResponsaveis (turma_responsavel_docente, turma_id, usu_id, turma_responsavel_status)
VALUES ('Dr. Paulo Gomes', 1, 1, 1);
INSERT INTO TurmaResponsaveis (turma_responsavel_docente, turma_id, usu_id, turma_responsavel_status)
VALUES ('Prof. Marina Costa', 2, 2, 1);

INSERT INTO EventoTurma (evento_id, turma_id)
VALUES (1, 1);
INSERT INTO EventoTurma (evento_id, turma_id)
VALUES (2, 2);

INSERT INTO TurmaColaboradores (turma_id, colaborador_id, turma_colaboradores_comparecimento, turma_colaboradores_assinatura, turma_colaboradores_hora_entrada, turma_colaboradores_hora_saida, usu_id)
VALUES (1, 1, 1, 'assinatura1', '2024-09-01 08:00:00', '2024-09-01 17:00:00', 1);
INSERT INTO TurmaColaboradores (turma_id, colaborador_id, turma_colaboradores_comparecimento, turma_colaboradores_assinatura, turma_colaboradores_hora_entrada, turma_colaboradores_hora_saida, usu_id)
VALUES (2, 2, 1, 'assinatura2', '2024-09-02 08:00:00', '2024-09-02 17:00:00', 2);

INSERT INTO FeedbackEvento (evento_id, colaborador_id, feedback_comentario, feedback_nota)
VALUES (1, 1, 'Ótimo evento, muito produtivo.', 9);
INSERT INTO FeedbackEvento (evento_id, colaborador_id, feedback_comentario, feedback_nota)
VALUES (2, 2, 'Bom conteúdo, mas poderia ser mais dinâmico.', 7);
