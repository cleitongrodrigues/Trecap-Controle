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
                mensagem: 'Erro na requisição',
                dados: error.mensagem
            });
        }
    }
}