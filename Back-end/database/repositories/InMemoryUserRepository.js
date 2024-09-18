import User from "../../Domain/Entities/User.js"

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

    getUserById(ID) {
        for (let user of this.userList){
            if(user.userID == ID){
                return user
            }
        }

        return null
    }

    getUserByEmail(email) {
        for (const user of this.userList){
            if(user.email === email){
                return user
            }
        }

        return null
    }

    createUser(userCreateDTO){
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

    getUsers(){
        return this.userList
    }
}

export default new InMemoryUserRepository()