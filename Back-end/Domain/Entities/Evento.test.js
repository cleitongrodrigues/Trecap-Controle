import Evento from "./Evento"

describe('Criar Evento', ()=>{
    it("Tenta criar um evento válido", () => {
        const eventoData = {
            id: 1,
            nome: 'Treinamento de operação de despeliculadoras',
            data: '2024-05-12',
            local: 'Amenco',
            startTime: '14:00:00',
            endTime: '17:00:00',
            capacity: 100,
            userID: 1,
        }

        const newEvento = new Evento(
            eventoData.id, 
            eventoData.nome, 
            eventoData.data, 
            eventoData.local,
            eventoData.startTime,
            eventoData.endTime,
            eventoData.capacity,
            eventoData.userID
        )
        expect(newEvento).toBeDefined()
    })

    it("Tenta criar um evento inválido", () => {
        const eventoData = {
            id: 1,
            nome: 'Treinamento de operação de despeliculadoras',
            data: '2024-05-12',
            local: 'Amenco',
            startTime: '14:00:00',
            endTime: '10:00:00',
            capacity: 100,
            userID: 1,
        }

        expect(()=>new Evento(
            eventoData.id, 
            eventoData.nome, 
            eventoData.data, 
            eventoData.local,
            eventoData.startTime,
            eventoData.endTime,
            eventoData.capacity,
            eventoData.userID
        )).toThrow()
    })
})