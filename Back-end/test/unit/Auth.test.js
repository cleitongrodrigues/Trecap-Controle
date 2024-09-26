import FactoryUser from "../../Domain/Domain Service/FactoryUser"
import Auth from "../../Infrastructure/Auth/Auth"

test("Gerar um JWT", ()=>{
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

    const token = Auth.generateToken(newUser)

    expect(token).toEqual(expect.stringContaining('.'))
})

test("Verifica o token", ()=>{
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

    const token = Auth.generateToken(newUser)

    const decodeToken = Auth.getTokenInfo(token)
    
    expect(decodeToken).toMatchObject({userId:1, name: 'João Pedro'})
})