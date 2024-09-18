import { UsuarioController } from "./UsuarioController"
import jest from 'jest-mock';

describe('Teste api rota /usuarios', () => {
    test('Rota /usuario com GET retornando items', async () => {
        const request = {}
        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        }
        await UsuarioController.ListarUsuarios(request, response)

        expect(response.status).toHaveBeenCalledWith(200);
    })

    test('Rota /usuario com GET retornando a busca com um ID válido', async () => {
        const request = {
            params: {
                id: 1
            }
        }
        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        }
        await UsuarioController.ListarUsuario(request, response)

        expect(response.status).toHaveBeenCalledWith(200);
    })

    test('Rota /usuario com GET retornando a busca com um ID inválido', async () => {
        const request = {
            params: {
                id: 1000
            }
        }
        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        }
        await UsuarioController.ListarUsuario(request, response)

        expect(response.status).toHaveBeenCalledWith(500);
    })


    test('Rota /usuario com POST cadastrar um usuário', async () => {
        const request = {
            body: {
                name: "Lucas Oliveira",
                cpf: "98765432100",
                userType: 1,
                status: 1,
                email: "lucass.oliveira@email.com",
                telefone: "11987654321",
                registerDate: "2024-01-15"
            }
        }
        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        }
        await UsuarioController.CadastrarUsuario(request, response)

        expect(response.status).toHaveBeenCalledWith(200);
    })

    test('Rota /usuario com POST cadastrar um usuário com mesmo email', async () => {
        const request = {
            body: {
                name: "Lucas Oliveira",
                cpf: "98765432100",
                userType: 1,
                status: 1,
                email: "lucass.oliveira@email.com",
                telefone: "11987654321",
                registerDate: "2024-01-15"
            }
        }
        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        }
        await UsuarioController.CadastrarUsuario(request, response)

        expect(response.status).toHaveBeenCalledWith(500);
    })


})