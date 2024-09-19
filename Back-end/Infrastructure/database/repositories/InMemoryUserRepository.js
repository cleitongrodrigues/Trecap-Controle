import User from "../../../Domain/Entities/User.js"

class InMemoryUserRepository {
    constructor() {
        this.userList = [
            {
                userID: 1,
                name: "Lucas Oliveira",
                cpf: "98765432100",
                userType: 1,
                status: 1,
                email: "lucas.oliveira@email.com",
                telefone: "11987654321",
                registerDate: "2024-01-15",
            },
            {
                userID: 2,
                name: "Ana Silva",
                cpf: "12345678900",
                userType: 1,
                status: 1,
                email: "ana.silva@email.com",
                telefone: "21912345678",
                registerDate: "2023-08-30",
            },
            {
                userID: 3,
                name: "Ricardo Mendes",
                cpf: "55566677788",
                userType: 2,
                status: 1,
                email: "ricardo.mendes@email.com",
                telefone: "31998765432",
                registerDate: "2022-12-05",
            },
        ]
    }

    async getUserById(ID) {
        const userData = this.userList.find(user => user.userID == ID && user.status === 1)
        if(!userData) return null

        const user = new User(userData.userID, userData.name, userData.cpf, userData.userType, userData.status, userData.email, userData.telefone, userData.registerDate )

        return user
    }

    async getUserByCPF(cpf) {
        const user = this.userList.find(user => user.cpf == cpf)

        if(user) return user

        return null
    }

    async getUserByEmail(email) {
        const user = this.userList.find(user => user.email == email)

        if(user) return user

        return null
    }

    async createUser(userCreateDTO){
        const newUser = new User(
            this.userList.length + 1,
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

    async updateUser(userData){
        for (let i = 0; i < this.userList.length; i++) {
            if (this.userList[i].userID === userData.userID) {
                this.userList[i] = userData;
            }
        }
    }

    async getUsers(){
        return this.userList
    }
}

export default new InMemoryUserRepository()