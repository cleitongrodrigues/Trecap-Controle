import style from './styles.module.css'

import { IconContext } from "react-icons";
import { MdSearch, MdEdit, MdDelete } from "react-icons/md";

export default function ColaboradorItem({key, colaborador, onClickEditar, onClickExcluir}) {
    return (
        <div key={key} className={style.ContainerDivs}>
            <div className={style.ContainerId}>
                {colaborador.colaborador_id}
            </div>
            <div className={style.ContainerNome}>
                {colaborador.colaborador_nome}
            </div>
            <div className={style.ContainerEmail}>
                {colaborador.colaborador_email}
            </div>
            <div className={style.ContainerBotaoEditar}>
                <button
                    type="button"
                    className={style.ButtonEditar}
                    onClick={onClickEditar}
                >
                    <IconContext.Provider value={{ size: 20 }}>
                        <MdEdit />
                    </IconContext.Provider>
                </button>
                <button
                    type="button"
                    className={style.ButtonExcluir}
                    onClick={()=>onClickExcluir(colaborador.colaborador_id)}
                >
                    <IconContext.Provider value={{ size: 20 }}>
                        <MdDelete />
                    </IconContext.Provider>
                </button>
            </div>
        </div>
    )
}