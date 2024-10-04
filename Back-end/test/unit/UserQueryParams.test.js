import UserQueryParamys from "../../Infrastructure/UserQueryParams"

describe("Construção de Selects", ()=>{
    it("Cria um select filtrando por nome", ()=>{
        const queryBuilder = new UserQueryParamys()

        queryBuilder.setFilterName('João')

        const result = queryBuilder.build()

        expect(result.query).toBe("SELECT * FROM usuario WHERE usu_nome LIKE ? AND usu_ativo = 1")
        expect(result.params).toEqual(['%João%'])
    })

    it("Cria um select filtrando por nome e tipo de usuário" , ()=>{
        const queryBuilder = new UserQueryParamys()

        queryBuilder
            .setFilterName('João')
            .setFilterUserType(1)

        const result = queryBuilder.build()

        expect(result.query).toBe("SELECT * FROM usuario WHERE usu_nome LIKE ? AND tipo_usuario_id LIKE ? AND usu_ativo = 1")
        expect(result.params).toEqual(['%João%', '%1%'])
    })

    it("Cria um select filtrando sem passar nome", ()=>{
        const queryBuilder = new UserQueryParamys()

        queryBuilder.setFilterName('')

        const result = queryBuilder.build()

        expect(result.query).toBe("SELECT * FROM usuario WHERE usu_ativo = 1")
        expect(result.params).toEqual([])
    })
    it("Cria um select filtrando por nome e com paginação", ()=>{
        const queryBuilder = new UserQueryParamys()

        queryBuilder
            .setFilterName('João')
            .withPagnation()

        const result = queryBuilder.build()

        expect(result.query).toBe("SELECT * FROM usuario WHERE usu_nome LIKE ? AND usu_ativo = 1 LIMIT ? OFFSET ?")
        expect(result.params).toEqual(['%João%', 10, 0])
    })
})