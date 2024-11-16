import ColaboradorItem from "../colaboradorItem"

export default function ColaboradorList({colaboradores, getColaboradores}){
    return(
        colaboradores.length === 0 ? <p>Nenhum colaborador encontrado</p>
        : colaboradores.map((colaborador, index) => <ColaboradorItem getColaboradores={getColaboradores} index={colaborador.colaborador_id} colaborador={colaborador}/>)
    )
}