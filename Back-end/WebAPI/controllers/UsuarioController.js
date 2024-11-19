import CreateAdministratorUserInput from "../../Application/Contracts/User/CreateAdministratorUserInput.js";
import UserService from "../../Application/Services/User/UserService.js"
import Auth from "../../Infrastructure/Auth/Auth.js";
import connection from "../../Infrastructure/database/connection.js";

export const UsuarioController = {
    async ListarUsuarios(request, response, next) {
        try {
            const { page, pageSize, filter } = request.query

            const params = {
                page: page,
                pageSize: pageSize,
                filter: filter,
            }

            const users = await UserService.getUsers(params)

            return response.status(200).json({
                mensagem: 'Lista de Usuários',
                dados: users,
            });

        } catch (error) {
            console.log(error)
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
            const createUserInput = new CreateAdministratorUserInput(request.body)

            const newUserDTO = await UserService.createUser(createUserInput)

            return response.status(201).json({
                mensagem: `Usuário ${newUserDTO.usu_id} cadastrado com sucesso!`,
                user: newUserDTO
            });
        } catch (error) {
            next(error)
        }
    },

    async EditarUsuario(request, response, next){
        try {

            const {usu_nome, usu_CPF, usu_email, usu_telefone} = request.body;

            const {usu_id} = request.params;

            const sql = `UPDATE usuario SET usu_nome = ?, usu_CPF = ?, usu_email = ?, usu_telefone = ?
                WHERE usu_id = ?;`;

            const values = [usu_nome, usu_CPF,  usu_email, usu_telefone, usu_id];

            const atualizaDados = await connection.query(sql, values);
            return response.status(200).json({
                sucesso: true,
                mensagem: `Usuário ${usu_id} editado com sucesso!`,
                dados: atualizaDados[0].affectedRows
            });
        } catch (error) {
            console.log(error)
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao editar usuário :(',
                dados: error.mensagem
            });
        }
    },

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
            console.log(error)
            next(error)
        }

    },

    async getUserInfo(request, response, next){
        try {
            const { token } = request.body
            const tokenDecode = Auth.getTokenInfo(token)

            const user = await UserService.getUserById(tokenDecode.usu_id)
            
            return response.status(200).json({
                user: {...user}
            })
        } catch(error){
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

    },
    async verifyToken(request, response, next)
    {
        try{
            const authHeader = request.headers['authorization']
            if (!authHeader && !authHeader?.startsWith('Bearer ')) throw new UnauthorizedException()

            let token = authHeader.split(' ')[1]

            const isValidToken = Auth.verifyToken(token)

            return response.status(200).json({
                    valid_token: isValidToken
            })

        }catch(error)
        {
            next(error)
        }
    },
    async CadastrarImagem(request, response) {
        try {
            const {usu_id} = request.params;
            // console.log(request.file)
            const img = request.file.filename;
            // `http://localhost:3333/public/images/${img}`
            const imgUrl = "adsada";

            const sql = `UPDATE Usuario SET usu_img = ? WHERE usu_id = ?;`;
            const values = [imgUrl, usu_id];

            const resultado = await db.query(sql, values);

            if (resultado[0].affectedRows > 0){
                return response.status(200).json({
                    sucesso: true,
                    mensagem: 'Imagem cadastrada com sucesso!',
                    dados: {usu_id, imgUrl}
                });
            } else {
                return response.status(404).json({
                    sucesso: false,
                    mensagem: 'Usuario não encontrado',
                });
            }
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao cadastrar imagem',
                dados: error.message
            });
        }

    }
}


