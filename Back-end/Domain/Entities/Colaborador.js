export default class Colaborador{
    constructor(colaborador_id, colaborador_nome, colaborador_CPF, colaborador_biometria, colaborador_ativo, colaborador_telefone, colaborador_email, empresa_id, setor_id){
        this.colaborador_id = colaborador_id
        this.colaborador_nome = colaborador_nome
        this.colaborador_CPF = colaborador_CPF
        this.colaborador_biometria = colaborador_biometria
        this.colaborador_ativo = colaborador_ativo
        this.colaborador_telefone = colaborador_telefone
        this.colaborador_email = colaborador_email
        this.empresa_id = empresa_id
        this.setor_id = setor_id
    }
}