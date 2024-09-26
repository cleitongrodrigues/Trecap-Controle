import UserService from "../../Application/UseCases/User/UserService.js";
import Auth from "../../Infrastructure/Auth/Auth.js";

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
            const{ usu_nome, usu_cpf, tipo_usuario_id, usu_email, usu_senha, usu_telefone, empresa_id }  = request.body

            
            const inputCreateUser = {
                name: usu_nome,
                email: usu_email,
                cpf: usu_cpf,
                userTpe: tipo_usuario_id,
                password: usu_senha,
                telefone: usu_telefone,
                companyId: empresa_id
            }

            const newUser = await UserService.createUser(inputCreateUser)

            return response.status(201).json({
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

    async ApagarUsuario(request, response) {
        try {
            const { id } = request.params

            await UserService.deleteUser(id)
            return response.status(200).json({
                sucesso: true,
                mensagem: `Usuário ${id} deletado com sucesso!`,
            });
        } catch (error) {
            return response.status(500).send(error.mensagem);
        }
    },

    async Login(request, response){
        try {
            const userInfo = {
                email: request.email,
                password: request.password
            }
    
            const token = await Auth.Login(userInfo)

            return response.status(200).json({
                token: token
            })

        } catch (error) {
            return response.status(500).send(error.mensagem);
        }
        
    }
}


