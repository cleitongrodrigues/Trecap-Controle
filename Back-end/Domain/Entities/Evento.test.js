import Evento from "./Evento"

describe('Criar Evento', () => {
    it("Tenta criar um evento válido", () => {
        const eventoData = {
            id: 1,
            nome: 'Treinamento de operação de despeliculadoras',
            local: 'Amenco',
            dateStartTime: '2024-10-11T14:00:00',
            dateEndTime: '2024-10-11T17:00:00',
            status: 'active',
            userID: 1,
        }

        const newEvento = new Evento(
            eventoData.id,
            eventoData.nome,
            eventoData.dateStartTime,
            eventoData.dateEndTime,
            eventoData.local,
            eventoData.status,
            eventoData.userID
        )

        expect(newEvento).toMatchObject({
            dateStartTime: new Date('2024-10-11T14:00:00'),
            dateEndTime: new Date('2024-10-11T17:00:00')
        })
    })

    it("Tenta criar um evento com data de início de tarde e termino de manhã", () => {
        const eventoData = {
            id: 1,
            nome: 'Treinamento de operação de despeliculadoras',
            local: 'Amenco',
            dateStartTime: '2024-10-11T14:00:00',
            dateEndTime: '2024-10-11T10:00:00',
            status: 'active',
            userID: 1,
        }

        expect(() => new Evento(
            eventoData.id,
            eventoData.nome,
            eventoData.dateStartTime,
            eventoData.dateEndTime,
            eventoData.local,
            eventoData.userID
        )).toThrow()
    })

    it("Tenta criar um evento inválido com data de início de manhã e termino de manhã", () => {
        const eventoData = {
            id: 1,
            nome: 'Treinamento de operação de despeliculadoras',
            local: 'Amenco',
            dateStartTime: '2024-10-11T08:00:00',
            dateEndTime: '2024-10-11T05:00:00',
            status: 'active',
            userID: 1,
        }

        expect(() => new Evento(
            eventoData.id,
            eventoData.nome,
            eventoData.dateStartTime,
            eventoData.dateEndTime,
            eventoData.local,
            eventoData.userID
        )).toThrow()
    })

    
    it("Tenta criar um evento inválido com data de início de tarde e termino de tarde", () => {
        const eventoData = {
            id: 1,
            nome: 'Treinamento de operação de despeliculadoras',
            local: 'Amenco',
            dateStartTime: '2024-10-11T18:00:00',
            dateEndTime: '2024-10-11T15:00:00',
            status: 'active',
            userID: 1,
        }

        expect(() => new Evento(
            eventoData.id,
            eventoData.nome,
            eventoData.dateStartTime,
            eventoData.dateEndTime,
            eventoData.local,
            eventoData.userID
        )).toThrow()
    })
})