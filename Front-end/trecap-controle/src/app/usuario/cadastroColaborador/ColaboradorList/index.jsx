import ColaboradorItem from "../colaboradorItem"

export default function ColaboradorList({colaboradores}){
    return(
        colaboradores.length === 0 ? <p>Nenhum colaborador encontrado</p>
        : colaboradores.map((colaborador, index) => <ColaboradorItem key={index} colaborador={colaborador}/>)
    )
}