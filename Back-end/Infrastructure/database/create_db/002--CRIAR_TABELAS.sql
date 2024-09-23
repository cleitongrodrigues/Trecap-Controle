-- Tabela TipoUsuario
CREATE TABLE IF NOT EXISTS TipoUsuario (
    tipo_usuario_id int AUTO_INCREMENT NOT NULL,
    tipo_usuario_descricao varchar(250) NOT NULL,
    PRIMARY KEY (tipo_usuario_id)
);

-- Tabela Usuario
CREATE TABLE IF NOT EXISTS Usuario (
    usu_id int AUTO_INCREMENT NOT NULL,
    usu_nome varchar(100) NOT NULL,
    usu_CPF varchar(11) NOT NULL,
    tipo_usuario_id int NOT NULL,
    usu_ativo bit(1) NOT NULL,
    usu_email varchar(100),
    usu_senha varchar(100),
    usu_telefone varchar(15),
    usu_data_cadastro datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    usu_ultimo_login datetime,
    PRIMARY KEY (usu_id),
    FOREIGN KEY (tipo_usuario_id) REFERENCES TipoUsuario(tipo_usuario_id)
);

-- Tabela Empresa
CREATE TABLE IF NOT EXISTS Empresa (
    empresa_id int AUTO_INCREMENT NOT NULL,
    empresa_nome varchar(100) NOT NULL,
    empresa_CNPJ varchar(14) NOT NULL,
    empresa_telefone varchar(15),
    empresa_email varchar(100),
    empresa_ativo bit(1) NOT NULL,
    usu_id int NOT NULL,
    PRIMARY KEY (empresa_id),
    FOREIGN KEY (usu_id) REFERENCES Usuario(usu_id)
);

-- Tabela Colaboradores
CREATE TABLE IF NOT EXISTS Colaboradores (
    colaborador_id int AUTO_INCREMENT NOT NULL,
    colaborador_nome varchar(100) NOT NULL,
    colaborador_CPF varchar(11) NOT NULL,
    colaborador_biometria varchar(1024) NOT NULL,
    colaborador_ativo bit(1) NOT NULL,
    colaborador_telefone varchar(15),
    colaborador_email varchar(100),
    colaborador_historico_treinamento varchar(1024),
    PRIMARY KEY (colaborador_id)
);

-- Tabela Endereco (deve ser criada após Usuario, Empresa e Colaboradores)
CREATE TABLE IF NOT EXISTS Endereco (
    endereco_id int AUTO_INCREMENT NOT NULL,
    endereco_logradouro varchar(150) NOT NULL,
    endereco_numero varchar(10),
    endereco_complemento varchar(50),
    endereco_bairro varchar(50),
    endereco_cidade varchar(50) NOT NULL,
    endereco_estado varchar(2) NOT NULL,
    endereco_cep varchar(8) NOT NULL,
    usu_id int,
    PRIMARY KEY (endereco_id),
    CONSTRAINT fk_empresa FOREIGN KEY (empresa_id) REFERENCES Empresa(empresa_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_colaborador FOREIGN KEY (colaborador_id) REFERENCES Colaboradores(colaborador_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_usuario FOREIGN KEY (usu_id) REFERENCES Usuario(usu_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Tabela Eventos
CREATE TABLE IF NOT EXISTS Eventos (
    evento_id int AUTO_INCREMENT NOT NULL,
    evento_nome varchar(50) NOT NULL,
    evento_data_inicio date NOT NULL,
    evento_data_termino date NOT NULL,
    evento_local varchar(100) NOT NULL,
    evento_status bit(1) not null,
    usu_id int NOT NULL,
    PRIMARY KEY (evento_id),
    FOREIGN KEY (usu_id) REFERENCES Usuario(usu_id)
);

-- Tabela Turma
CREATE TABLE IF NOT EXISTS Turma (
    turma_id int AUTO_INCREMENT NOT NULL,
    turma_descricao varchar(250) NOT NULL,
    turma_ativo bit(1) not null,
    PRIMARY KEY (turma_id)
);


-- Tabela TurmaResponsaveis (Responsáveis pela Turma)
CREATE TABLE IF NOT EXISTS TurmaResponsaveis (
    turma_responsavel_id int AUTO_INCREMENT NOT NULL,
    turma_responsavel_docente varchar(100) not null,
    turma_id int NOT NULL,
    usu_id int NOT NULL,
    turma_responsavel_status bit (1) not null,
    PRIMARY KEY (turma_responsavel_id),
    FOREIGN KEY (turma_id) REFERENCES Turma(turma_id),
    FOREIGN KEY (usu_id) REFERENCES Usuario(usu_id)
);

-- Tabela EventoTurma (Relaciona Eventos com Turmas)
CREATE TABLE IF NOT EXISTS EventoTurma (
    evento_turma_id int AUTO_INCREMENT NOT NULL,
    evento_id int NOT NULL,
    turma_id int NOT NULL,
    PRIMARY KEY (evento_turma_id),
    FOREIGN KEY (evento_id) REFERENCES Eventos(evento_id),
    FOREIGN KEY (turma_id) REFERENCES Turma(turma_id)
);

-- Tabela TurmaColaboradores (Controle de Participação)
CREATE TABLE IF NOT EXISTS TurmaColaboradores (
    turma_colaboradores_id int AUTO_INCREMENT NOT NULL,
    turma_id int NOT NULL,
    colaborador_id int NOT NULL,
    turma_colaboradores_comparecimento bit(1) NOT NULL,
    turma_colaboradores_assinatura varchar(255) NOT NULL,
    -- turma_colaboradores_avaliacao varchar(255),
    turma_colaboradores_hora_entrada datetime,
    turma_colaboradores_hora_saida datetime,
    usu_id int NOT NULL,
    PRIMARY KEY (turma_colaboradores_id),
    FOREIGN KEY (turma_id) REFERENCES Turma(turma_id),
    FOREIGN KEY (colaborador_id) REFERENCES Colaboradores(colaborador_id),
    FOREIGN KEY (usu_id) REFERENCES Usuario(usu_id)
);

-- Tabela FeedbackEvento (Feedback dos Colaboradores)
CREATE TABLE IF NOT EXISTS FeedbackEvento (
    feedback_evento_id int AUTO_INCREMENT NOT NULL,
    evento_id int NOT NULL,
    colaborador_id int NOT NULL,
    feedback_comentario varchar(500),
    feedback_nota int,
    PRIMARY KEY (feedback_evento_id),
    FOREIGN KEY (evento_id) REFERENCES Eventos(evento_id),
    FOREIGN KEY (colaborador_id) REFERENCES Colaboradores(colaborador_id)
);
