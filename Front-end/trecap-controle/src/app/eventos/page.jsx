'use client'
import style from './page.module.css'
import { MdWash, MdPsychology, MdEdit, MdSearch, MdCheck, MdTimer } from "react-icons/md";
import { IconContext} from 'react-icons';

export default function Evento(){
    return(
        <div className={style.Geral}>
            <div className={style.Container}>
                <h1 className={style.Titulo}>Eventos</h1>
                <div className={style.TesteDiv}>
                <div className={style.ContainerDivs}>
                <IconContext.Provider value={{size:100}} >
                            <MdWash />
                       </IconContext.Provider>
                   <div className={style.ContainerLabel}>
                        <label>Treinamento sobre higiene no trabalho</label>
                        <label>Data: 20/08/2024</label>
                   </div>
                   <div className={style.Icones}>
                   <IconContext.Provider value={{size:45, className:style.ClasseIcone}}>
                            <MdEdit/>
                            <MdSearch/>
                            <MdCheck/>
                       </IconContext.Provider>
                   </div>
                </div>
                </div>
                <div className={style.ContainerDivs}>
                    <IconContext.Provider value={{size:100}}>
                            <MdPsychology />
                       </IconContext.Provider>
                   <div className={style.ContainerLabel}>
                        <label>Treinamento sobre utilização de EPI´S</label>
                        <label>Data: 25/12/2024</label>
                   </div>
                   <div className={style.Icones}>
                   <IconContext.Provider value={{size:45, className:style.ClasseIcone}}>
                            <MdEdit/>
                            <MdSearch/>
                            <MdTimer/>
                       </IconContext.Provider>
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
                   <div className={style.Icones}>
                        <IconContext.Provider value={{size:45, className:style.ClasseIcone}}>
                                    <MdEdit/>
                                    <MdSearch/>
                                    <MdTimer/>
                            </IconContext.Provider>
                   </div>
                </div>
               
            </div>
        </div>
    )
}