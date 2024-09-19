import request from 'supertest'
import app from '../appConfig'

describe("Método GET em /usuarios", () => {
    it("Tenta Buscas todos usuários", async () => {
        const response = await request(app).get('/usuarios')

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('dados')
    })

    it("Tenta por um ID(2) de usuário existente", async () => {
        const response = await request(app).get('/usuarios/2')


        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('dados')
    })

    
    it("Tenta por um ID de usuário inexistente", async () => {
        const response = await request(app).get('/usuarios/1000')


        expect(response.statusCode).toBe(404)
    })
})


describe("Método POST em /usuarios", () => {
    it("Tenta cadastrar um novo usuário", async () => {
        const userInfo = {
            name: "userAPI",
            cpf: "96545432189",
            userType: 1,
            status: 1,
            email: "user@API.com",
            telefone: "11987654341",
            registerDate: "2024-11-12",
        }

        const response = await request(app)
        .post('/usuarios')
        .send(userInfo)
        expect(response.statusCode).toBe(201)

        const responseTwo = await request(app)
        .get('/usuarios/4')

        expect(responseTwo.statusCode).toBe(200)
        expect(responseTwo.body.dados).toMatchObject(userInfo)
    })

    it("Tenta cadastrar um novo usuário um email já existente", async () => {
        const userInfo = {
            name: "userAPI",
            cpf: "9643565432189",
            userType: 1,
            status: 1,
            email: "user@API.com",
            telefone: "11987654341",
            registerDate: "2024-11-12",
        }

        const response = await request(app)
        .post('/usuarios')
        .send(userInfo)
        expect(response.statusCode).toBe(500)
    })

    it("Tenta cadastrar um novo usuário um CPF já existente", async () => {
        const userInfo = {
            name: "userAPI",
            cpf: "9643565432189",
            userType: 1,
            status: 1,
            email: "userAPIAPI@API.com",
            telefone: "11987654341",
            registerDate: "2024-11-12",
        }

        const userInfoTwo = {
            name: "userAPI",
            cpf: "9643565432189",
            userType: 1,
            status: 1,
            email: "userAPIAPI@API.com",
            telefone: "11987654341",
            registerDate: "2024-11-12",
        }

        await request(app)
        .post('/usuarios')
        .send(userInfo)

        const response = await request(app)
        .post('/usuarios')
        .send(userInfoTwo)
        expect(response.statusCode).toBe(500)
    })

})

describe('Método Dele em /usuarios', ()=>{
    it('Delete usuário de ID 2', async()=>{
        const response = await request(app).delete('/usuarios/2')
        expect(response.statusCode).toBe(200)

        const responseVerify = await request(app).get('/usuarios/2')
        expect(responseVerify.statusCode).toBe(404)
    })

    it('Tenta Deletar um usuário inexistente', async () => {
        const response = await request(app).delete('/usuarios/1000')
        expect(response.statusCode).toBe(500)
    })
})