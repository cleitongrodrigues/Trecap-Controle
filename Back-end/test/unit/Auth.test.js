import FactoryUser from "../../Domain/Domain Service/FactoryUser"
import UnauthorizedException from "../../Domain/Exception/UnauthorizedException"
import Auth from "../../Infrastructure/Auth/Auth"

test("Auth Service Gerar um JWT", ()=>{
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

test("Auth Service Verifica o token", ()=>{
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

test("Auth Service Fazer login", async ()=>{
    const userInfo = {
        email: "a@teste.com",
        password: "senha123"
    }

    const token = await Auth.Login(userInfo)
    expect(token).toEqual(expect.stringContaining('.'))
})

test("Decodifica as informações do token", async ()=>{
    const userInfo = {
        email: "a@teste.com",
        password: "senha123"
    }

    let token = await Auth.Login(userInfo)

    const decodeToken = Auth.getTokenInfo(token)

    expect(decodeToken).toBeDefined()
})

test("Decodifica as informações de um token inválido", async ()=>{
    const userInfo = {
        email: "a@teste.com",
        password: "senha123"
    }

    let token = await Auth.Login(userInfo)
    token += 'invalid'

    expect(()=>Auth.getTokenInfo(token)).toThrow(UnauthorizedException)
})