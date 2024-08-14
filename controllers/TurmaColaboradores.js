const db = require('../database/connection');

module.exports = {
    async ListarTurmaColaboradores(request, response){
        try {
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de turmaColaboradores',
                dados: null
            });
            
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao listar turmaColaboradores',
                dados: error.mensagem
            });
        }
    },

    async CadastrarTurmaColaboradores(request, response){
        try {
            return response.status(200).json({
                sucesso: true,
                mensagem: 'TurmaColaboradores cadastro com sucesso!',
                dados: null
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao cadastrar turmaColaboradores',
                dados: error.mensagem
            });
        }
    },

    async EditarTurmaColaboradores(request, response){
        try {
            return response.status(200).json({
                sucesso: true,
                mensagem: 'TurmaColaboradores editado com sucesso!',
                dados: null
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao editar turmaColaboradores',
                dados: error.mensagem
            });
        }
    },

    async ApagarTurmaColaboradores(request, response){
        try {
            return response.status(200).json({
                sucesso: true,
                mensagem: 'TurmaColaboradores deletado com sucesso!',
                dados: null
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao apagar turmaColaboradores',
                dados: error.mensagem
            });
        }
    }
}