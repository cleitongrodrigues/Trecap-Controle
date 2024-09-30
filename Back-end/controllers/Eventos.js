const db = require('../database/connection');

module.exports = {
    async ListarEvento(request, response){
        try {
            const sql = ` SELECT evento_id, evento_nome, evento_data_inicio, 
            evento_data_termino, evento_local, evento_status = 1 AS evento_status, usu_id, evento_professor FROM Eventos
            WHERE evento_status = 1`;

            const evento = await db.query(sql)

            const nItens = evento[0].length;
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Listar de evento',
                dados: evento[0],
                nItens
            });
            
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao listar evento :(',
                dados: error.message
            });
        }
    },

    async CadastrarEvento(request, response){
        try {
            const {evento_nome, evento_data_inicio, evento_data_termino, evento_local, evento_status, usu_id, evento_professor} = request.body;

            const sql = `INSERT INTO Eventos
                (evento_nome, evento_data_inicio, evento_data_termino, 
                evento_local, evento_status, usu_id, evento_professor) 
                VALUES (?, ?, ?, ?, ?, ?, ?);`;

            const values = [evento_nome, evento_data_inicio, evento_data_termino, evento_local, evento_status, usu_id, evento_professor];

            const execSql = await db.query(sql, values);

            const evento_id = execSql[0].insertId;
            return response.status(200).json({
                sucesso: true,
                mensagem: `Evento ${evento_id} cadastro com sucesso!`,
                dados: evento_id
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao cadastrar evento :(',
                dados: error.message
            });
        }
    },

    async EditarEvento(request, response){
        try {
            const {evento_nome, evento_data_inicio, evento_data_termino, evento_local,
                 evento_status, usu_id, evento_professor} = request.body;

            const {evento_id} = request.params;

            const sql = `UPDATE Eventos SET evento_nome = ?, evento_data_inicio = ?, evento_data_termino = ?,
                evento_local = ?, evento_status = ?, usu_id = ?, evento_professor = ?
                WHERE evento_id = ?;`;

            const values = [evento_nome, evento_data_inicio, evento_data_termino, evento_local,
                 evento_status, usu_id, evento_professor, evento_id];

            const atualizaDados = await db.query(sql, values);
            return response.status(200).json({
                sucesso: true,
                mensagem: `Evento ${evento_id} editado com sucesso!`,
                dados: atualizaDados[0].affectedRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao editar evento',
                dados: error.message
            });
        }
    },

    async ApagarEvento(request, response){
        try {
            const {evento_id} = request.params;

            const sql = `DELETE FROM Eventos WHERE evento_id = ?;`;

            const values = [evento_id];

            const apagar = await db.query(sql, values);
            return response.status(200).json({
                sucesso: true,
                mensagem: `Evento ${evento_id} deletado com sucesso!`,
                dados: apagar[0].affectedRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao apagar evento :(',
                dados: error.message
            });
        }
    }
}