-- Tabela Empresa
CREATE TABLE IF NOT EXISTS Empresa (
    empresa_id int AUTO_INCREMENT NOT NULL,
    empresa_nome varchar(100) NOT NULL,
    empresa_CNPJ varchar(14) NOT NULL,
    empresa_telefone varchar(15),
    empresa_email varchar(100),
    empresa_ativo bit(1) NOT NULL,
    usu_id int NOT NULL,
    PRIMARY KEY (empresa_id)
);

-- Setores
CREATE TABLE IF NOT EXISTS Setores(
    setor_id INT AUTO_INCREMENT NOT NULL,
    setor_nome varchar(100) NOT NULL,
    empresa_id INT NOT NULL,
    FOREIGN KEY (empresa_id) REFERENCES Empresa(empresa_id),
    PRIMARY KEY (setor_id)
);

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
    empresa_id int not null,
    FOREIGN KEY (empresa_id) REFERENCES Empresa(empresa_id),
    PRIMARY KEY (usu_id)
);

-- Tabela Colaboradores
CREATE TABLE IF NOT EXISTS Colaboradores (
    colaborador_id int AUTO_INCREMENT NOT NULL,
    colaborador_nome varchar(100) NOT NULL,
    colaborador_CPF varchar(11) NOT NULL,
    colaborador_biometria varchar(1024) NOT NULL,
    colaborador_ativo bit(1) NOT NULL,
    colaborador_telefone varchar(15) NOT NULL,
    colaborador_email varchar(100),
    empresa_id INT NOT NULL,
    setor_id INT NOT NULL,
    FOREIGN KEY (empresa_id) REFERENCES Empresa(empresa_id),
    FOREIGN KEY (setor_id) REFERENCES Setores(setor_id),
    PRIMARY KEY (colaborador_id)
);

-- Tabela Eventos
CREATE TABLE IF NOT EXISTS Eventos (
    evento_id int AUTO_INCREMENT NOT NULL,
    evento_nome varchar(100) NOT NULL,
    evento_data_inicio date NOT NULL,
    evento_data_termino date NOT NULL,
    evento_local varchar(100) NOT NULL,
    evento_status bit(1) not null,
    usu_id int NOT NULL,
    evento_professor varchar(100) NOT NULL,
    PRIMARY KEY (evento_id),
    FOREIGN KEY (usu_id) REFERENCES Usuario(usu_id)
);

-- Tabela Registros
CREATE TABLE IF NOT EXISTS Registros (
    registros_id int AUTO_INCREMENT NOT NULL,
    registros_presenca bit(1) NOT NULL,
    registros_hora_entrada datetime,
    registros_hora_saida datetime,
    evento_id INT NOT NULL,
    colaborador_id int NOT NULL,
    FOREIGN KEY (evento_id) REFERENCES Eventos(evento_id),
    FOREIGN KEY (colaborador_id) REFERENCES Colaboradores(colaborador_id),
    PRIMARY  key (registros_id)
);

