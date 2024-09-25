import UserService from "../../Application/UseCases/User/UserService"

describe('Criar um usuário a partir de UserService', () => {
    it("Criar um usuário válido", async ()=>{
        const inputCreateUser = {
            name: "TestJest",
            email: "TeseJest@gmail.com",
            cpf: "234234",
            userTpe: 1,
            password: "teste",
            registerDate: "2024-11-12",
            telefone:"sdsdfsfds",
            companyId: 1
        }

        const newUser = await UserService.createUser(inputCreateUser)

        console.log(newUser)
    })
})