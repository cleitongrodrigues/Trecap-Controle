import Adress from "../../Domain/Entities/Adress"
import User from "../../Domain/Entities/User"


test("Cria um usuario", async ()=>{
    const userInfo = {
        name: "João Pedro",
        cpf: "98765432189",
        userType: 1,
        status: 1,
        email: "joao@pedro.com",
        password: 'JP123',
        telefone: "11987654341",
        registerDate: "2024-11-12",
        adress : {
            adressId: 1,
            logradouro: '',
            numero: '193',
            complemento: 'Predio',
            bairro : 'Joaqui Teixeira Pinto',
            cidade : 'Tupã',
            estado : 'SP',
            cep : '123455767-1293',
        }
    }

    const adress = new Adress(userInfo.adress.adressId, userInfo.adress.logradouro, userInfo.adress.numero, userInfo.adress.complemento, userInfo.adress.bairro, userInfo.adress.cidade, userInfo.adress.estado, userInfo.adress.cep)
    const newUser = new User(1, userInfo.name, userInfo.cpf, userInfo.userType, userInfo.status, userInfo.email, userInfo.password, userInfo.telefone, new Date(userInfo.registerDate), adress)

    expect(newUser).toMatchObject({userId: 1, adress: adress })
})