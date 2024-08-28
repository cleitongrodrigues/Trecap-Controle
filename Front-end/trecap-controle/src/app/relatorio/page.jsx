import CabecalhoLogado from '@/cabecalhoLogado/page'
import style from './page.module.css'

const funcionarios = [
    {
        nome:'Joseph Segundo',
        horario:'12:00'
    },
    {
        nome:'Cleiton Guilherme',
        horario:'12:00'
    },
    {
        nome:'Leonardo Cabral',
        horario:'12:00'
    },
    {
        nome:'Douglas Mariano',
        horario:'12:00'
    },
    {
        nome:'Gabriel Bezerra',
        horario:'ausente'
    },
    {
        nome:'Joseph Segundo',
        horario:'12:00'
    },
    {
        nome:'Cleiton Guilherme',
        horario:'12:00'
    },
    {
        nome:'Leonardo Cabral',
        horario:'12:00'
    },
    {
        nome:'Douglas Mariano',
        horario:'12:00'
    },

]

export default function Relatorio() {
    return (
        <>
        <CabecalhoLogado/>
        <div className={style.ContainerGeral}>
            <div className={style.ContainerTitulo}>
                <h1 className={style.Titulo}>Treinamento sobre Higiene</h1>
                <div className={style.Titulo}>
                    <h2>Data: 25/05/2025</h2>
                    <h2>Horário: 12:00</h2>
                </div>
            </div>
            <div className={`${style.ContainerRegistros} ${style.Titulo}`}>
                <div className={style.ContainerTituloRelatorio}>
                    <h2>Nome do Colaborador</h2>
                    <h2>Horário de Leitura</h2>
                </div>
                <div className={style.ContainerListrado}>
                    {funcionarios.map((funcionario)=>{
                        return(
                            <div><p>{funcionario.nome}</p> <p>{funcionario.horario}</p></div>
                        )
                    })}
                </div>
                <div className={style.ContainerButton}>
                    <button>Gerar Relatório</button>
                </div>
            </div>
        </div>
        </>
    )
}