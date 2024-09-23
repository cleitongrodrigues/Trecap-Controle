import inMemoryAdressRepository from "../../Infrastructure/database/repositories/inMemoryAdressRepository"

test("Encontrar endereço por ID", async () => {
    const adress =  await inMemoryAdressRepository.findById(1)

    expect(adress).toMatchObject({adressId: 1})
})