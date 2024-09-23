import UserService from "../../Application/UseCases/User/UserService"
import inMemoryAdressRepository from "../../Infrastructure/database/repositories/inMemoryAdressRepository"
import InMemoryUserRepository from "../../Infrastructure/database/repositories/InMemoryUserRepository"

describe('Criar um usuário a partir de UserService', () => {
    it("Criar um usuário válido", async ()=>{
        const userInfo = {
            name: "João Pedro",
            cpf: "98765432189",
            userType: 1,
            status: 1,
            email: "joao@pedro.com",
            password: 'JP123',
            telefone: "11987654341",
            registerDate: "2024-11-12",
            adress : {
                logradouro: '',
                numero: '193',
                complemento: 'Predio',
                bairro : 'Joaqui Teixeira Pinto',
                cidade : 'Tupã',
                estado : 'SP',
                cep : '123455767-1293',
            }
        }

        const newUser = await UserService.createUser(userInfo)

        const userInsertIntoDB = await UserService.getUserById(newUser.userId)
  

        expect(userInsertIntoDB.userId).toBe(newUser.userId)
        expect(userInsertIntoDB).toHaveProperty('adress')
        expect(userInsertIntoDB).toBeDefined()
    })
})