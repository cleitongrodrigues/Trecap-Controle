const db = require('../database/connection');

module.exports = {
    async ListarTurmaColaboradores(request, response) {
        try {
            const sql = `   SELECT turma_colaboradores_id, turma_id, colaborador_id, 
            turma_colaboradores_comparecimento = 1 AS turma_colaboradores_comparecimento, turma_colaboradores_assinatura, turma_colaboradores_justificativa, 
            turma_colaboradores_avaliacao, turma_colaboradores_hora_entrada, turma_colaboradores_hora_saida, usu_id
            FROM TurmaColaboradores where turma_colaboradores_comparecimento = 1;`;



            const TurmaColaboradores = await db.query(sql)

            const nItens = TurmaColaboradores[0].length;
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista da turma de colaboradores',
                dados: TurmaColaboradores[0],
                nItens
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao listar turma de colaboradores :(',
                dados: error.mensagem
            });
        }
    },

    async CadastrarTurmaColaboradores(request, response) {
        try {
            const { turma_id, colaborador_id, 
                turma_colaboradores_comparecimento, turma_colaboradores_assinatura, turma_colaboradores_justificativa, 
                turma_colaboradores_avaliacao, turma_colaboradores_hora_entrada, turma_colaboradores_hora_saida, usu_id } = request.body;

            const sql = `INSERT INTO TurmaColaboradores
                (turma_id, colaborador_id, 
            turma_colaboradores_comparecimento, turma_colaboradores_assinatura, turma_colaboradores_justificativa, 
            turma_colaboradores_avaliacao, turma_colaboradores_hora_entrada, turma_colaboradores_hora_saida, usu_id) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`;

            const values = [turma_id, colaborador_id, 
                turma_colaboradores_comparecimento, turma_colaboradores_assinatura, turma_colaboradores_justificativa, 
                turma_colaboradores_avaliacao, turma_colaboradores_hora_entrada, turma_colaboradores_hora_saida, usu_id];

            const execSql = await db.query(sql, values);

            const turma_colaboradores_id = execSql[0].insertId;
            return response.status(200).json({
                sucesso: true,
                mensagem: `Turma de colaboradores ${turma_colaboradores_id} cadastrado com sucesso!`,
                dados: turma_colaboradores_id
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao cadastrar turma de colaboradores :(',
                dados: error.mensagem
            });
        }
    },

    async EditarTurmaColaboradores(request, response) {
        try {
            const { turma_id, colaborador_id, 
                turma_colaboradores_comparecimento, turma_colaboradores_assinatura, turma_colaboradores_justificativa, 
                turma_colaboradores_avaliacao, turma_colaboradores_hora_entrada, turma_colaboradores_hora_saida, usu_id } = request.body;

            const { turma_colaboradores_id } = request.params;

            const sql = `UPDATE TurmaColaboradores SET turma_id = ?, colaborador_id = ?, 
            turma_colaboradores_comparecimento = ?, turma_colaboradores_assinatura = ?, turma_colaboradores_justificativa = ?, 
            turma_colaboradores_avaliacao = ?, turma_colaboradores_hora_entrada = ?, turma_colaboradores_hora_saida = ?, usu_id = ?
                WHERE turma_colaboradores_id = ?;`;

            const values = [turma_id, colaborador_id, 
                turma_colaboradores_comparecimento, turma_colaboradores_assinatura, turma_colaboradores_justificativa, 
                turma_colaboradores_avaliacao, turma_colaboradores_hora_entrada, turma_colaboradores_hora_saida, usu_id, turma_colaboradores_id];

            const atualizaDados = await db.query(sql, values);
            return response.status(200).json({
                sucesso: true,
                mensagem: `Turma de colaboradores ${turma_colaboradores_id} editado com sucesso!`,
                dados: atualizaDados[0].affectedRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao editar turma de colaboradores :(',
                dados: error.mensagem
            });
        }
    },

    async ApagarTurmaColaboradores(request, response) {
        try {
            const { turma_colaboradores_id } = request.params;

            const sql = `DELETE FROM TurmaColaboradores WHERE turma_colaboradores_id = ?;`;

            const values = [turma_colaboradores_id];

            const apagar = await db.query(sql, values);
            return response.status(200).json({
                sucesso: true,
                mensagem: `Turma de colaboradores ${turma_colaboradores_id} deletado com sucesso!`,
                dados: apagar[0].affectedRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao apagar turma de colaboradores :(',
                dados: error.mensagem
            });
        }
    }
}