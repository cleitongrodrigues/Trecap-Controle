const db = require('../database/connection');

module.exports = {
    async ListarEvento(request, response){
        try {
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Listar de evento',
                dados: null
            });
            
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao listar evento',
                dados: error.mensagem
            });
        }
    },

    async CadastrarEvento(request, response){
        try {
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Evento cadastro com sucesso!',
                dados: null
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao cadastrar evento',
                dados: error.mensagem
            });
        }
    },

    async EditarEvento(request, response){
        try {
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Evento editado com sucesso!',
                dados: null
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao editar evento',
                dados: error.mensagem
            });
        }
    },

    async ApagarEvento(request, response){
        try {
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Evento deletado com sucesso!',
                dados: null
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao apagar evento',
                dados: error.mensagem
            });
        }
    }
}