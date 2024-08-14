const db = require('../database/connection');

module.exports = {
    async ListarColaboradores(request, response){
        try {
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Listar de colaboradores',
                dados: null
            });
            
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao listar colaborador',
                dados: error.mensagem
            });
        }
    },

    async CadastrarColaboradores(request, response){
        try {
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Colaborador cadastro com sucesso!',
                dados: null
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao cadastrar colaborador',
                dados: error.mensagem
            });
        }
    },

    async EditarColaboradores(request, response){
        try {
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Colaborador editado com sucesso!',
                dados: null
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao editar colaborador',
                dados: error.mensagem
            });
        }
    },

    async ApagarColaboradores(request, response){
        try {
            return response.status(200).json({
                sucesso: true,
                mensagem: 'colaborador deletado com sucesso!',
                dados: null
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao apagar colaborador',
                dados: error.mensagem
            });
        }
    }
}