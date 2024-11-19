const db = require('../database/connection');

module.exports = {
    // Função para listar os registros de um evento específico
    async ListarRegistros(request, response) {
        try {
            const { evento_id } = request.params;
            console.log("Evento ID recebido:", evento_id); // Log para verificar o valor de evento_id
    
            const sql = `
                SELECT 
                    r.registros_id, 
                    r.registros_presenca, 
                    r.registros_hora_entrada, 
                    r.registros_hora_saida,
                    e.evento_id, 
                    e.evento_nome, 
                    e.evento_data_inicio,
                    c.colaborador_id,
                    c.colaborador_nome,
                    s.setor_nome
                FROM 
                    Registros r
                JOIN Eventos e ON r.evento_id = e.evento_id
                JOIN Colaboradores c ON r.colaborador_id = c.colaborador_id
                JOIN setores s ON c.setor_id = s.setor_id
                WHERE 
                    r.registros_presenca = 1
                AND
                    e.evento_id = ?;
            `;
            const [result] = await db.query(sql, [evento_id]);
    
            console.log("Resultado da consulta:", result); // Log para verificar o resultado da consulta SQL
    
            return response.status(200).json({ dados: result });
        } catch (error) {
            console.error("Erro ao listar registros:", error);
            return response.status(500).json({ message: "Erro ao listar registros." });
        }
    },

    // Função para cadastrar registros
    async CadastrarRegistros(request, response) {
        try {
            const { registros_presenca, registros_hora_entrada, registros_hora_saida, evento_id, colaborador_id } = request.body;

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

    // Função para editar registros
    async EditarRegistros(request, response) {
        try {
            const { registros_presenca, registros_hora_entrada, registros_hora_saida, evento_id, colaborador_id } = request.body;
            const { registros_id } = request.params;

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

    // Função para apagar registros
    async ApagarRegistros(request, response) {
        try {
            const { registros_id } = request.params;

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
