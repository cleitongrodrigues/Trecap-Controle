'use client'
import style from './page.module.css'
import { MdWash } from "react-icons/md";
import { IconContext, MdEdit, MdSearch, MdCheck, MdTimer, MdPsychology} from 'react-icons';

export default function Evento(){
    return(
        <div className={style.Geral}>
            <div className={style.Container}>
                <h1 className={style.Titulo}>Eventos</h1>
                <div>
                <div className={style.ContainerDivs}>
                    <IconContext.Provider value={{size:100}}>
                            <MdWash />
                       </IconContext.Provider>
                   <div className={style.ContainerLabel}>
                        <label>Treinamento sobre higiene no trabalho</label>
                        <label>Data: 20/08/2024</label>
                   </div>
                </div>
                <div className={style.ContainerDivs}>
                    <IconContext.Provider value={{size:100}}>
                            <MdWash />
                       </IconContext.Provider>
                   <div className={style.ContainerLabel}>
                        <label>Treinamento sobre utilização de EPI´S</label>
                        <label>Data: 25/12/2024</label>
                   </div>
                </div>
                <div className={style.ContainerDivs}>
                    <IconContext.Provider value={{size:100}}>
                            <MdWash />
                       </IconContext.Provider>
                   <div className={style.ContainerLabel}>
                        <label>Treinamento sobre uniformes</label>
                        <label>Data: 03/01/2025</label>
                   </div>
                </div>
                </div>
            </div>
        </div>
    )
}