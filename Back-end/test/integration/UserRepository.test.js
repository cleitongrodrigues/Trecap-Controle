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

describe("Construir String de Where clauses", () => {
    it("Criar um where filtrando por nome", ()=>{
        const filter = { name: 'João'}

        const where = userRepository.builStringWhereClauseForUser(filter)
        
        expect(where).toBe('WHERE usu_nome LIKE ? AND usu_ativo = 1')
    })

    it("Criar um where filtrando por nome e tipo", ()=>{
        const filter = { name: 'João', userType: 1}

        const where = userRepository.builStringWhereClauseForUser(filter)
        
        expect(where).toBe('WHERE usu_nome LIKE ? AND tipo_usuario_id LIKE ? AND usu_ativo = 1')
    })
})