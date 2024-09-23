import Adress from "../../../Domain/Entities/Adress.js"
import User from "../../../Domain/Entities/User.js"
import inMemoryAdressRepository from "./inMemoryAdressRepository.js"

class InMemoryUserRepository {
    constructor() {
        this.userList = [
            {
                userId: 1,
                name: "Lucas Oliveira",
                cpf: "98765432100",
                userType: 1,
                status: 1,
                email: "lucas.oliveira@email.com",
                password: 'senha321',
                telefone: "11987654321",
                registerDate: "2024-01-15",
                adress: {
                    adressId: 1,
                    adressLogradouro: '',
                    adressNumber: '123',
                    adressComplemento: 'Casa',
                    adressBairro: 'Jose Camargo',
                    adressCidade: 'Tupã',
                    adressEstado: 'SP',
                    adressCep: '12312312343'
                }
            },
            {
                userId: 2,
                name: "Ana Silva",
                cpf: "12345678900",
                userType: 1,
                status: 1,
                email: "ana.silva@email.com",
                password: 'password123',
                telefone: "21912345678",
                registerDate: "2023-08-30",
                adress: {
                    adressId: 2,
                    adressLogradouro: '',
                    adressNumber: '1345',
                    adressComplemento: 'Casa',
                    adressBairro: 'Augusto Neto',
                    adressCidade: 'Bastos',
                    adressEstado: 'SP',
                    adressCep: '1234345454'
                  }
            },
            {
                userId: 3,
                name: "Ricardo Mendes",
                cpf: "55566677788",
                userType: 2,
                status: 1,
                email: "ricardo.mendes@email.com",
                password: 'adminadmin',
                telefone: "31998765432",
                registerDate: "2022-12-05",
                adress: {
                    adressId: 3,
                    adressLogradouro: '',
                    adressNumber: '673',
                    adressComplemento: 'Predio',
                    adressBairro: 'Marco Antônio',
                    adressCidade: 'Bauru',
                    adressEstado: 'SP',
                    adressCep: '1234234393'
                  }
            },
        ]
    }

    async getUserById(ID) {
        const userData = this.userList.find(user => user.userId == ID && user.status === 1)
        if (!userData) return null


        const adress = new Adress(userData.adress.adressId, userData.adress.adressLogradouro, userData.adress.adressNumber, userData.adress.adressComplemento, userData.adress.adressBairro, userData.adress.adressCidade, userData.adress.adressEstado, userData.adress.adressCep)
        const user = new User(userData.userId, userData.name, userData.cpf, userData.userType, userData.status, userData.email, userData.password,userData.telefone, new Date(userData.registerDate), adress)
        
        return user
    }

    async getUserByCPF(cpf) {
        const user = this.userList.find(user => user.cpf == cpf)

        if (user) return user

        return null
    }

    async getUserByEmail(email) {
        const user = this.userList.find(user => user.email == email)

        if (user) return user

        return null
    }

    async save(user) {
        this.userList.push({ ...user, adress: { ...user.adress } })

        inMemoryAdressRepository.save({ ...user.adress })
    }

    async count() {
        return this.userList.length
    }

    async createUser(userCreateDTO) {
        const newUser = new User(


            userCreateDTO.name,
            userCreateDTO.cpf,
            userCreateDTO.userType,
            userCreateDTO.status,
            userCreateDTO.email,
            userCreateDTO.telefone,
            userCreateDTO.registerDate
        )

        this.userList.push(newUser)

        return newUser
    }

    async updateUser(userData) {
        for (let i = 0; i < this.userList.length; i++) {
            if (this.userList[i].userId === userData.userId) {
                this.userList[i] = userData;
            }
        }
    }

    async getUsers() {
        return this.userList
    }
}

export default new InMemoryUserRepository()