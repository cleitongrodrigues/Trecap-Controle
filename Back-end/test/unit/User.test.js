import User from "../../Domain/Entities/User"


test("Cria um usuario", async ()=>{
    const userInfo = {
        name: "João Pedro",
        cpf: "98765432189",
        userType: 1,
        status: 1,
        email: "joao@pedro.com",
        password: 'JP123',
        telefone: "11987654341",
        registerDate: "2024-11-12",
        companyId : 1
    }

    const newUser = new User(1, userInfo.name, userInfo.cpf, userInfo.userType, userInfo.status, userInfo.email, userInfo.password, userInfo.telefone, new Date(userInfo.registerDate), userInfo.companyId)

    expect(newUser).toMatchObject({userId: 1, companyId : 1})
})