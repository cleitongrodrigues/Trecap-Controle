const db = require('../database/connection');

module.exports = {
    async ListarTurma(request, response){
        try {
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de turmas',
                dados: null
            });
            
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao listar turma',
                dados: error.mensagem
            });
        }
    },

    async CadastrarTurma(request, response){
        try {
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Turma cadastrada com sucesso!',
                dados: null
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao cadastrar turma',
                dados: error.mensagem
            });
        }
    },

    async EditarTurma(request, response){
        try {
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Turma editada com sucesso!',
                dados: null
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao editar turma',
                dados: error.mensagem
            });
        }
    },

    async ApagarTurma(request, response){
        try {
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Turma deletada com sucesso!',
                dados: null
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao apagar turma',
                dados: error.mensagem
            });
        }
    }
}