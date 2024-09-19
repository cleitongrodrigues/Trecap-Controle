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
    constructor(id, name, data, local, startTime, endTime, capacity, userID){
        this.id = id
        this.name = name
        this.data = new Date(data)
        this.local  = local
        this.startTime = new Date(`${data}T${startTime}Z`)
        this.endTime = new Date(`${data}T${endTime}Z`)
        this.capacity = capacity
        this.userID = userID

        if(this.startTime > this.endTime) throw new Error('A data de inicio ocorre depois da data de término')
    }
}