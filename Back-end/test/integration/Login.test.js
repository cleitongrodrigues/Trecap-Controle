import request from 'supertest'
import app from '../../WebAPI/appConfig'

test("GET Usuarios", async ()=>{
    const response = await request(app).post('/login').send({email:'joao.silva@empresaabc.com', password:'senha123'})

    console.log(response)
})
