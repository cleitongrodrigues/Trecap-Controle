import Adress from "../../../Domain/Entities/Adress"

class InMemoryAdressRepository {
    constructor() {
        this.adressList = [
            {
                adressId: 1,
                adressLogradouro: '',
                adressNumber: '193',
                adressComplemento: 'Predio',
                adressBairro: 'Joaqui Teixeira Pinto',
                adressCidade: 'Tupã',
                adressEstado: 'SP',
                adressCep: '213455767-1293'
            },
            {
                adressId: 2,
                adressLogradouro: '',
                adressNumber: '201',
                adressComplemento: 'Casa',
                adressBairro: 'Jose Almeida',
                adressCidade: 'Rinópolis',
                adressEstado: 'SP',
                adressCep: '879332445567-808'
            },
            {
                adressId: 3,
                adressLogradouro: '',
                adressNumber: '574',
                adressComplemento: 'Casa',
                adressBairro: 'Carlos de Andrade',
                adressCidade: 'Tupã',
                adressEstado: 'SP',
                adressCep: '1435454355-783'
            },
        ]
    }


    async count(){
        return this.adressList.length
    }

    async findById(adressId){
        const adressData = this.adressList.find(adress => adress.adressId === adressId)
        if(!adressData) return

        return new Adress(adressData.adressId, adressData.adressLogradouro, adressData.adressNumber, adressData.adressComplemento, adressData.adressBairro, adressData.adressCidade, adressData.adressEstado, adressData.adressCep)
    }

    async save(adress){
        this.adressList.push(adress)
    }
}

export default new InMemoryAdressRepository()