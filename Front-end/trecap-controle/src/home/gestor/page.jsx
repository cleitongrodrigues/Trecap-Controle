import style from './page.module.css'

export default function Gestor(){
    return(
        <div className={style.Container}>
            <div className={style.ContainerDivs}>
                <h1 className={style.Titulo}>Bem Vindo Gestor!</h1>
                <div className={style.Teste}>
                    <div className={style.ContainerEventos}>Eventos</div>
                    <div>Histórico</div>
                </div>
                <div className={style.Teste}>
                    <div>Calendário</div>
                    <div>Setor</div>
                </div>
            </div>
        </div>
    )
}