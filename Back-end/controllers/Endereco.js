const db = require('../database/connection');

module.exports = {
    async ListarEndereco(request, response) {
        try {
            const sql = `SELECT endereco_id, endereco_logradouro, endereco_numero, endereco_complemento, 
            endereco_bairro, endereco_cidade, endereco_estado, endereco_cep, entidade_id
            FROM Endereco;`;

            const Endereco = await db.query(sql)

            const nItens = Endereco[0].length;
            return response.status(200).json({
                sucesso: true,
                mensagem: `Lista de Endereços!`,
                dados: Endereco[0],
                nItens
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao listar endereços :(',
                dados: error.mensagem
            });
        }
    },

    async CadastrarEndereco(request, response) {
        try {
            const { endereco_logradouro, endereco_numero, endereco_complemento, 
                endereco_bairro, endereco_cidade, endereco_estado, endereco_cep, entidade_id } = request.body;

            const sql = `INSERT INTO Endereco
                (endereco_logradouro, endereco_numero, endereco_complemento, 
            endereco_bairro, endereco_cidade, endereco_estado, endereco_cep, entidade_id) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`;

            const values = [endereco_logradouro, endereco_numero, endereco_complemento, 
                endereco_bairro, endereco_cidade, endereco_estado, endereco_cep, entidade_id];

            const execSql = await db.query(sql, values);

            const Endereco_id = execSql[0].insertId;
            return response.status(200).json({
                sucesso: true,
                mensagem: `Endereco ${Endereco_id} cadastrado com sucesso!`,
                dados: Endereco_id
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao cadastrar endereco :(',
                dados: error.mensagem
            });
        }
    },

    async EditarEndereco(request, response) {
        try {
            const { endereco_logradouro, endereco_numero, endereco_complemento, 
                endereco_bairro, endereco_cidade, endereco_estado, endereco_cep, entidade_id } = request.body;

            const { endereco_id } = request.params;

            const sql = `UPDATE Endereco SET endereco_logradouro = ?, endereco_numero = ?, endereco_complemento = ?, 
            endereco_bairro = ?, endereco_cidade = ?, endereco_estado = ?, endereco_cep = ?,  ?, entidade_id = ?
                WHERE Endereco_id = ?;`;

            const values = [endereco_logradouro, endereco_numero, endereco_complemento, 
                endereco_bairro, endereco_cidade, endereco_estado, endereco_cep, entidade_id, endereco_id];

            const atualizaDados = await db.query(sql, values);
            return response.status(200).json({
                sucesso: true,
                mensagem: `Endereco ${endereco_id} editadado com sucesso!`,
                dados: atualizaDados[0].affectedRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao editar endereco :(',
                dados: error.mensagem
            });
        }
    },

    async ApagarEndereco(request, response) {
        try {

            const { endereco_id } = request.params;

            const sql = `DELETE FROM Endereco
                WHERE Endereco_id = ?;`;

            const values = [endereco_id];

            const atualizacao = await db.query(sql, values);
            return response.status(200).json({
                sucesso: true,
                mensagem: `Endereco ${endereco_id} deletadado com sucesso!`,
                dados: atualizacao[0].affectedRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao apagar endereco :(',
                dados: error.mensagem
            });
        }
    }
}