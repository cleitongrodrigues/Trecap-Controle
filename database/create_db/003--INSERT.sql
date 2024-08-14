-- TipoUsuario
INSERT INTO TipoUsuario (tipo_usuario_descricao, tipo_usuario_ativo) 
VALUES ('Administrador', b'1');

INSERT INTO TipoUsuario (tipo_usuario_descricao, tipo_usuario_ativo) 
VALUES ('Usuário Comum', b'1');

INSERT INTO TipoUsuario (tipo_usuario_descricao, tipo_usuario_ativo) 
VALUES ('Visitante', b'0');


-- Usuário
INSERT INTO usuario (usu_nome, usu_cpf, usu_telefone, usu_email, usu_login, usu_senha, emp_cod, usu_cargo, usu_departamento, usu_tipo, usu_status, usu_img) 
VALUES ('Usuário Exemplo', '123.456.789-00', '9876543210', 'usuario@exemplo.com', 'loginusuario', 'senha123', 1, 'Cargo Exemplo', 'Departamento Exemplo', 1, 1, 'img_usuario.jpg');

-- Curso
INSERT INTO curso (curso_nome, curso_prof_cod, curso_area, curso_dur, curso_preco, curso_periodo, curso_dt_aquisicao, curso_img) 
VALUES ('Curso Exemplo', 1, 1, 120, 499.99, 1, '2024-01-01', 'img_curso.jpg');

-- Matricula_Curso
INSERT INTO matriculacurso (usu_cod, curso_cod, mat_data, concluido, mat_nota_curso) 
VALUES (1, 1, '2024-01-01 10:00:00', 0, 0);

-- Módulo
INSERT INTO modulo (mod_nome, mod_num, mod_curso) 
VALUES ('Módulo Exemplo', 1, 1);

-- Aula
INSERT INTO aula (aula_nome, aula_url, mod_cod, aula_duracao, aula_orientacao) 
VALUES ('Aula Exemplo', 'http://exemplo.com/aula', 1, 60, 'Orientação Exemplo');

-- Atividade
INSERT INTO atividade (ativ_data, mat_cod) 
VALUES ('2024-01-01 10:00:00', 1);

-- Empresa_Cursos
INSERT INTO empresa_cursos (emp_cod, cod_curso, data_aquisicao, data_encerramento) 
VALUES (1, 1, '2024-01-01', '2024-12-31');

-- Comentários
INSERT INTO comentarios (com_texto, aula_cod, mat_cod) 
VALUES ('Comentário Exemplo', 1, 1);

-- Dúvidas
INSERT INTO duvidas (mat_cod, usu_cod, duv_texto, duv_data, duv_status) 
VALUES (1, 1, 'Dúvida Exemplo', '2024-01-01 10:00:00', 1);

-- Questionário
INSERT INTO questionario (mod_cod, qtn_orientacoes, qtn_nquestoes) 
VALUES (1, 'Orientações Exemplo', 10);

-- Questões
INSERT INTO questoes (quest_texto, quest_imagem, mod_cod) 
VALUES ('Questão Exemplo', 'img_questao.jpg', 1);

-- Alternativas
INSERT INTO alternativas (alt_texto, alt_imagem, alt_correta, quest_cod) 
VALUES ('Alternativa Exemplo', 'img_alternativa.jpg', 1, 1);

-- Respostas
INSERT INTO respostas (alt_cod, ativ_cod) 
VALUES (1, 1);

-- Material
INSERT INTO material (aula_cod, mtr_descricao, mtr_link) 
VALUES (1, 'Material Exemplo', 'http://exemplo.com/material');

-- Progresso
INSERT INTO progresso (mat_cod, aula_cod, prog_data) 
VALUES (1, 1, '2024-01-01 10:00:00');
