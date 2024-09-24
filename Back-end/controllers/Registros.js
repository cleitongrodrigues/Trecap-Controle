const db = require('../database/connection');

module.exports = {
    async ListarRegistros(request, response){
        try {
            const sql = `SELECT registros_id, registros_presenca, registros_hora_entrada, registros_hora_saida, evento_id, colaborador_id FROM Registros;`;

            const registros = await db.query(sql)

            const nItens = registros[0].length;
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de Usuários!',
                dados: registros[0],
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

    async CadastrarRegistros(request, response){
        try {
            const {registros_presenca, registros_hora_entrada, registros_hora_saida, evento_id, colaborador_id} = request.body;

            const sql = `INSERT INTO Registros
                (registros_presenca, registros_hora_entrada, registros_hora_saida, evento_id, colaborador_id) 
                VALUES (?, ?, ?, ?, ?);`;

            const values = [registros_presenca, registros_hora_entrada, registros_hora_saida, evento_id, colaborador_id];

            const execSql = await db.query(sql, values);

            const registros_id = execSql[0].insertId;
            return response.status(200).json({
                sucesso: true,
                mensagem: `Usuário ${registros_id} cadastrado com sucesso!`,
                dados: registros_id
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao cadastrar usuário :(',
                dados: error.mensagem
            });
        }
    },

    async EditarRegistros(request, response){
        try {

            const {registros_presenca, registros_hora_entrada, registros_hora_saida, evento_id, colaborador_id} = request.body;

            const {registros_id} = request.params;

            const sql = `UPDATE Registros SET registros_presenca = ?, registros_hora_entrada = ?, 
                registros_hora_saida = ?, evento_id = ?, colaborador_id = ?
                WHERE registros_id = ?;`;

            const values = [registros_presenca, registros_hora_entrada, registros_hora_saida, evento_id, colaborador_id, registros_id];

            const atualizaDados = await db.query(sql, values);
            return response.status(200).json({
                sucesso: true,
                mensagem: `Usuário ${registros_id} editado com sucesso!`,
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

    async ApagarRegistros(request, response){
        try {
            const {registros_id} = request.params;

            const sql = `DELETE FROM Registros WHERE registros_id = ?;`;

            const values = [registros_id];

            const atualizacao = await db.query(sql, values);
            return response.status(200).json({
                sucesso: true,
                mensagem: `Registro ${registros_id} deletado com sucesso!`,
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