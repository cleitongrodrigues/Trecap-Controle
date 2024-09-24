'use client';  // Certifique-se de que esta linha está no início do arquivo se estiver usando Next.js com o modo "use client"

import style from './page.module.css';
import { MdWash, MdPsychology, MdEdit, MdSearch, MdCheck, MdTimer } from "react-icons/md";
import { IconContext } from 'react-icons';
import CabecalhoLogado from '@/cabecalhoLogado/page';
import { useRouter } from 'next/navigation';

const eventos = [
    {
        titulo: 'Treinamento sobre higiene no trabalho',
        data: 'Data: 20/08/2024',
        IconeTipo: "Psicologia"
    },

    {
        titulo: 'Treinamento ',
        data: 'Data: 20/08/2024',
        IconeTipo: "Wash"
    },

    {
        titulo: 'Treinamento teste',
        data: 'Data: 10/08/2025',
         IconeTipo: "Timer"
    }
];

const Icones = {
    Psicologia(){
        return(
            <MdPsychology />
        )
    },
    Wash(){
        return(
            <MdWash />
        )
    },
    Timer(){
        return(
            <MdTimer />
        )
    }
}

export default function Evento() {
    const router = useRouter()

    const handleClick = () =>{
        router.push('./cadastroP')
    }

    return (
        <>
        <CabecalhoLogado/>
        <div className={style.Geral}>
            <div className={style.Container}>
                <h1 className={style.Titulo}>Eventos</h1>
                <div className={style.containerContent}>
                    {eventos.map((evento, index) => (
                        <div key={index}  onClick={handleClick} className={style.ContainerDivs}>
                            <IconContext.Provider value={{ size: 100 }}>
                                {Icones[evento.IconeTipo]()}
                            </IconContext.Provider>
                            <div className={style.ContainerLabel}>
                                <label className={style.labelTitle}>{evento.titulo}</label>
                                <label className={style.labelData}>{evento.data}</label>
                            </div>
                            <div className={style.Icones}>
                                <IconContext.Provider value={{ size: 45 }}>
                                    <MdEdit />
                                    <MdSearch />
                                    <MdTimer />
                                </IconContext.Provider>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    );
}
