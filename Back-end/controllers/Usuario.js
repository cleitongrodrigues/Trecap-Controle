const db = require('../database/connection');

module.exports = {
    async ListarUSuario(request, response){
        try {
            console.log("teste");
            const sql = `SELECT usu_id, usu_nome, usu_CPF, tipo_usuario_id, usu_ativo = 1 AS usu_ativo,
            usu_email, usu_telefone, usu_data_cadastro, empresa_id FROM Usuario
            WHERE usu_ativo = 1;`;

            const usuarios = await db.query(sql)
            console.log(usuarios);
            const nItens = usuarios[0].length;
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de Usuários',
                dados: usuarios[0],
                nItens
            });
            
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao listar usuário :(',
                dados: error.message
            });
        }
    },

    async CadastrarUsuario(request, response){
        try {
            const {usu_nome, usu_CPF, tipo_usuario_id, usu_ativo,
                usu_email, usu_telefone, usu_data_cadastro, empresa_id } = request.body;

            const sql = `INSERT INTO Usuario
                (usu_nome, usu_CPF, tipo_usuario_id, usu_ativo,
                usu_email, usu_telefone, usu_data_cadastro, empresa_id) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;

            const values = [usu_nome, usu_CPF, tipo_usuario_id, usu_ativo,
                usu_email, usu_telefone, usu_data_cadastro, empresa_id];

            const execSql = await db.query(sql, values);

            const usu_id = execSql[0].insertId;
            return response.status(200).json({
                sucesso: true,
                mensagem: `Usuário ${usu_id} cadastrado com sucesso!`,
                dados: usu_id
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao cadastrar usuário :(',
                dados: error.message
            });
        }
    },

    async EditarUsuario(request, response){
        try {

            const {usu_nome, usu_CPF, tipo_usuario_id, usu_ativo,
                usu_email, usu_telefone, usu_data_cadastro, empresa_id} = request.body;

            const {usu_id} = request.params;

            const sql = `UPDATE Usuario SET usu_nome = ?, usu_CPF = ?, tipo_usuario_id = ?, usu_ativo = ?,
                usu_email = ?, usu_telefone = ?, usu_data_cadastro = ?, empresa_id = ?
                WHERE usu_id = ?;`;

            const values = [usu_nome, usu_CPF, tipo_usuario_id, usu_ativo,
                usu_email, usu_telefone, usu_data_cadastro, empresa_id, usu_id];

            const atualizaDados = await db.query(sql, values);
            return response.status(200).json({
                sucesso: true,
                mensagem: `Usuário ${usu_id} editado com sucesso!`,
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

    async ApagarUsuario(request, response){
        try {
            const usu_ativo = false;

            const {usu_id} = request.params;

            const sql = `UPDATE Usuario SET usu_ativo = ?
                WHERE usu_id = ?;`;

            const values = [usu_ativo, usu_id];

            const atualizacao = await db.query(sql, values);
            return response.status(200).json({
                sucesso: true,
                mensagem: `Usuário ${usu_id} deletado com sucesso!`,
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