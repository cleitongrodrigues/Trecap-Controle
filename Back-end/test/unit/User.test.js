import FactoryUser from "../../Domain/Domain Service/FactoryUser"
import User from "../../Domain/Entities/User"

describe("Teste de criação do usuario", () => {
    test("Cria um usuario", async () => {
        const userInfo = {
            userId: 1,
            name: "João Pedro",
            cpf: "98765432189",
            email: "joao@pedro.com",
            password: 'JP123',
            telefone: "11987654341",
            registerDate: "2024-11-12",
            companyId: 1
        }
        const factoryUser = new FactoryUser()

        const newUser = factoryUser.createAdminUser(userInfo)

        expect(newUser).toMatchObject({
            userId: 1,
            name: "João Pedro",
            cpf: "98765432189",
            userType: 1,
            status: 1,
            email: "joao@pedro.com",
            password: 'JP123',
            telefone: "11987654341",
            registerDate: new Date("2024-11-12"),
            companyId: 1,
            companyId: 1
        })
    })
})


describe("Teste das ações do usuário", () => {
    test("Cria um colaborador a partir de um usuário", async () => {
        const userInfo = {
            userId: 1,
            name: "João Pedro",
            cpf: "98765432189",
            email: "joao@pedro.com",
            password: 'JP123',
            telefone: "11987654341",
            registerDate: "2024-11-12",
            companyId: 1
        }

        const factoryUser = new FactoryUser()

        const newUser = factoryUser.createAdminUser(userInfo)
        const employeeInfo = {
            employeeId: 1,
            name: "Carlos Albuquerque",
            cpf: "212334234",
            biometria: "biometriateste",
            telefone: "149923094329",
            email: "carlos@email.com",
        }

        const newEmployee = newUser.registerEmployee(employeeInfo)

        expect(newEmployee).toMatchObject({ companyId: 1, active: 1 })
    })

    test("Cria um evento a partir de um usuário", () => {
        const userInfo = {
            userId: 1,
            name: "João Pedro",
            cpf: "98765432189",
            email: "joao@pedro.com",
            password: 'JP123',
            telefone: "11987654341",
            registerDate: "2024-11-12",
            companyId: 1
        }

        const factoryUser = new FactoryUser()

        const user = factoryUser.createAdminUser(userInfo)

        const eventoInfo = {
            eventoId : 1,
            name : "Treinamento de utilização de EPI's",
            dateStartTime : "2024-04-01",
            dateEndTime : "2024-04-02",
            local : "Amenco",
        }

        const newEvento = user.registerEvento(eventoInfo)

        expect(newEvento).toMatchObject({userId: 1, eventoId: 1, local: "Amenco", name:"Treinamento de utilização de EPI's"})

    })

    test("Cria um evento inválido a partir de um usuário", () => {
        const userInfo = {
            userId: 1,
            name: "João Pedro",
            cpf: "98765432189",
            email: "joao@pedro.com",
            password: 'JP123',
            telefone: "11987654341",
            registerDate: "2024-11-12",
            companyId: 1
        }

        const factoryUser = new FactoryUser()

        const user = factoryUser.createAdminUser(userInfo)

        const eventoInfo = {
            eventoId : 1,
            name : "Treinamento de utilização de EPI's",
            dateStartTime : "2024-04-12",
            dateEndTime : "2024-04-02",
            local : "Amenco",
        }

        expect(()=>user.registerEvento(eventoInfo)).toThrow()
    })
})