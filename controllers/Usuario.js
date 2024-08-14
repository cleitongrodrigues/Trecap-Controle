const db = require('../database/connection');

module.exports = {
    async ListarUSuario(request, response){
        try {
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de Usuários',
                dados: null
            });
            
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao listar usuário',
                dados: error.mensagem
            });
        }
    },

    async CadastrarUsuario(request, response){
        try {
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Usuário cadastro com sucesso!',
                dados: null
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao cadastrar usuário',
                dados: error.mensagem
            });
        }
    },

    async EditarUsuario(request, response){
        try {
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Usuário editado com sucesso!',
                dados: null
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao editar usuário',
                dados: error.mensagem
            });
        }
    },

    async ApagarUsuario(request, response){
        try {
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Usuário deletado com sucesso!',
                dados: null
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao apagar usuário',
                dados: error.mensagem
            });
        }
    }
}