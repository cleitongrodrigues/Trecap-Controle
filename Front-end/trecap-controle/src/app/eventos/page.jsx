'use client'; 

import style from './page.module.css';
import { MdWash, MdPsychology, MdEdit, MdSearch, MdCheck, MdTimer } from "react-icons/md";
import { IconContext } from 'react-icons';
import CabecalhoLogado from '@/cabecalhoLogado/page';
import { useRouter } from 'next/navigation';
import MenuLateral from '@/components/menuLateral/page';

const eventos = [
    {
        id: 1,
        titulo: 'Treinamento sobre higiene no trabalho',
        data: 'Data: 20/08/2024',
        IconeTipo: "Psicologia"
    },
    {
        id: 2,
        titulo: 'Treinamento Sobre lavagem de Mãos',
        data: 'Data: 20/08/2024',
        IconeTipo: "Wash"
    },
    {
        id: 3,
        titulo: 'Treinamento teste',
        data: 'Data: 10/08/2025',
        IconeTipo: "Timer"
    }
];

const Icones = {
    Psicologia() {
        return <MdPsychology />;
    },
    Wash() {
        return <MdWash />;
    },
    Timer() {
        return <MdTimer />;
    }
}

export default function Evento() {
    const router = useRouter();

    const handleEdit = (titulo) => {
        router.push(`/editarEvento/${titulo}`);
    };

    const handleStart = (titulo) => {
        alert(`Evento ${titulo} iniciado!`);
        router.push(`/cadastroP/`);
    };

    return (
        <>
            <CabecalhoLogado />
            <div className={style.Geral}>
                <MenuLateral />
                <div className={style.Container}>
                    <h1 className={style.Titulo}>Eventos</h1>
                    <div className={style.containerContent}>
                        {eventos.map((evento, index) => (
                            <div key={index} className={style.ContainerDivs}>
                                <IconContext.Provider value={{ size: 100 }}>
                                    {Icones[evento.IconeTipo] ? Icones[evento.IconeTipo]() : <MdCheck />}
                                </IconContext.Provider>
                                <div className={style.ContainerLabel}>
                                    <label className={style.labelTitle}>{evento.titulo}</label>
                                    <label className={style.labelData}>{evento.data}</label>
                                </div>
                                <div className={style.Icones}>
                                    <IconContext.Provider value={{ size: 45 }}>
                                        <MdEdit onClick={() => handleEdit(evento.titulo)} style={{ cursor: 'pointer' }} />
                                        <MdTimer onClick={() => handleStart(evento.titulo)} style={{ cursor: 'pointer' }} />
                                    </IconContext.Provider>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <footer className={style.footer}>
        <p>&copy; 2024 TRECAP. Todos os direitos reservados.</p>
      </footer>
            </div>
        </>
    );
}
