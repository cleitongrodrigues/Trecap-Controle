const db = require('../database/connection');

module.exports = {
    async ListarColaboradores(request, response) {
        try {

            const pagina = parseInt(request.query.pagina) || 1;
            const itensPorPagina = parseInt(request.query.itensPorPagina) || 10;

            // Calcular offset
            const offset = (pagina - 1) * itensPorPagina;

            const sql = `SELECT colaborador_id, colaborador_nome, colaborador_CPF, colaborador_biometria, 
            colaborador_ativo = 1 AS colaborador_ativo , colaborador_telefone, colaborador_email, empresa_id, setor_id
            FROM Colaboradores 
            WHERE colaborador_ativo = 1
            LIMIT ? OFFSET ?;`;

            const colaboradores = await db.query(sql, [itensPorPagina, offset]);
            const listaColaboradores = colaboradores[0] || [];

            // Contar o total de colaboradores para calcular as páginas
            const totalColaboradoresSql = `SELECT COUNT(*) as total FROM Colaboradores WHERE colaborador_ativo = 1`;
            const totalColaboradoresResult = await db.query(totalColaboradoresSql);
            const totalColaboradores = totalColaboradoresResult[0][0].total;
            const totalPaginas = Math.ceil(totalColaboradores / itensPorPagina); // Calcular o total de páginas

            const nItens = colaboradores[0].length;
            return response.status(200).json({
                sucesso: true,
                mensagem: `Lista de colaboradores`,
                dados: colaboradores[0],
                totalColaboradores,
                totalPaginas,
                paginaAtual: pagina,
                nItens: listaColaboradores.length
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
                mensagem: `Colaborador ${colaborador_id} cadastro com sucesso!`,
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
            const colaborador_ativo = false;

            const { colaborador_id } = request.params;

            const sql = `UPDATE Colaboradores SET colaborador_ativo = ?
                WHERE colaborador_id = ?;`;

            const values = [colaborador_ativo, colaborador_id];

            const atualizacao = await db.query(sql, values);
            return response.status(200).json({
                sucesso: true,
                mensagem: `colaborador ${colaborador_id} deletado com sucesso!`,
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