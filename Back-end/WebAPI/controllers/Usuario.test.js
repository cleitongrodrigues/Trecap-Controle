import { UsuarioController } from "./UsuarioController"
import axios from "axios";
import jest from 'jest-mock';

const URL_BASE_API = 'http://localhost:3333/usuarios'

const api = axios.create();

api.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.resolve(error);
    }
);

// describe('Teste api rota /usuarios', () => {
//     test('GET /usuarios está retornando items', async () => {
//         const response = await axios.get(URL_BASE_API)

//         expect(response.status).toBe(200)
//         const { data } = response

//         expect(data).toBeDefined()
//     })

//     test('GET /usuarios:id com um ID válido', async () => {
//         const response = await axios.get(URL_BASE_API + '/1')

//         expect(response.status).toBe(200)
//     })

//     test('GET /usuarios:id com um ID inválido', async () => {
//         const response = await api.get(URL_BASE_API + '/1000')

//         expect(response.status).toBe(404)
//     })

//     test('POST /usuarios cadastrar um usuário', async () => {
//         const randomNumber = Math.floor(Math.random() * 10001);
        
//         const input = {
//             name: "Lucas Oliveira" + randomNumber,
//             cpf: "98765432100",
//             userType: 1,
//             status: 1,
//             email: "lucass.oliveira@email.com",
//             telefone: "11987654321",
//             registerDate: "2024-01-15"
//         }

//         const response = await axios.post(URL_BASE_API, input)

//         expect(response.status).toBe(200)
//     })

//     test('POST /usuarios não deixar cadastrar um usuário com email já cadastrado', async () => {
//         const randomNumber = Math.floor(Math.random() * 10001);
        
//         const input = {
//             name: "Lucas Oliveira" + randomNumber,
//             cpf: "98765432560",
//             userType: 1,
//             status: 1,
//             email: "lucass.oliveira@email.com",
//             telefone: "11987654321",
//             registerDate: "2024-01-15"
//         }

//         const response = await api.post(URL_BASE_API, input)
//         expect(response.status).toBe(500)
//     })

//     test('POST /usuarios cadastrar um usuário com mesmo CPF', async () => {
//         const randomNumber = Math.floor(Math.random() * 10001);
        
//         const input = {
//             name: "Lucas Oliveira" + randomNumber,
//             cpf: "98765432100",
//             userType: 1,
//             status: 1,
//             email: "lucass.oliveira"+ randomNumber +"@email.com",
//             telefone: "11987654321",
//             registerDate: "2024-01-15"
//         }

//         const response = await axios.post(URL_BASE_API, input)

//         expect(response.status).toBe(500)
//     })




    // test('Rota /usuario com POST cadastrar um usuário', async () => {
    //     const request = {
    //         body: {
                // name: "Lucas Oliveira",
                // cpf: "98765432100",
                // userType: 1,
                // status: 1,
                // email: "lucass.oliveira@email.com",
                // telefone: "11987654321",
                // registerDate: "2024-01-15"
    //         }
    //     }
    //     const response = {
    //         status: jest.fn().mockReturnThis(),
    //         json: jest.fn(),
    //         send: jest.fn()
    //     }
    //     await UsuarioController.CadastrarUsuario(request, response)

    //     expect(response.status).toHaveBeenCalledWith(200);
    // })

    // test('Rota /usuario com POST cadastrar um usuário com mesmo email', async () => {
    //     const request = {
    //         body: {
    //             name: "Lucas Oliveira",
    //             cpf: "98765432100",
    //             userType: 1,
    //             status: 1,
    //             email: "lucass.oliveira@email.com",
    //             telefone: "11987654321",
    //             registerDate: "2024-01-15"
    //         }
    //     }
    //     const response = {
    //         status: jest.fn().mockReturnThis(),
    //         json: jest.fn(),
    //         send: jest.fn()
    //     }
    //     await UsuarioController.CadastrarUsuario(request, response)

    //     expect(response.status).toHaveBeenCalledWith(500);
    // })


// })