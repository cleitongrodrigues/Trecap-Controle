import ValidationException from "../Exception/ValidationException.js"
import Employee from "./Colaborador.js"
import Evento from "./Evento.js"

export default class User {
    constructor(usu_id, usu_name, usu_CPF, tipo_usuario_id, usu_ativo, usu_email, password, telefone, registerDate, companyId) {

        if (!email) throw new ValidationException("O email não pode ser nulo")
        if (!cpf) throw new ValidationException("O CPF não pode ser vazio")

        this.userId = userId
        this.name = name
        this.cpf = cpf
        this.tipo_usuario_id = tipo_usuario_id
        this.usu_ativo = usu_ativo
        this.email = email
        this.password = password
        this.telefone = telefone
        this.registerDate = registerDate
        this.companyId = companyId
    }

    cancel() {
        if (this.usu_ativo == 0) throw new Error('Usuário inexistente!')
        this.usu_ativo = 0
    }

    registerEmployee(employeeInfo) {
        const isAdmin = this.userType === 1
        if (!isAdmin) throw new Error("Você não tem permissão para regisrtar um funcionário!")

        const newEmployee = new Employee(employeeInfo.employeeId, employeeInfo.name, employeeInfo.cpf, employeeInfo.biometria, 1, employeeInfo.telefone, employeeInfo.email, this.companyId)

        return newEmployee
    }

    registerEvento(eventoInfo) {
        const isAdmin = this.userType === 1
        if (!isAdmin) throw new Error("Você não tem permissão para registrar um evento!")

        const newEvento = new Evento(eventoInfo.eventoId, eventoInfo.name, new Date(eventoInfo.dateStartTime), new Date(eventoInfo.dateEndTime), eventoInfo.local, 1, this.userId)

        return newEvento
    }

    createSetor(setorName) {
        if (!this.isAdmin()) throw new UnauthorizedException("Você não tem permissão para criar um setor!")

        const newSetor = new Setor(1, setorNome, this.companyId)

        return newSetor
    }

    isAdmin() {
        return this.userType === 1
    }
}