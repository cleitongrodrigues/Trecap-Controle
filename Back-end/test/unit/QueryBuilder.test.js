import QueryBuilder from "../../Infrastructure/database/QueryBuilder"

describe("Criar Strings SQL", () => {
    it("Criar uma string SQL com select em todos campos", () => {
        const tableName = "users"

        const queryBuilder = new QueryBuilder(tableName)

        const stringResult = queryBuilder.build()

        expect(stringResult).toBe(`SELECT * FROM ${tableName}`)
    })

    it("Criar uma string SQL com select em nome e idade", () => {
        const tableName = "users"

        const queryBuilder = new QueryBuilder(tableName)

        const stringResult = queryBuilder.select(["nome", "idade"]).build()

        expect(stringResult).toBe(`SELECT nome, idade FROM ${tableName}`)
    })

    it("Cria uma string SQL com filter de WHERE age >= 18", () => {
        const tableName = "users"

        const queryBuilder = new QueryBuilder(tableName)

        const stringResult = queryBuilder.whereAnd("age >= 18").build()
        expect(stringResult).toBe(`SELECT * FROM ${tableName} WHERE age >= 18`)
    })

    it("Cria uma string SQL com filter de WHERE nome = João AND age >= 18", () => {
        const tableName = "users"

        const queryBuilder = new QueryBuilder(tableName)

        const stringResult = queryBuilder
            .whereAnd("nome = João")
            .whereAnd("age >= 18")
            .build()


        expect(stringResult).toBe(`SELECT * FROM ${tableName} WHERE nome = João AND age >= 18`)
    })

    it("Cria uma string SQL com filter de WHERE nome = João OR age >= 18", () => {
        const tableName = "users"

        const queryBuilder = new QueryBuilder(tableName)

        const stringResult = queryBuilder
            .whereAnd("nome = João")
            .whereOr("age >= 18")
            .build()


        expect(stringResult).toBe(`SELECT * FROM ${tableName} WHERE nome = João OR age >= 18`)
    })

    it("Cria uma string SQL com filter de WHERE nome = João OR age >= 18", () => {
        const tableName = "users"

        const queryBuilder = new QueryBuilder(tableName)

        const stringResult = queryBuilder
            .whereAnd("nome = João")
            .whereOr("age >= 18")
            .build()


        expect(stringResult).toBe(`SELECT * FROM ${tableName} WHERE nome = João OR age >= 18`)
    })

    it("Cria uma string SQL com filter de WHERE nome = João OR age >= 18 AND cidade = São Paulo", () => {
        const tableName = "users"

        const queryBuilder = new QueryBuilder(tableName)

        const stringResult = queryBuilder
            .whereAnd("nome = João")
            .whereOr("age >= 18")
            .whereAnd("cidade = São Paulo")
            .build()


        expect(stringResult).toBe(`SELECT * FROM ${tableName} WHERE nome = João OR age >= 18 AND cidade = São Paulo`)
    })

    it("Criar uma string SQL com select em todos campos e ordena por nome de forma crescente", () => {
        const tableName = "users"

        const queryBuilder = new QueryBuilder(tableName)

        const stringResult = queryBuilder.orderBy('name').build()

        expect(stringResult).toBe(`SELECT * FROM ${tableName} ORDER BY name ASC`)
    })

    it("Criar uma string SQL com select em todos campos e ordena por nome de forma decrescente", () => {
        const tableName = "users"

        const queryBuilder = new QueryBuilder(tableName)

        const stringResult = queryBuilder.orderBy('name', "DESC").build()

        expect(stringResult).toBe(`SELECT * FROM ${tableName} ORDER BY name DESC`)
    })

    it("Criar uma string SQL com select em todos campos com paginação de tamanho 10 e na página 2", () => {
        const tableName = "users"

        const queryBuilder = new QueryBuilder(tableName)

        const stringResult = queryBuilder.limit(10).page(2).build()

        expect(stringResult).toBe(`SELECT * FROM ${tableName} LIMIT 10 OFFSET 2`)
    })

    
    it("Criar uma string SQL com select em todos campos com paginação de tamanho 20 e na página 2", () => {
        const tableName = "users"

        const queryBuilder = new QueryBuilder(tableName)

        const stringResult = queryBuilder.limit(20).page(2).build()

        expect(stringResult).toBe(`SELECT * FROM ${tableName} LIMIT 20 OFFSET 2`)
    })
})