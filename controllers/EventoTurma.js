const db = require('../database/connection');

module.exports = {
    async ListarEventoTurma(request, response){
        try {
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de EventoTurma',
                dados: null
            });
            
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao listar EventoTurma',
                dados: error.mensagem
            });
        }
    },

    async CadastrarEventoTurma(request, response){
        try {
            return response.status(200).json({
                sucesso: true,
                mensagem: 'EventoTurma cadastro com sucesso!',
                dados: null
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao cadastrar EventoTurma',
                dados: error.mensagem
            });
        }
    },

    async EditarEventoTurma(request, response){
        try {
            return response.status(200).json({
                sucesso: true,
                mensagem: 'EventoTurma editado com sucesso!',
                dados: null
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao editar EventoTurma',
                dados: error.mensagem
            });
        }
    },

    async ApagarEventoTurma(request, response){
        try {
            return response.status(200).json({
                sucesso: true,
                mensagem: 'EventoTurma deletado com sucesso!',
                dados: null
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao apagar EventoTurma',
                dados: error.mensagem
            });
        }
    }
}