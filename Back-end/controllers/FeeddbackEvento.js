const db = require('../database/connection');

module.exports = {
    async ListarFeedbackEvento(request, response) {
        try {
            const sql = `SELECT feedback_evento_id, evento_id, 
            colaborador_id, feedback_comentario, feedback_nota
            FROM FeedbackEvento;`;

            const feedbackEvento = await db.query(sql)

            const nItens = feedbackEvento[0].length;
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de Feedbacks',
                dados: feedbackEvento[0],
                nItens
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao listar o Feedback :(',
                dados: error.mensagem
            });
        }
    },

    async CadastrarFeedbackEvento(request, response) {
        try {
            const { evento_id, colaborador_id, feedback_comentario, feedback_nota } = request.body;

            const sql = `INSERT INTO FeedbackEventos
                (evento_id, colaborador_id, feedback_comentario, feedback_nota) 
                VALUES (?, ?, ?, ?);`;

            const values = [evento_id, colaborador_id, feedback_comentario, feedback_nota];

            const execSql = await db.query(sql, values);

            const feedbackEvento_id = execSql[0].insertId;
            return response.status(200).json({
                sucesso: true,
                mensagem: `Feedback ${feedbackEvento_id} cadastrado com sucesso!`,
                dados: feedbackEvento_id
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao cadastrar o Feedback :(',
                dados: error.mensagem
            });
        }
    },

    async EditarFeedbackEvento(request, response) {
        try {
            const { evento_id, colaborador_id, feedback_comentario, feedback_nota } = request.body;

            const { feedback_evento_id } = request.params;

            const sql = `UPDATE FeedbackEventos SET FeedbackEvento_nome = ?, FeedbackEvento_data = ?, FeedbackEvento_local = ?, 
            FeedbackEvento_hora_inicio = ?, FeedbackEvento_hora_termino = ?, FeedbackEvento_capacidade = ?, usu_id = ?
                WHERE FeedbackEvento_id = ?;`;

            const values = [evento_id, colaborador_id, feedback_comentario, feedback_nota, feedback_evento_id];

            const atualizaDados = await db.query(sql, values);
            return response.status(200).json({
                sucesso: true,
                mensagem: `Feedback ${feedback_evento_id} editado com sucesso!`,
                dados: atualizaDados[0].affectedRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao editar Feedback',
                dados: error.mensagem
            });
        }
    },

    async ApagarFeedbackEvento(request, response) {
        try {
            const { feedbackEvento_id } = request.params;

            const sql = `DELETE FROM FeedbackEventos WHERE feedback_evento_id = ?;`;

            const values = [feedbackEvento_id];

            const apagar = await db.query(sql, values);
            return response.status(200).json({
                sucesso: true,
                mensagem: `Feedback ${feedbackEvento_id} deletado com sucesso!`,
                dados: apagar[0].affectedRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao apagar o Feedback :(',
                dados: error.mensagem
            });
        }
    }
}