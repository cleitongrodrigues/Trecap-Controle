// colaborador_id int AUTO_INCREMENT NOT NULL,
// colaborador_nome varchar(100) NOT NULL,
// colaborador_CPF varchar(11) NOT NULL,
// colaborador_biometria varchar(1024) NOT NULL,
// colaborador_ativo bit(1) NOT NULL,
// colaborador_telefone varchar(15),
// colaborador_email varchar(100),
// colaborador_historico_treinamento varchar(1024),

export default class Colaborator{
    constructor(colaboratorId, name, cpf, biometria, active, telefone, email, historicoTreinamento, adress){
        this.colaboratorId = colaboratorId
        this.name = name
        this.cpf = cpf
        this.biometria = biometria
        this.active = active
        this.telefone = telefone
        this.email = email
        this.historicoTreinamento = historicoTreinamento
        this.adress = adress
    }
}