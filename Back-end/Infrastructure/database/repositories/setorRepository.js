import connection from "../connection"
import QueryBuilder from "../QueryBuilder"


export default class SetorRepository {
    constructor() {
        this.queryBuilder = new QueryBuilder("Setores")
    }

    getSetores(){
        const sql= this.queryBuilder.build()

        const result = []

        return result
    }

    getSetoresByName(filters) {
        const { names, page, pageSize } = filters

        this.addAllWheresFilterByNameWithOr(names)

        const sql = this.queryBuilder.limit(pageSize).page(page).build()

        return sql
    }

    
    addAllWheresFilterByNameWithOr(names){
        names.forEach( name => {
            this.queryBuilder.whereOr(`setor_nome = ${name}`)
        })
    }
}