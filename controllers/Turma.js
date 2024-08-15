const db = require('../database/connection');

module.exports = {
    async ListarTurma(request, response){
        try {
            const sql = `SELECT turma_id, turma_descricao FROM Turma;`;

            const turma = await db.query(sql)

            const nItens = turma[0].length;
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de turmas',
                dados: turma[0],
                nItens
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
            const {turma_descricao} = request.body;

            const sql = `INSERT INTO Turma
                (turma_descricao) 
                VALUES (?);`;

            const values = [turma_descricao];

            const execSql = await db.query(sql, values);

            const turma_id = execSql[0].insertId;
            return response.status(200).json({
                sucesso: true,
                mensagem: `Turma ${turma_id} cadastrada com sucesso!`,
                dados: turma_id
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
            const {turma_descricao} = request.body;

            const {turma_id} = request.params;

            const sql = `UPDATE Turma SET turma_descricao = ?
                WHERE turma_id = ?;`;

            const values = [turma_descricao, turma_id];

            const atualizaDados = await db.query(sql, values);
            return response.status(200).json({
                sucesso: true,
                mensagem: `Turma ${turma_id} editada com sucesso!`,
                dados: atualizaDados[0].affectedRows
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
            const {turma_id} = request.params;

            const sql = `DELETE FROM Turma WHERE turma_id = ?;`;

            const values = [turma_id];

            const apagar = await db.query(sql, values);
            return response.status(200).json({
                sucesso: true,
                mensagem: `Turma ${turma_id} deletada com sucesso!`,
                dados: apagar[0].affectedRows
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