const db = require('../database/connection');

module.exports = {
    async ListarEventoTurma(request, response){
        try {
            const sql = `SELECT evento_turma_id, evento_id, turma_id FROM EventoTurma;`;

            const EventoTurma = await db.query(sql)

            const nItens = EventoTurma[0].length;
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de Evento Turma',
                dados: EventoTurma[0],
                nItens
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
            const {evento_id, turma_id} = request.body;

            const sql = `INSERT INTO EventoTurma
                (evento_id, turma_id) 
                VALUES (?, ?);`;

            const values = [evento_id, turma_id];

            const execSql = await db.query(sql, values);

            const evento_turma_id = execSql[0].insertId;
            return response.status(200).json({
                sucesso: true,
                mensagem: `Evento Turma ${evento_turma_id} cadastro com sucesso!`,
                dados: evento_turma_id
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao cadastrar Evento Turma',
                dados: error.mensagem
            });
        }
    },

    async EditarEventoTurma(request, response){
        try {
            const {evento_id, turma_id} = request.body;

            const {evento_turma_id} = request.params;

            const sql = `UPDATE EventoTurma SET evento_id = ?, turma_id = ?
                WHERE evento_turma_id = ?;`;

            const values = [evento_id, turma_id, evento_turma_id];

            const atualizaDados = await db.query(sql, values);
            return response.status(200).json({
                sucesso: true,
                mensagem: `Evento Turma ${evento_turma_id} editado com sucesso!`,
                dados: atualizaDados[0].affectedRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao editar Evento Turma',
                dados: error.mensagem
            });
        }
    },

    async ApagarEventoTurma(request, response){
        try {
            const {evento_turma_id} = request.params;

            const sql = `DELETE FROM EventoTurma WHERE evento_turma_id = ?;`;

            const values = [evento_turma_id];

            const apagar = await db.query(sql, values);
            return response.status(200).json({
                sucesso: true,
                mensagem: `Evento Turma ${evento_turma_id} deletado com sucesso!`,
                dados: apagar[0].affectedRows
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