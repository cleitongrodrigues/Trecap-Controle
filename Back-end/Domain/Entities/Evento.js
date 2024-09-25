export default class Evento {
    constructor(eventId, name, dateStartTime, dateEndTime, local, status,userId){
        this.eventoId = eventId
        this.name = name
        this.dateStartTime = new Date(dateStartTime)
        this.dateEndTime = new Date(dateEndTime)
        this.local = local
        this.status = status
        this.userId = userId

        if(this.dateStartTime >= this.dateEndTime) throw new Error('A data de inicio ocorre depois da data de término')
    }
}