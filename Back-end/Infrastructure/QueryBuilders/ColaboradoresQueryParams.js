export default class ColaboradoresQueryParams {
    constructor() {
        this.BASE_QUERY = `SELECT colaborador_id, colaborador_nome, colaborador_CPF, colaborador_biometria, 
            colaborador_ativo = 1 AS colaborador_ativo , colaborador_telefone, colaborador_email, empresa_id, setor_id 
            FROM Colaboradores`
        this.where_clauses = []
        this.params = []
        this.companyId
    }

    addSetorId(id) {
        if (id) {
            this.where_clauses.push('setor_id = ?')
            this.params.push(`%${id}%`)
        }
    }

    setCompanyId(id){
        this.companyId = id
    }

    build() {
        let queryResult = this.BASE_QUERY

        const hasWhereClauses = this.where_clauses.length > 0

        if (hasWhereClauses) {
            queryResult += 'WHERE'
            for(const where in this.where_clauses){
                if(where.startsWith('setor_id')) queryResult += ` ${where} `
            }
        } 
        this.params.push(this.companyId)
        
        return  {
            query: queryResult,
            params: this.params
        }
    }
}