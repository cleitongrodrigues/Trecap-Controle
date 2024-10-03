INSERT INTO Empresa (empresa_nome, empresa_CNPJ, empresa_telefone, empresa_email, empresa_ativo, usu_id)
VALUES
('Empresa ABC', '12345678000190', '(11) 98765-4321', 'contato@empresaabc.com', 1, 1),
('Tech Solutions', '09876543000123', '(21) 91234-5678', 'contato@techsolutions.com', 1, 2),
('Global Services', '11122233000155', '(31) 92345-6789', 'contato@globalservices.com', 1, 3);

INSERT INTO Setores (setor_nome, empresa_id)
VALUES
('Recursos Humanos', 1),
('Desenvolvimento', 2),
('Financeiro', 3);

INSERT INTO Usuario (usu_nome, usu_CPF, tipo_usuario_id, usu_ativo, usu_email, usu_senha, usu_telefone, empresa_id)
VALUES
('João Silva', '12345678900', 1, 1, 'joao.silva@empresaabc.com', 'senha123', '(11) 98765-1111', 1),
('Maria Souza', '98765432100', 2, 1, 'maria.souza@techsolutions.com', 'senha456', '(21) 91234-2222', 2),
('Carlos Oliveira', '11223344556', 1, 1, 'carlos.oliveira@globalservices.com', 'senha789', '(31) 92345-3333', 3);

INSERT INTO Colaboradores (colaborador_nome, colaborador_CPF, colaborador_biometria, colaborador_ativo, colaborador_telefone, colaborador_email, empresa_id, setor_id)
VALUES
('Ana Pereira', '12345678911', 'biometria_ana', 1, '(11) 99999-1111', 'ana.pereira@empresaabc.com', 1, 1),
('Bruno Lima', '98765432122', 'biometria_bruno', 1, '(21) 99999-2222', 'bruno.lima@techsolutions.com', 2, 2),
('Clara Mendes', '11223344567', 'biometria_clara', 1, '(31) 99999-3333', 'clara.mendes@globalservices.com', 3, 3);

INSERT INTO Eventos (evento_nome, evento_data_inicio, evento_data_termino, evento_local, evento_status, usu_id, evento_professor)
VALUES
('Workshop de Desenvolvimento', '2024-09-01', '2024-09-05', 'Auditório Empresa ABC', 1, 1, 'João Silva'),
('Treinamento de Vendas', '2024-09-10', '2024-09-12', 'Sala de Conferências Tech Solutions', 1, 2, 'Maria Souza'),
('Curso de Gestão Financeira', '2024-09-15', '2024-09-18', 'Sala de Reuniões Global Services', 1, 3, 'Carlos Oliveira');

INSERT INTO Registros (registros_presenca, registros_hora_entrada, registros_hora_saida, evento_id, colaborador_id)
VALUES
(1, '2024-09-01 09:00:00', '2024-09-01 17:00:00', 1, 1),
(1, '2024-09-10 09:30:00', '2024-09-10 16:30:00', 2, 2),
(1, '2024-09-15 08:45:00', '2024-09-15 17:15:00', 3, 3);
