const db = require('../database/connection');

module.exports = {
    async ListarColaboradores(request, response) {
        try {
            const sql = `SELECT colaborador_id, colaborador_nome, colaborador_CPF, colaborador_biometria, 
            colaborador_ativo = 1 AS colaborador_ativo , colaborador_telefone, colaborador_email, empresa_id, setor_id 
            FROM Colaboradores WHERE colaborador_ativo = 1`;

            const colaboradores = await db.query(sql);

            const nItens = colaboradores[0].length;
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de colaboradores',
                dados: colaboradores[0],
                nItens
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao listar colaborador',
                dados: error.message
            });
        }
    },


    async CadastrarColaboradores(request, response) {
        try {
            const { colaborador_nome, colaborador_CPF, colaborador_biometria, colaborador_ativo, 
                colaborador_telefone, colaborador_email, empresa_id, setor_id } = request.body;

            const sql = `INSERT INTO Colaboradores
                (colaborador_nome, colaborador_CPF, colaborador_biometria, colaborador_ativo, 
                colaborador_telefone, colaborador_email, empresa_id, setor_id) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;

            const values = [colaborador_nome, colaborador_CPF, colaborador_biometria, colaborador_ativo,
                 colaborador_telefone, colaborador_email, empresa_id, setor_id];

            const execSql = await db.query(sql, values);

            const colaborador_id = execSql[0].insertId;
            return response.status(200).json({
                sucesso: true,
                mensagem: `Colaborador ${colaborador_id} cadastrado com sucesso!`,
                dados: colaborador_id
            });
        } catch (error) {
            console.log(error.message)
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao cadastrar colaborador',
                dados: error.message
            });
        }
    },

    async EditarColaboradores(request, response) {
        try {
            const { colaborador_nome, colaborador_CPF, colaborador_biometria, colaborador_ativo,
                 colaborador_telefone, colaborador_email, empresa_id, setor_id } = request.body;

            const { colaborador_id } = request.params;

            const sql = `UPDATE Colaboradores SET colaborador_nome = ?, colaborador_CPF = ?, colaborador_biometria = ?, 
                colaborador_ativo = ?, colaborador_telefone = ?, colaborador_email = ?, empresa_id = ?, setor_id = ?
                WHERE colaborador_id = ?;`;

            const values = [colaborador_nome, colaborador_CPF, colaborador_biometria, colaborador_ativo, 
                colaborador_telefone, colaborador_email, empresa_id, setor_id, colaborador_id];

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
                dados: error.message
            });
        }
    },

    async ApagarColaboradores(request, response) {
        try {
            const colaborador_ativo = 0; // Para marcar como inativo

            const { colaborador_id } = request.params;

            const sql = `UPDATE Colaboradores SET colaborador_ativo = ?
                WHERE colaborador_id = ?;`;

            const values = [colaborador_ativo, colaborador_id];

            const atualizacao = await db.query(sql, values);
            return response.status(200).json({
                sucesso: true,
                mensagem: `Colaborador ${colaborador_id} desativado com sucesso!`,
                dados: atualizacao[0].affectedRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao apagar colaborador',
                dados: error.message
            });
        }
    }
}    