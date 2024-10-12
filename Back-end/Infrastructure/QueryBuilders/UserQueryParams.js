export default  class UserQueryParamys{
    constructor(){
        this.baseSelect = "SELECT usu_id, usu_nome, usu_CPF, tipo_usuario_id, usu_ativo = 1 AS usu_ativo, usu_email, usu_senha, usu_telefone, usu_data_cadastro, empresa_id FROM usuario"
        this.whereClauses = []
        this.params = []
        this.pageSize = null;
        this.page = null;
    }

    setFilterName(name){
        if (name) {
            this.whereClauses.push('usu_nome LIKE ?')
            this.params.push(`%${name}%`)
        }

        return this
    }

    setFilterUserType(userType){
        if (userType) {
            this.whereClauses.push('tipo_usuario_id LIKE ?')
            this.params.push(`%${userType}%`)
        }

        return this
    }

    withPagnation(pageSize = 10, page = 1){
        this.pageSize = pageSize
        this.page = page

        return this
    }

    build(){
        let queryResult = this.baseSelect

        const hasWhereClauses = this.whereClauses.length > 0
        if(hasWhereClauses) {
            queryResult += " WHERE " + this.whereClauses.join(" AND ") + " AND usu_ativo = 1" 
        } else {
            queryResult += " WHERE usu_ativo = 1"
        }

        const hasPagination = this.pageSize && this.page
        if(hasPagination){
            const offset = (this.page - 1) * this.pageSize;
            queryResult += " LIMIT ? OFFSET ?";
            this.params.push(this.pageSize, offset); 
        }
         
        return  {
            query: queryResult,
            params: this.params
        }
    }


}