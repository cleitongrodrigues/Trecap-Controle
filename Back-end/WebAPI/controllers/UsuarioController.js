import InMemoryUserRepository from "../../database/repositories/InMemoryUserRepository.js";
// import getUsersCase from "../../Application/UseCases/User/getUsersCase.js";
// import createUserCase from "../../Application/UseCases/User/createUser.js";
// import getUserByIdCase from "../../Application/UseCases/User/getUserByIdCase.js";
import UserService from "../../Application/UseCases/User/UserService.js";

export const UsuarioController = {
    async ListarUsuarios(request, response) {
        try {
            const users = await UserService.getUsers()

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de Usuários',
                dados: users,
            });

        } catch (error) {
            return response.status(500).send(error.message);
        }
    },

    async ListarUsuario(request, response) {
        try {
            const { id } = request.params

            const user = await UserService.getUserById(id)

            if (!user) return response.status(404).send('Usuário não encontrado!')

            return response.status(200).json({
                dados: user
            });

        } catch (error) {
            return response.status(500).send(error.message);
        }
    },

    async CadastrarUsuario(request, response) {
        try {
            const newUser = await UserService.createUser(request.body)

            return response.status(200).json({
                sucesso: true,
                mensagem: `Usuário ${newUser.userID} cadastrado com sucesso!`,
            });
        } catch (error) {
            return response.status(500).send(error.message)
        }
    },

    // async EditarUsuario(request, response){
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

    // async ApagarUsuario(request, response){
    //     try {
    //         const usu_ativo = false;

    //         const {usu_id} = request.params;

    //         const sql = `UPDATE Usuario SET usu_ativo = ?
    //             WHERE usu_id = ?;`;

    //         const values = [usu_ativo, usu_id];

    //         const atualizacao = await db.query(sql, values);
    //         return response.status(200).json({
    //             sucesso: true,
    //             mensagem: `Usuário ${usu_id} deletado com sucesso!`,
    //             dados: atualizacao[0].affectedRows
    //         });
    //     } catch (error) {
    //         return response.status(500).json({
    //             sucesso: false,
    //             mensagem: 'Erro ao apagar usuário',
    //             dados: error.mensagem
    //         });
    //     }
    // }
}


