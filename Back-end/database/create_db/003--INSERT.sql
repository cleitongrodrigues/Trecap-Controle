-- TipoUsuario
INSERT INTO TipoUsuario (tipo_usuario_descricao, tipo_usuario_ativo) 
VALUES ('Administrador', b'1');

INSERT INTO TipoUsuario (tipo_usuario_descricao, tipo_usuario_ativo) 
VALUES ('Usuário Comum', b'1');

INSERT INTO TipoUsuario (tipo_usuario_descricao, tipo_usuario_ativo) 
VALUES ('Visitante', b'0');


-- Usuário
INSERT INTO Usuario (usu_nome, usu_CPF, tipo_usuario_id) 
VALUES ('João Silva', '12345678901', 1);

INSERT INTO Usuario (usu_nome, usu_CPF, tipo_usuario_id) 
VALUES ('Maria Oliveira', '23456789012', 2);

INSERT INTO Usuario (usu_nome, usu_CPF, tipo_usuario_id) 
VALUES ('Carlos Souza', '34567890123', 2);

-- Eventos
INSERT INTO Eventos (evento_nome, evento_data, evento_local, evento_hora_inicio, evento_hora_termino) 
VALUES ('Lavagem de Mãos', '2024-09-01', 'Auditório A', '2024-09-01 09:00:00', '2024-09-01 12:00:00');

INSERT INTO Eventos (evento_nome, evento_data, evento_local, evento_hora_inicio, evento_hora_termino) 
VALUES ('Secagem de Grãos', '2024-09-15', 'Sala B', '2024-09-15 14:00:00', '2024-09-15 17:00:00');

INSERT INTO Eventos (evento_nome, evento_data, evento_local, evento_hora_inicio, evento_hora_termino) 
VALUES ('Palestra de Segurança', '2024-10-01', 'Sala C', '2024-10-01 10:00:00', '2024-10-01 11:30:00');



-- Turma
INSERT INTO Turma (turma_descricao) 
VALUES ('Turma A - Produção');

INSERT INTO Turma (turma_descricao) 
VALUES ('Turma B - Administração');

INSERT INTO Turma (turma_descricao) 
VALUES ('Turma C - Mecânica');


-- Colaboradores
INSERT INTO Colaboradores (colaborador_nome, colaborador_CPF, colaborador_endereco, colaborador_biometria) 
VALUES ('Pedro Lima', '45678901234', 'Rua A, 123', 'biometria1');

INSERT INTO Colaboradores (colaborador_nome, colaborador_CPF, colaborador_endereco, colaborador_biometria) 
VALUES ('Ana Costa', '56789012345', 'Rua B, 456', 'biometria2');

INSERT INTO Colaboradores (colaborador_nome, colaborador_CPF, colaborador_endereco, colaborador_biometria) 
VALUES ('Lucas Martins', '67890123456', 'Rua C, 789', 'biometria3');


-- EventoTurma
INSERT INTO EventoTurma (evento_id, turma_id) 
VALUES (1, 1);

INSERT INTO EventoTurma (evento_id, turma_id) 
VALUES (2, 2);

INSERT INTO EventoTurma (evento_id, turma_id) 
VALUES (3, 3);


-- TurmaColaboradores
INSERT INTO TurmaColaboradores (turma_id, colaborador_id, turma_colaboradores_comparecimento, usu_id, turma_colaboradores_assinatura) 
VALUES (1, 1, b'1', 1, 'AssinaturaPedro');

INSERT INTO TurmaColaboradores (turma_id, colaborador_id, turma_colaboradores_comparecimento, usu_id, turma_colaboradores_assinatura) 
VALUES (2, 2, b'0', 2, 'AssinaturaAna');

INSERT INTO TurmaColaboradores (turma_id, colaborador_id, turma_colaboradores_comparecimento, usu_id, turma_colaboradores_assinatura) 
VALUES (3, 3, b'1', 3, 'AssinaturaLucas');