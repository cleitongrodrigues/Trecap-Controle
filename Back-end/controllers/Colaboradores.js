const db = require('../database/connection');

module.exports = {
    async ListarColaboradores(request, response) {
        try {
            const sql = `SELECT colaborador_id, colaborador_nome, colaborador_CPF, 
            colaborador_endereco, colaborador_biometria, colaborador_ativo = 1 AS colaborador_ativo, 
            colaborador_telefone, colaborador_email, colaborador_historico_treinamento
            FROM Colaboradores
            WHERE colaborador_ativo = 1`;

            const colaboradores = await db.query(sql)

            const nItens = colaboradores[0].length;
            return response.status(200).json({
                sucesso: true,
                mensagem: `Lista de colaboradores`,
                dados: colaboradores[0],
                nItens
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao listar colaborador',
                dados: error.mensagem
            });
        }
    },

    async CadastrarColaboradores(request, response) {
        try {
            const { colaborador_nome, colaborador_CPF,
                colaborador_endereco, colaborador_biometria, colaborador_ativo,
                colaborador_telefone, colaborador_email, colaborador_historico_treinamento } = request.body;

            const sql = `INSERT INTO Colaboradores
                (colaborador_nome, colaborador_CPF, 
            colaborador_endereco, colaborador_biometria, colaborador_ativo, 
            colaborador_telefone, colaborador_email, colaborador_historico_treinamento) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;

            const values = [colaborador_nome, colaborador_CPF,
                colaborador_endereco, colaborador_biometria, colaborador_ativo,
                colaborador_telefone, colaborador_email, colaborador_historico_treinamento];

            const execSql = await db.query(sql, values);

            const colaborador_id = execSql[0].insertId;
            return response.status(200).json({
                sucesso: true,
                mensagem: `Colaborador ${colaborador_id} cadastro com sucesso!`,
                dados: colaborador_id
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao cadastrar colaborador',
                dados: error.mensagem
            });
        }
    },

    async EditarColaboradores(request, response) {
        try {
            const { colaborador_nome, colaborador_CPF,
                colaborador_endereco, colaborador_biometria, colaborador_ativo,
                colaborador_telefone, colaborador_email, colaborador_historico_treinamento } = request.body;

            const { colaborador_id } = request.params;

            const sql = `UPDATE Colaboradores SET colaborador_nome = ?, colaborador_CPF = ?,
                colaborador_endereco = ?, colaborador_biometria = ?, colaborador_ativo = ?,
                colaborador_telefone = ?, colaborador_email = ?, colaborador_historico_treinamento = ?
                WHERE colaborador_id = ?;`;

            const values = [colaborador_nome, colaborador_CPF,
                colaborador_endereco, colaborador_biometria, colaborador_ativo,
                colaborador_telefone, colaborador_email, colaborador_historico_treinamento, colaborador_id];

            const atualizaDados = await db.query(sql, values);
            return response.status(200).json({
                sucesso: true,
                mensagem: `Colaborador ${colaborador_id} editado com sucesso!`,
                dados: atualizaDados[0].affectedRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao editar colaborador',
                dados: error.mensagem
            });
        }
    },

    async ApagarColaboradores(request, response) {
        try {
            const colaborador_ativo = false;

            const { colaborador_id } = request.params;

            const sql = `UPDATE Colaboradores SET colaborador_ativo = ?
                WHERE colaborador_id = ?;`;

            const values = [colaborador_ativo, colaborador_id];

            const atualizacao = await db.query(sql, values);
            return response.status(200).json({
                sucesso: true,
                mensagem: `colaborador ${colaborador_id} deletado com sucesso!`,
                dados: atualizacao[0].affectedRows
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