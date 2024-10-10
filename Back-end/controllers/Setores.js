const db = require('../database/connection');

module.exports = {
    async ListarSetores(request, response){
        try {

            const {empresa_id} = request.params

            const sql = `SELECT setor_nome FROM Setores where empresa_id = ?;`;

            const Setoress = await db.query(sql, empresa_id)

            const nItens = Setoress[0].length;
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de Usuários!',
                dados: Setoress[0],
                nItens
            });
            
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao listar usuário :(',
                dados: error.mensagem
            });
        }
    },

    async CadastrarSetores(request, response){
        try {
            const {setor_nome, empresa_id} = request.body;

            const sql = `INSERT INTO Setores
                (setor_nome, empresa_id) 
                VALUES (?, ?);`;

            const values = [setor_nome, empresa_id];

            const execSql = await db.query(sql, values);

            const setor_id = execSql[0].insertId;
            return response.status(200).json({
                sucesso: true,
                mensagem: `Usuário ${setor_id} cadastrado com sucesso!`,
                dados: setor_id
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao cadastrar usuário :(',
                dados: error.mensagem
            });
        }
    },

    async EditarSetores(request, response){
        try {

            const {setor_nome, empresa_id} = request.body;

            const {setor_id} = request.params;

            const sql = `UPDATE Setores SET setor_nome = ?, empresa_id = ?
                WHERE setor_id = ?;`;

            const values = [setor_nome, empresa_id];

            const atualizaDados = await db.query(sql, values);
            return response.status(200).json({
                sucesso: true,
                mensagem: `Usuário ${setor_id} editado com sucesso!`,
                dados: atualizaDados[0].affectedRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao editar usuário :(',
                dados: error.mensagem
            });
        }
    },

    async ApagarSetores(request, response){
        try {
            const {setor_id} = request.params;

            const sql = `DELETE FROM Setores WHERE setor_id = ?;`;

            const values = [setor_id];

            const atualizacao = await db.query(sql, values);
            return response.status(200).json({
                sucesso: true,
                mensagem: `Usuário ${setor_id} deletado com sucesso!`,
                dados: atualizacao[0].affectedRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao apagar usuário',
                dados: error.mensagem
            });
        }
    }
}