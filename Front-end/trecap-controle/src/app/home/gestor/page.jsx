'use client'
import { IconContext } from 'react-icons';
import style from './page.module.css'
import Link from 'next/link'
import { MdCalendarMonth, MdHourglassBottom, MdEventNote, MdPeople } from "react-icons/md";
import CabecalhoLogado from '@/cabecalhoLogado/page';


export default function Gestor(){
    return(
        <>
        <CabecalhoLogado/>
        <div className={style.Container}>
            <div>
                <h1 className={style.Titulo}>Bem Vindo Gestor!</h1>
                <div className={style.Teste}>
                    <div>
                        
                        <IconContext.Provider value={{size:100}}>
                            <MdEventNote />
                       </IconContext.Provider>
                        <Link href="/eventos">Eventos</Link>
                    </div>
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
        </>
    )
}