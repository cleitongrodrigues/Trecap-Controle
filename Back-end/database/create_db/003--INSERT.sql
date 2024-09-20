INSERT INTO TipoUsuario (tipo_usuario_descricao, tipo_usuario_ativo) 
VALUES ('Administrador', 1),
       ('Colaborador', 1),
       ('Cliente', 1);

INSERT INTO Usuario (usu_nome, usu_CPF, tipo_usuario_id, usu_ativo, usu_email, usu_senha, usu_telefone) 
VALUES ('João Silva', '12345678901', 1, 1, 'joao.silva@example.com', 'senha123', '11999999999'),
       ('Maria Souza', '23456789012', 2, 1, 'maria.souza@example.com', 'senha456', '11988888888'),
       ('Carlos Lima', '34567890123', 3, 1, 'carlos.lima@example.com', 'senha789', '11977777777');

INSERT INTO Empresa (empresa_nome, empresa_CNPJ, empresa_endereco, empresa_telefone, empresa_email, empresa_ativo, usu_id) 
VALUES ('Tech Solutions', '12345678000195', 'Rua A, 100', '1133334444', 'contato@techsolutions.com', 1, 1),
       ('Global Corp', '98765432000187', 'Av. B, 200', '1144445555', 'contato@globalcorp.com', 1, 2),
       ('InovaTech', '11111111000199', 'Rua C, 300', '1155556666', 'contato@inovatech.com', 1, 3);

INSERT INTO Colaboradores (colaborador_nome, colaborador_CPF, colaborador_endereco, colaborador_biometria, colaborador_ativo, colaborador_telefone, colaborador_email) 
VALUES ('Ana Pereira', '45678901234', 'Rua X, 50', 'biometria_ana', 1, '11966666666', 'ana.pereira@example.com'),
       ('Bruno Costa', '56789012345', 'Rua Y, 60', 'biometria_bruno', 1, '11955555555', 'bruno.costa@example.com'),
       ('Carla Mendes', '67890123456', 'Rua Z, 70', 'biometria_carla', 1, '11944444444', 'carla.mendes@example.com');

INSERT INTO Endereco (endereco_logradouro, endereco_numero, endereco_bairro, endereco_cidade, endereco_estado, endereco_cep, empresa_id, colaborador_id, usu_id) 
VALUES ('Rua A', '100', 'Centro', 'São Paulo', 'SP', '01001000', 1, NULL, 1),
       ('Av. B', '200', 'Vila Nova', 'Rio de Janeiro', 'RJ', '20040030', 2, NULL, 2),
       ('Rua C', '300', 'Bela Vista', 'Curitiba', 'PR', '80010000', 3, 1, 3);

INSERT INTO Eventos (evento_nome, evento_data_inicio, evento_data_termino, evento_local, usu_id) 
VALUES ('Workshop de Tecnologia', '2024-10-15', '2024-10-16', 'São Paulo', 1),
       ('Treinamento de Segurança', '2024-09-10', '2024-09-10', 'Curitiba', 2),
       ('Feira de Inovação', '2024-11-20', '2024-11-21', 'Rio de Janeiro', 3);

INSERT INTO Turma (turma_descricao) 
VALUES ('Turma de Introdução à Programação'),
       ('Turma de Gestão de Projetos'),
       ('Turma de Segurança da Informação');

INSERT INTO TurmaResponsaveis (turma_responsavel_docente, turma_id, usu_id) 
VALUES ('Prof. João Silva', 1, 1),
       ('Prof. Maria Souza', 2, 2),
       ('Prof. Carlos Lima', 3, 3);

INSERT INTO EventoTurma (evento_id, turma_id) 
VALUES (1, 1),
       (2, 2),
       (3, 3);

INSERT INTO TurmaColaboradores (turma_id, colaborador_id, turma_colaboradores_comparecimento, turma_colaboradores_assinatura, turma_colaboradores_hora_entrada, turma_colaboradores_hora_saida, usu_id) 
VALUES (1, 1, 1, 'assinatura_ana', '2024-09-10 09:00:00', '2024-09-10 17:00:00', 1),
       (2, 2, 1, 'assinatura_bruno', '2024-09-11 09:00:00', '2024-09-11 17:00:00', 2),
      

