import ValidationException from "../Exception/ValidationException.js"
import Employee from "./Colaborador.js"
import Evento from "./Evento.js"

export default class User {
    constructor(usu_id, usu_nome, usu_CPF, tipo_usuario_id, usu_ativo, usu_email, usu_senha, usu_telefone, usu_data_cadastro, empresa_id) {
        this.usu_id = usu_id
        this.usu_nome = usu_nome
        this.usu_CPF = usu_CPF
        this.tipo_usuario_id = tipo_usuario_id
        this.usu_ativo = usu_ativo
        this.usu_email = usu_email
        this.usu_senha = usu_senha
        this.usu_telefone = usu_telefone
        this.usu_data_cadastro = usu_data_cadastro
        this.empresa_id = empresa_id
    }

    cancel() {
        if (this.usu_ativo == 0) throw new Error('Usuário inexistente!')
        this.usu_ativo = 0
    }

    registerEmployee(employeeInfo) {
        if (!this.isAdmin()) throw new Error("Você não tem permissão para regisrtar um funcionário!")

        const newEmployee = new Employee(employeeInfo.employeeId, employeeInfo.name, employeeInfo.cpf, employeeInfo.biometria, 1, employeeInfo.telefone, employeeInfo.email, this.companyId)

        return newEmployee
    }

    registerEvento(eventoInfo) {
        if (!this.isAdmin()) throw new Error("Você não tem permissão para registrar um evento!")

        const newEvento = new Evento(eventoInfo.eventoId, eventoInfo.name, new Date(eventoInfo.dateStartTime), new Date(eventoInfo.dateEndTime), eventoInfo.local, 1, this.usu_id)

        return newEvento
    }

    createSetor(setorName) {
        if (!this.isAdmin()) throw new UnauthorizedException("Você não tem permissão para criar um setor!")

        const newSetor = new Setor(1, setorNome, this.companyId)

        return newSetor
    }

    isAdmin() {
        return this.tipo_usuario_id === 1
    }
}