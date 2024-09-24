const db = require('../database/connection');

module.exports = {
    async ListarEmpresa(request, response) {
        try {
            const sql = `SELECT empresa_id, empresa_nome, empresa_CNPJ, empresa_telefone, 
            empresa_email, empresa_ativo = 1 AS empresa_ativo, usu_id FROM Empresa WHERE empresa_ativo = 1`;

            const empresa = await db.query(sql)

            const nItens = empresa[0].length;
            return response.status(200).json({
                sucesso: true,
                mensagem: `Lista de Empresas!`,
                dados: empresa[0],
                nItens
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao listar empresas :(',
                dados: error.message
            });
        }
    },

    async CadastrarEmpresa(request, response) {
        try {
            const { empresa_nome, empresa_CNPJ, empresa_telefone,
                empresa_email, empresa_ativo, usu_id } = request.body;

            const sql = `INSERT INTO Empresa
                (empresa_nome, empresa_CNPJ, empresa_telefone, 
            empresa_email, empresa_ativo, usu_id) 
                VALUES (?, ?, ?, ?, ?, ?);`;

            const values = [empresa_nome, empresa_CNPJ, empresa_telefone,
                empresa_email, empresa_ativo, usu_id];

            const execSql = await db.query(sql, values);

            const empresa_id = execSql[0].insertId;
            return response.status(200).json({
                sucesso: true,
                mensagem: `Empresa ${empresa_id} cadastrada com sucesso!`,
                dados: empresa_id
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao cadastrar empresa :(',
                dados: error.message
            });
        }
    },

    async EditarEmpresa(request, response) {
        try {
            const { empresa_nome, empresa_CNPJ, empresa_telefone,
                empresa_email, empresa_ativo, usu_id } = request.body;

            const { empresa_id } = request.params;

            const sql = `UPDATE Empresa SET empresa_nome = ?, empresa_CNPJ = ?, empresa_telefone = ?, 
                empresa_email = ?, empresa_ativo = ?, usu_id = ?
                WHERE empresa_id = ?;`;

            const values = [empresa_nome, empresa_CNPJ, empresa_telefone,
                empresa_email, empresa_ativo, usu_id, empresa_id];

            const atualizaDados = await db.query(sql, values);
            return response.status(200).json({
                sucesso: true,
                mensagem: `empresa ${empresa_id} editadada com sucesso!`,
                dados: atualizaDados[0].affectedRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao editar empresa :(',
                dados: error.message
            });
        }
    },

    async ApagarEmpresa(request, response) {
        try {
            const empresa_ativo = false;

            const { empresa_id } = request.params;

            const sql = `UPDATE Empresa SET empresa_ativo = ?
                WHERE empresa_id = ?;`;

            const values = [empresa_ativo, empresa_id];

            const atualizacao = await db.query(sql, values);
            return response.status(200).json({
                sucesso: true,
                mensagem: `empresa ${empresa_id} deletadada com sucesso!`,
                dados: atualizacao[0].affectedRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao apagar empresa :(',
                dados: error.message
            });
        }
    }
}