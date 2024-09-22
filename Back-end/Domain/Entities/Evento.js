// evento_id int AUTO_INCREMENT NOT NULL,
// evento_nome varchar(50) NOT NULL,
// evento_data date NOT NULL,
// evento_local varchar(100) NOT NULL,
// evento_hora_inicio datetime NOT NULL,
// evento_hora_termino datetime NOT NULL,
// evento_capacidade int NOT NULL,
// usu_id int NOT NULL,
// PRIMARY KEY (evento_id),
// FOREIGN KEY (usu_id) REFERENCES Usuario(usu_id)


export default class Evento {
    constructor(id, name, dateStartTime, dateEndTime, local, status,userID){
        this.id = id
        this.name = name
        this.dateStartTime = new Date(dateStartTime)
        this.dateEndTime = new Date(dateEndTime)
        this.local = local
        this.status = status
        this.userID = userID

        if(this.dateStartTime >= this.dateEndTime) throw new Error('A data de inicio ocorre depois da data de término')
    }
}