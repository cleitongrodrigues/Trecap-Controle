export default class QueryBuilder {
    constructor(table) {
      this.tableName = table
      this.selectedFields = "*"
      this.wheresConditions = []
      this.orderByField = ''
      this.limitValue = null
      this.pageValue = null
    }

    select(fields){
        this.selectedFields = fields.join(', ')
        return this
    }

    whereAnd(condition){
        this.wheresConditions.push(`AND ${condition}`)
        return this
    }

    whereOr(condition){
        this.wheresConditions.push(`OR ${condition}`)
        return this
    }

    orderBy(fieldName, direction = 'ASC'){
        this.orderByField = `${fieldName} ${direction}`
        return this
    }

    limit(limitValue = 10){
        this.limitValue = limitValue
        return this
    }

    page(pageValue = 1){
        this.pageValue = pageValue
        return this
    }

    build(){
        let queryResult = `SELECT ${this.selectedFields} FROM ${this.tableName}`

        if(this.hasWhereConditions()){
            queryResult += this.createStringForWhereCondition()
        }

        if(this.orderByField){
            queryResult += this.createStringForOrderBy()
        }

        if(this.limitValue){
            queryResult +=  ` LIMIT ${this.limitValue}`
        }

        if(this.pageValue){
            const offset = (this.pageValue - 1) * this.limitValue
            queryResult += ` OFFSET ${offset}`
        }

        return queryResult
    }

    hasWhereConditions(){
        return this.wheresConditions.length > 0 
    }

    createStringForWhereCondition(){
        return " WHERE " + this.wheresConditions.join(' ').replace(/^AND |OR /, '')
    }

    createStringForOrderBy(){
        return ` ORDER BY ${this.orderByField}`
    }
}

// Exemplo de uso
// const qb = new QueryBuilder('users')
//     .select(['id', 'name', 'email'])
//     .where('age > 18')
//     .where('status = "active"')
//     .orderBy('name', 'ASC')
//     .limit(10);