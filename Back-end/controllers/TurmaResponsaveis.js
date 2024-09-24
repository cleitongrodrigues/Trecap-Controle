const db = require('../database/connection');

module.exports = {
    async ListarTurmaResponsaveis(request, response) {
        try {
            const sql = `SELECT turma_responsavel_id, turma_responsavel_docente,
            turma_id, usu_id, turma_responsavel_status 
            FROM TurmaResponsaveis;`;

            const turmaResponsaveis = await db.query(sql)

            const nItens = turmaResponsaveis[0].length;
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de responsáveis pelas turmas!',
                dados: turmaResponsaveis[0],
                nItens
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao listar responsáveis :(',
                dados: error.mensagem
            });
        }
    },

    async CadastrarTurmaResponsaveis(request, response) {
        try {
            const { turma_responsavel_docente,
            turma_id, usu_id, turma_responsavel_status  } = request.body;

            const sql = `INSERT INTO TurmaResponsaveis
                (turma_responsavel_docente, turma_id, usu_id, 
                turma_responsavel_status , turma_responsavel_status ) 
                VALUES (?, ?, ?, ?, ?);`;

            const values = [turma_responsavel_docente,
            turma_id, usu_id, turma_responsavel_status ];

            const execSql = await db.query(sql, values);

            const turmaResponsaveis = execSql[0].insertId;
            return response.status(200).json({
                sucesso: true,
                mensagem: `Responsável ${turmaResponsaveis} cadastrado com sucesso!`,
                dados: turmaResponsaveis
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao cadastrar responsável :(',
                dados: error.mensagem
            });
        }
    },

    async EditarTurmaResponsaveis(request, response) {
        try {
            const {  turma_responsavel_docente,turma_id, usu_id, turma_responsavel_status  } = request.body;

            const { turma_responsavel_id } = request.params;

            const sql = `UPDATE TurmaResponsaveis SET  turma_responsavel_docente = ?,
                turma_id = ?, usu_id = ?, turma_responsavel_status = ?
                WHERE turma_responsavel_id = ?;`;

            const values = [ turma_responsavel_docente, turma_id, usu_id, turma_responsavel_status , turma_responsavel_id];

            const atualizaDados = await db.query(sql, values);
            return response.status(200).json({
                sucesso: true,
                mensagem: `Responsável ${turma_responsavel_id} editado com sucesso!`,
                dados: atualizaDados[0].affectedRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao editar responsável :(',
                dados: error.mensagem
            });
        }
    },

    async ApagarTurmaResponsaveis(request, response) {
        try {
            const turma_responsavel_status = false;

            const { turma_responsavel_id } = request.params;

            const sql = `UPDATE Colaboradores SET turma_responsavel_status = ?
                WHERE turma_responsavel_id = ?;`;

            const values = [turma_responsavel_status, turma_responsavel_id];

            const apagar = await db.query(sql, values);
            return response.status(200).json({
                sucesso: true,
                mensagem: `Responsável ${turma_responsavel_id} deletado com sucesso!`,
                dados: apagar[0].affectedRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao apagar responsável :(',
                dados: error.mensagem
            });
        }
    }
}