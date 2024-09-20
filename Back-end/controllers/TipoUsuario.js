const db = require('../database/connection');

module.exports = {
    async ListarTipoUSuario(request, response){
        try {
            const sql = `SELECT tipo_usuario_id, tipo_usuario_descricao, 
            FROM TipoUsuario`;

        const usuarios = await db.query(sql)

        const nItens = usuarios[0].length;
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de Tipos de usuários',
                dados: usuarios[0],
                nItens
            });
            
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao listar TipoUsuário',
                dados: error.mensagem
            });
        }
    },

    async CadastrarTipoUsuario(request, response){
        try {
            const {tipo_usuario_descricao} = request.body;

            const sql = `INSERT INTO TipoUsuario
                (tipo_usuario_descricao) 
                VALUES (?);`;

            const values = [tipo_usuario_descricao];

            const execSql = await db.query(sql, values);

            const tipo_usuario_id = execSql[0].insertId;
            return response.status(200).json({
                sucesso: true,
                mensagem: `Tipo de usuário ${tipo_usuario_id} cadastrado com sucesso!`,
                dados: tipo_usuario_id
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao cadastrar TipoUsuário',
                dados: error.mensagem
            });
        }
    },

    async EditarTipoUsuario(request, response){
        try {
            const {tipo_usuario_descricao} = request.body;

            const {tipo_usuario_id} = request.params;

            const sql = `UPDATE TipoUsuario SET tipo_usuario_descricao = ?
                WHERE tipo_usuario_id = ?;`;

            const values = [tipo_usuario_descricao, tipo_usuario_id];

            const atualizaDados = await db.query(sql, values);
            return response.status(200).json({
                sucesso: true,
                mensagem: `Tipo de usuário ${tipo_usuario_id} editado com sucesso!`,
                dados: atualizaDados.affectedRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao editar TipoUsuário',
                dados: error.mensagem
            });
        }
    },

    async ApagarTipoUsuario(request, response){
        try {
            const {tipo_usuario_id} = request.params;

            const sql = `DELETE FROM TipoUsuario
            WHERE tipo_usuario_id = ?`;

            const values = [tipo_usuario_id];

            const atualizacao = await db.query(sql, values);
            return response.status(200).json({
                sucesso: true,
                mensagem: `Tipo de usuário ${tipo_usuario_id} deletado com sucesso!`,
                dados: atualizacao[0].affectedRows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao apagar TipoUsuário',
                dados: error.mensagem
            });
        }
    }
}