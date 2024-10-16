// CREATE TABLE IF NOT EXISTS Setores(
//     setor_id INT AUTO_INCREMENT NOT NULL,
//     setor_nome varchar(100) NOT NULL,
//     empresa_id INT NOT NULL,
//     FOREIGN KEY (empresa_id) REFERENCES Empresa(empresa_id),
//     PRIMARY KEY (setor_id)
// );

export default class Setor{
    constructor(setorId, setorNome, empresaId){
        this.setorId = setorId
        this.setorNome = setorNome
        this.empresaId = empresaId
    }
}