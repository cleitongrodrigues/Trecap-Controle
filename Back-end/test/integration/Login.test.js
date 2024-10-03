import request from 'supertest'
import app from '../../WebAPI/appConfig'

describe("teste de login", () => {

    test("Login de usuário válido", async () => {
        const response = await request(app).post('/login').send({ email: 'joao.silva@empresaabc.com', password: 'senha123' })
        expect(response.body.token).toEqual(expect.stringContaining('.'))
    })

    test("Login de usuário inválido!", async () => {
        const response = await request(app).post('/login').send({ email: 'joao.silva@empresaabc.cm', password: 'senha123' })
        expect(response.status).toBe(500)
    })

    test("verifica se o usuário está sendo reconhecido pela aplicação", async ()=>{
        const response = await request(app).post('/login').send({ email: 'joao.silva@empresaabc.com', password: 'senha123' })
        const token = response.body.token


        const responseVerify = await request(app).get('/protected').set('Authorization', `Bearer ${token}`)

        expect(responseVerify.body.username).toBeDefined()
    })

    test("Tenta acessar um rota que o usuario não é permitido", async ()=>{
        const response = await request(app).post('/login').send({ email: 'maria.souza@techsolutions.com', password: 'senha456' })
        const token = response.body.token


        const responseVerify = await request(app).get('/protected').set('Authorization', `Bearer ${token}`)
        expect(responseVerify.status).toBe(403)
    })

})
