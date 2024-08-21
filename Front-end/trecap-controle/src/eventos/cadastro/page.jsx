import style from './page.module.css'
export default function CadastrarEvento(){
    return(
        <div className={style.Geral}>
            <div className={style.Container}>
                <h1 className={style.Titulo}>Cadastro de Eventos</h1>
                <div className={style.ContainerTudo}>
                    <div className={style.Teste}>
                        <label>Nome do evento:</label>
                        <input type="text" name="" id="" />
                    </div>
                    <div className={style.TesteD}>
                        <div className={style.Teste}>
                            <label>Data do Evento</label>
                            <input type="date" name="" id="" />
                            <label>Local do Evento</label>
                            <input type="text" name="" id="" />
                        </div>
                        <div className={style.Teste}>
                        <label>Hora do início do evento:</label>
                        <input type="time" name="" id="" />
                        <label>Hora do término do evento:</label>
                        <input type="time" name="" id="" />
                        </div>
                    </div>
                    <div className={style.Teste}>
                        <label>Mentor do evento:</label>
                        <input type="text" name="" id="" />
                    </div>
                    <div className={style.ContainerTudo}>
                        <button className={style.Button}>Concluir</button>
                    </div>
                </div>
            </div>
        </div>
    )
}