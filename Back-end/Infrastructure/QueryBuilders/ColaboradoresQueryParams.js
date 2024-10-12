export default class ColaboradoresQueryParams {
    constructor() {
        this.BASE_QUERY = "SELECT * from setores"
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
            queryResult += " WHERE " + this.whereClauses.join(" OR ") + " AND empresa_id = ?"
        } 
        this.params.push(this.companyId)
        
        return  {
            query: queryResult,
            params: this.params
        }
    }
}