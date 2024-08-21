'use client'
import { IconContext } from 'react-icons';
import style from './page.module.css'
import { MdCalendarMonth, MdHourglassBottom, MdEventNote, MdPeople } from "react-icons/md";


export default function Gestor(){
    return(
        <div className={style.Container}>
            <div>
                <h1 className={style.Titulo}>Bem Vindo Gestor!</h1>
                <div className={style.Teste}>
                    <div>
                        <IconContext.Provider value={{size:100}}>
                            <MdEventNote />
                       </IconContext.Provider>
                        Eventos</div>
                    <div>
                        <IconContext.Provider value={{size:100}}>
                            <MdHourglassBottom />
                       </IconContext.Provider>
                        Histórico
                        </div>
                    <div>
                       <IconContext.Provider value={{size:100}}>
                            <MdCalendarMonth />
                       </IconContext.Provider>
                       Calendário
                    </div>
                    <div>
                        <IconContext.Provider value={{size:100}}>
                            <MdPeople />
                       </IconContext.Provider>
                        Setor</div>
                </div>
            </div>
        </div>
    )
}