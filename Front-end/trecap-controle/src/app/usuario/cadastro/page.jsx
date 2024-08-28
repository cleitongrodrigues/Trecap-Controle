import CabecalhoLogado from '@/cabecalhoLogado/page'
import style from './page.module.css'
export default function CadastrarEvento(){
    return(
        <>
        <CabecalhoLogado/>
        <div className={style.Geral}>
            <div className={style.Container}>
                <h1 className={style.Titulo}>Cadastro de Colaboradores</h1>
                <div className={style.ContainerTudo}>
                    <div className={style.Teste}>
                        <label>Nome do colaborador:</label>
                        <input type="text" name="" id="" />
                    </div>
                    <div className={style.TesteD}>
                        <div className={style.Teste}>
                            <label>RG:</label>
                            <input type="number" name="" id="" />
                            <label>CPF:</label>
                            <input type="text" name="" id="" />
                        </div>
                        <div className={style.TesteT}>
                        <label>Setor:</label>
                        <input type="text" name="" id="" />
                        <label>Biometira:</label>
                        <input type="text" name="" id="" />
                        </div>
                    </div>
                    <div className={style.TesteD}>
                        <div className={style.Teste}>
                            <label>CEP:</label>
                            <input type="number" name="" id="" />
                            <label>Complemento:</label>
                            <input type="text" name="" id="" />
                        </div>
                        <div className={style.TesteT}>
                        <label>Bairro:</label>
                        <input type="text" name="" id="" />
                        <div className={style.Estado}>
                            <label>Cidade:</label>
                            <input type="text" name="" id="" />
                            <label>Estado:</label>
                            <input className={style.InputEstado} type="text" name="" id="" />
                        </div>
                        </div>
                    </div>
                  
                    <div className={style.ContainerButton}>
                        <button className={style.Button}>Concluir</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}