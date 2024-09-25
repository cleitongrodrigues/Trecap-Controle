import Employee from "./Employee"
import Evento from "./Evento"

export default class User{
    constructor(userId, name, cpf, userType, status, email, password, telefone, registerDate, companyId)
    {
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

    cancel(){
        if(this.status == 0) throw new Error('Usuário inexistente!')
        this.status = 0
    }

    registerEmployee(employeeInfo){
        const isAdmin = this.userType === 1
        if(!isAdmin) throw new Error("Você não tem permissão para regisrtar um funcionário!")

        const newEmployee = new Employee(employeeInfo.employeeId, employeeInfo.name, employeeInfo.cpf, employeeInfo.biometria, 1, employeeInfo.telefone, employeeInfo.email, this.companyId)

        return newEmployee
    }

    registerEvento(eventoInfo){
        const isAdmin = this.userType === 1
        if(!isAdmin) throw new Error("Você não tem permissão para registrar um evento!")

        const newEvento = new Evento(eventoInfo.eventoId, eventoInfo.name, new Date(eventoInfo.dateStartTime), new Date(eventoInfo.dateEndTime), eventoInfo.local, 1, this.userId)

        return newEvento
    }
}