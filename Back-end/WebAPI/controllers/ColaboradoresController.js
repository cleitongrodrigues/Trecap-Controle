import ColaboradorService from "../../Application/Services/Colaborador/ColaboradorService.js";
import connection from "../../Infrastructure/database/connection.js";


export const ColaboradorController = {
    async ListarColaboradores(request, response, next) {
        try {
            const { page, pageSize, filter } = request.query

            const params = {
                page: page || 1,
                pageSize: pageSize || 10,
                filter: filter,
                usu_id: request.user.usu_id,
                empresa_id: request.user.empresa_id
            }


            const { colaboradores, length } = await ColaboradorService.getColaboradores(params)

            return response.status(200).json({
                dados: colaboradores,
                length: length
            });

        } catch (error) {
            next(error)
        }
    },
    async ListarColaborador(request, response, next) {
        try {
            const { colaborador_id } = request.params

            const colaborador = await ColaboradorService.getColaboradorById(colaborador_id)

            return response.status(200).json({
                dados: colaborador,
            });

        } catch (error) {
            next(error)
        }
    },
    async CadastrarColaborador(request, response, next) {
        try {
            const colaborador = await ColaboradorService.createColaboradores(request.body)

            return response.status(200).json({
                dados: colaborador,
            });

        } catch (error) {
            next(error)
        }
    },
    async ApagarColaborador(request, response, next) {
        try {
            const { colaborador_id } = request.params
            const sql = `UPDATE colaboradores SET colaborador_ativo = 0
                WHERE colaborador_id = ?;`;

            const values = [colaborador_id];

            const [result] = await connection.query(sql, values);

            return response.status(200).json({
                message: "Sucess"
            })
        }
        catch (error) {
            next(error)
        }
    },

    async AtualizarColaborador(request, response, next) {
        try {
            const { colaborador_nome, colaborador_CPF, colaborador_biometria, colaborador_telefone, colaborador_email, colaborador_id} = request.body
            const sql = `
                    UPDATE colaboradores 
                    SET 
                        colaborador_nome = ?,
                        colaborador_CPF = ?,
                        colaborador_biometria = ?,
                        colaborador_telefone = ?,
                        colaborador_email = ?
                    WHERE colaborador_id = ?
                    `;

            // Executa o comando SQL com os valores fornecidos
            const [result] = await connection.query(sql, [
                colaborador_nome,
                colaborador_CPF,
                colaborador_biometria,
                colaborador_telefone,
                colaborador_email,
                colaborador_id
            ]);

            return response.status(200).json({
                message: "Atualizado com sucesso"
            })
        } catch (e) {
            next(e)
        }
    },

    async GetAllColaboradores(request, response)
    {
        try {
            const { setor } = request.query;  // Setor vindo da query
    
            // Verifique se 'setor' é uma string e transforme em um array, se necessário
            const setoresArray = Array.isArray(setor) ? setor : [setor];
    
            let sql;
    
            if (!setor) {
                // Caso não haja setor especificado, selecione todos os colaboradores ativos
                sql = `
                    SELECT 
                        colaborador_id, 
                        colaborador_nome, 
                        colaborador_CPF, 
                        colaborador_biometria, 
                        colaborador_ativo = 1 AS colaborador_ativo, 
                        colaborador_telefone, 
                        colaborador_email, 
                        Colaboradores.empresa_id, 
                        Colaboradores.setor_id, 
                        setor_nome
                    FROM 
                        Colaboradores
                    WHERE 
                        colaborador_ativo = 1
                `;
            } else {
                // Caso haja setor, construa o SQL com IN para múltiplos setores
                const placeholders = setoresArray.map(() => '?').join(', ');
                sql = `
                    SELECT 
                        colaborador_id, 
                        colaborador_nome, 
                        colaborador_CPF, 
                        colaborador_biometria, 
                        colaborador_ativo = 1 AS colaborador_ativo, 
                        colaborador_telefone, 
                        colaborador_email, 
                        Colaboradores.empresa_id, 
                        Colaboradores.setor_id, 
                        setor_nome
                    FROM 
                        Colaboradores
                    INNER JOIN 
                        Setores ON Setores.setor_id = Colaboradores.setor_id 
                    WHERE 
                        colaborador_ativo = 1 
                        AND setor_nome IN (${placeholders})
                `;
            }
    
            const params = setor ? setoresArray : [];
            const colaboradores = await connection.query(sql, params);
    
            const nItens = colaboradores[0].length;
            return response.status(200).json({
                sucesso: true,
                mensagem: 'Lista de colaboradores',
                dados: colaboradores[0],
                nItens
            });
    
        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao listar colaborador',
                dados: error.message
            });
        }
    }
}