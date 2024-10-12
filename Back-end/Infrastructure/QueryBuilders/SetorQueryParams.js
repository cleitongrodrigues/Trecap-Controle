export default class SetorQueryParams {
    constructor() {
        this.BASE_QUERY = "SELECT * from setores"
        this.where_clauses = []
        this.params = []
    }

    addSetorNome(name) {
        if (name) {
            this.where_clauses.push('setor_nome LIKE ?')
            this.params.push(`%${name}%`)
        }
    }

    build(companyId = 1) {
        let queryResult = this.BASE_QUERY

        const hasWhereClauses = this.where_clauses.length > 0

        if (hasWhereClauses) {
            queryResult += " WHERE " + this.whereClauses.join(" OR ") + " AND empresa_id = ?"
        } 
        this.params.push(companyId)
        
        return  {
            query: queryResult,
            params: this.params
        }
    }
}