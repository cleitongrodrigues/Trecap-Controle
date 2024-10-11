import request from 'supertest'
import app from '../../WebAPI/appConfig'

describe('Rota criação de usuário', () => {
    it("Tenta criar um usuario faltando parametros", async () => {
        const response = await request(app).post('/Usuarios').send(
            {
                name: "João Pedro",
                email: "joao@pedro.com",
                password: "JP1231",
                telefone: "11987654341",
                registerDate: "2024-11-12",
                companyId: 1
            }
        )


        expect(response.body.errors.cpf).toBeDefined()
    })
    it("Tenta criar um usuario faltando parametros", async () => {
        const response = await request(app).post('/Usuarios').send(
            {
                email: "joao@pedro.com",
                password: "JP1231",
                telefone: "11987654341",
                registerDate: "2024-11-12",
                cpf: "12341212121",
                companyId: 1
            }
        )


        expect(response.body.errors.name).toBeDefined()
    })
    it("Tenta criar um usuario faltando parametros", async () => {
        const response = await request(app).post('/Usuarios').send(
            {
                name: "João Pedro",
                email: "joao@pedro.com",
                password: "JP1231",
                telefone: "11987654341",
                registerDate: "2024-11-12",
                cpf: "12341212121",
            }
        )


        expect(response.body.errors.companyId).toBeDefined()
    })
})