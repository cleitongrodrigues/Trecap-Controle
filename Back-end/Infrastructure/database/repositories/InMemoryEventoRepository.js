import Evento from "../../../Domain/Entities/Evento.js"

class InMemoryEventoRepository {
    constructor() {
        this.eventoList = [
            {
                id: 1,
                nome: 'Treinamento de operação de despeliculadoras',
                data: "2024-05-12T00:00:00.000Z",
                local: 'Amenco',
                startTime: "2024-05-12T10:00:00.000Z",
                endTime: "2024-05-12T15:00:00.000Z",
                capacity: 200,
                userID: 1
            },
            {
                id: 3,
                nome: 'Treinamento de operação de despeliculadoras Avançado',
                data: "2024-05-12T00:00:00.000Z",
                local: 'Amenco',
                startTime: "2024-05-12T11:00:00.000Z",
                endTime: "2024-05-12T16:00:00.000Z",
                capacity: 150,
                userID: 2
            },
            {
                id: 2,
                nome: 'Treinamento de operação de máquinas',
                data: "2024-05-12T00:00:00.000Z",
                local: 'Amenco',
                startTime: "2024-05-12T13:00:00.000Z",
                endTime: "2024-05-12T15:00:00.000Z",
                capacity: 120,
                userID: 3
            },
        ]
    }

    async createEvento(userID, eventoCreateDTO){
        const newEvento= new Evento(
            this.eventoList.length + 1,
            eventoCreateDTO.name, 
            eventoCreateDTO.data, 
            eventoCreateDTO.local,
            eventoCreateDTO.startTime,
            eventoCreateDTO.endTime,
            eventoCreateDTO.capacity,
            userID
        )

        this.eventoList.push(newEvento)

        return newEvento
    }

}

export default new InMemoryEventoRepository()