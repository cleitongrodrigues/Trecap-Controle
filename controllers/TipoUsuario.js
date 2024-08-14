const db = require('../database/connection');

module.exports = {
    async ListarTipoUSuario(request, response){
        try {
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de TipoUsuário',
                dados: null
            });
            
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao listar TipoUsuário',
                dados: error.mensagem
            });
        }
    },

    async CadastrarTipoUsuario(request, response){
        try {
            return response.status(200).json({
                sucesso: true,
                mensagem: 'TipoUsuário cadastro com sucesso!',
                dados: null
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao cadastrar TipoUsuário',
                dados: error.mensagem
            });
        }
    },

    async EditarTipoUsuario(request, response){
        try {
            return response.status(200).json({
                sucesso: true,
                mensagem: 'TipoUsuário editado com sucesso!',
                dados: null
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao editar TipoUsuário',
                dados: error.mensagem
            });
        }
    },

    async ApagarTipoUsuario(request, response){
        try {
            return response.status(200).json({
                sucesso: true,
                mensagem: 'TipoUsuário deletado com sucesso!',
                dados: null
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao apagar TipoUsuário',
                dados: error.mensagem
            });
        }
    }
}