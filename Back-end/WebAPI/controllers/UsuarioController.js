import UserService from "../../Application/UseCases/User/UserService.js";
import Auth from "../../Infrastructure/Auth/Auth.js";

export const UsuarioController = {
    async ListarUsuarios(request, response, next) {
        try {
            const users = await UserService.getUsers()

            return response.status(200).json({
                mensagem: 'Lista de Usuários',
                dados: users,
            });

        } catch (error) {
            next(error)
        }
    },

    async ListarUsuario(request, response, next) {
        try {
            const { id } = request.params
            const user = await UserService.getUserById(id)

            return response.status(200).json({
                dados: user
            });

        } catch (error) {
            next(error)
        }
    },

    async CadastrarUsuario(request, response, next) {
        try {
            const newUser = await UserService.createUser(request.body)

            return response.status(201).json({
                mensagem: `Usuário ${newUser.userId} cadastrado com sucesso!`,
            });
        } catch (error) {
            next(error)
        }
    },

    // async EditarUsuario(request, response, next){
    //     try {

    //         const {usu_nome, usu_CPF, tipo_usuario_id, 
    //             usu_ativo, usu_email, usu_telefone, usu_data_cadastro, usu_ultimo_login} = request.body;

    //         const {usu_id} = request.params;

    //         const sql = `UPDATE Usuario SET usu_nome = ?, usu_CPF = ?, tipo_usuario_id = ?, 
    //             usu_ativo = ?, usu_email = ?, usu_telefone = ?, usu_data_cadastro = ?, usu_ultimo_login = ?
    //             WHERE usu_id = ?;`;

    //         const values = [usu_nome, usu_CPF, tipo_usuario_id, 
    //             usu_ativo, usu_email, usu_telefone, usu_data_cadastro, usu_ultimo_login, usu_id];

    //         const atualizaDados = await db.query(sql, values);
    //         return response.status(200).json({
    //             sucesso: true,
    //             mensagem: `Usuário ${usu_id} editado com sucesso!`,
    //             dados: atualizaDados[0].affectedRows
    //         });
    //     } catch (error) {
    //         return response.status(500).json({
    //             sucesso: false,
    //             mensagem: 'Erro ao editar usuário :(',
    //             dados: error.mensagem
    //         });
    //     }
    // },

    async ApagarUsuario(request, response, next) {
        try {
            const { id } = request.params

            await UserService.deleteUser(id)

            return response.status(200).json({
                mensagem: `Usuário ${id} deletado com sucesso!`,
            });
        } catch (error) {
            next(error)
        }
    },

    async Login(request, response, next) {
        try {
            const userInfo = {
                email: request.body.email,
                password: request.body.password
            }

            const token = await Auth.Login(userInfo)

            return response.status(200).json({
                token: token
            })
        } catch (error) {
            next(error)
        }

    },
    async private(request, response, next) {
        try {
            return response.status(200).send({
                username: request.user.name
            })
        } catch (error) {
            next(error)
        }

    }
}


