const db = require('../database/connection');

module.exports = {
    async ListarRegistros(request, response) {
        try {
            const sql = `
                SELECT 
                    r.registros_id, 
                    r.registros_presenca, 
                    r.registros_hora_entrada, 
                    r.registros_hora_saida,
                    e.evento_id, 
                    e.evento_nome, 
                    e.evento_data_inicio,
                    c.colaborador_nome
                FROM 
                    Registros r
                JOIN Eventos e ON r.evento_id = e.evento_id
                JOIN Colaboradores c ON r.colaborador_id = c.colaborador_id
                WHERE 
                    r.registros_presenca = 1
                AND
                    e.evento_id = 1;
            `;
        
            const registros = await db.query(sql);
        
            const nItens = registros[0].length;
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de Registros com informações de evento e colaborador!',
                dados: registros[0],
                nItens
            });
        
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao listar registros :(',
                dados: error.message
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
            console.log(error)
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao cadastrar usuário :(',
                dados: error.message
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
                dados: error.message
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
                dados: error.message
            });
        }
    }
}