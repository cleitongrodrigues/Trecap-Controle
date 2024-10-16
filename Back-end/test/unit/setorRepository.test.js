import SetorRepository from "../../Infrastructure/database/repositories/setorRepository"

describe("Teste SetorRepository", ()=>{
    it("SQL filtrando mais de um nome", ()=>{
        const tableName = "Setores"
        const setorRepository = new SetorRepository(tableName)

        const input = {
            names: ["Leonardo", "Amanda", "Carol"],
            page: 1,
            pageSize: 10
        }

        const result = setorRepository.getSetoresByName(input)

        expect(result).toBe(`SELECT * FROM ${tableName} WHERE setor_nome = Leonardo OR setor_nome = Amanda OR setor_nome = Carol LIMIT 10 OFFSET 0`)
    })
})