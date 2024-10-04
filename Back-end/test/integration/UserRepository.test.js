import userRepository from "../../Infrastructure/database/repositories/userRepository.js"

describe("Get User com parametros", ()=>{
    it("GET com pageSize igual a 5", async () =>{
        const params = {
            page: 1,
            pageSize: 5,
            filter: {name: 'joão', userType: 1},
        }

        const users = await userRepository.getUsers(params)
        expect(users.length).toBe(params.pageSize)
    })
})
