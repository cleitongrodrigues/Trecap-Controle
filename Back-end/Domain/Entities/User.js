import ValidationException from "../Exception/ValidationException.js"
import Employee from "./Employee.js"
import Evento from "./Evento.js"

export default class User {
    constructor(userId, name, cpf, userType, status, email, password, telefone, registerDate, companyId) {

        if (!email) throw new ValidationException("O email não pode ser nulo")
        if (!cpf) throw new ValidationException("O CPF não pode ser vazio")

        this.userId = userId
        this.name = name
        this.cpf = cpf
        this.userType = userType
        this.status = status
        this.email = email
        this.password = password
        this.telefone = telefone
        this.registerDate = registerDate
        this.companyId = companyId
    }

    cancel() {
        if (this.status == 0) throw new Error('Usuário inexistente!')
        this.status = 0
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