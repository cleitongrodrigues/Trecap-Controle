CREATE TABLE IF NOT EXISTS TipoUsuario (
	tipo_usuario_id int AUTO_INCREMENT NOT NULL,
	tipo_usuario_descricao varchar(250) NOT NULL,
	tipo_usuario_ativo bit(1) NOT NULL,
	PRIMARY KEY (tipo_usuario_id)
);

CREATE TABLE IF NOT EXISTS Usuario (
	usu_id int AUTO_INCREMENT NOT NULL,
	usu_nome varchar(100) NOT NULL,
	usu_CPF varchar(11) NOT NULL,
	tipo_usuario_id int NOT NULL,
	PRIMARY KEY (usu_id),
    FOREIGN KEY (tipo_usuario_id) REFERENCES TipoUsuario(tipo_usuario_id)
);

CREATE TABLE IF NOT EXISTS Eventos (
	evento_id int AUTO_INCREMENT NOT NULL,
    evento_nome varchar(50) NOT NULL,
	evento_data date NOT NULL,
	evento_local varchar(100) NOT NULL,
	evento_hora_inicio datetime NOT NULL,
	evento_hora_termino datetime NOT NULL,
	PRIMARY KEY (evento_id)
);

CREATE TABLE IF NOT EXISTS Turma (
	turma_id int AUTO_INCREMENT NOT NULL,
	turma_descricao varchar(250) NOT NULL,
	PRIMARY KEY (turma_id)
);

CREATE TABLE IF NOT EXISTS Colaboradores (
	colaborador_id int AUTO_INCREMENT NOT NULL,
	colaborador_nome varchar(100) NOT NULL,
	colaborador_CPF varchar(11) NOT NULL,
	colaborador_endereco varchar(100) NOT NULL,
	colaborador_biometria varchar(1024) NOT NULL,
	PRIMARY KEY (colaborador_id)
);

CREATE TABLE IF NOT EXISTS EventoTurma (
	evento_turma_id int AUTO_INCREMENT NOT NULL,
	evento_id int NOT NULL,
	turma_id int NOT NULL,
	PRIMARY KEY (evento_turma_id),
    FOREIGN KEY (evento_id) REFERENCES Eventos(evento_id),
    FOREIGN KEY (turma_id) REFERENCES Turma(turma_id)
);

CREATE TABLE IF NOT EXISTS TurmaColaboradores (
	turma_colaboradores_id int AUTO_INCREMENT NOT NULL,
	turma_id int NOT NULL,
	colaborador_id int NOT NULL,
	turma_colaboradores_comparecimento bit(1) NOT NULL,
	usu_id int NOT NULL,
	turma_colaboradores_assinatura varchar(255) NOT NULL,
	PRIMARY KEY (turma_colaboradores_id),
    FOREIGN KEY (turma_id) REFERENCES Turma(turma_id),
    FOREIGN KEY (colaborador_id) REFERENCES Colaboradores(colaborador_id),
    FOREIGN KEY (usu_id) REFERENCES Usuário(usu_id)
);