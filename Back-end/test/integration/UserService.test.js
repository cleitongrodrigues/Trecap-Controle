import UserService from "../../Application/UseCases/User/UserService"

describe('Criar um usuário a partir de UserService', () => {
    it.skip("Criar um usuário válido", async ()=>{
        const inputCreateUser = {
            name: "TestJest" + Math.floor(Math.random() * 10000),
            email: "TeseJest@gmail.com",
            cpf: "234234",
            password: "teste",
            registerDate: "2024-11-12",
            telefone:"sdsdfsfds",
            companyId: 1
        }

        const newUser = await UserService.createUser(inputCreateUser)

        const verifyUser = await UserService.getUserById(newUser.userId)

        expect(verifyUser.name).toBe(inputCreateUser.name)
    })
})