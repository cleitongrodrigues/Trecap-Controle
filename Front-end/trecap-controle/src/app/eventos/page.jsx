'use client'; // Certifique-se de que esta linha está no início do arquivo se estiver usando Next.js com o modo "use client"

import style from './page.module.css';
import { MdWash, MdPsychology, MdEdit, MdSearch, MdCheck, MdTimer } from "react-icons/md";
import { IconContext } from 'react-icons';
import CabecalhoLogado from '@/cabecalhoLogado/page';
import { useRouter } from 'next/navigation';

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

    // Função para editar o evento
    const handleEdit = (titulo) => {
        // Redireciona para a página de edição do evento passando o ID
        router.push(`/editarEvento/${titulo}`);
    };

    // Função para iniciar o evento e redirecionar para a página de seleção de setores
    const handleStart = (titulo) => {
        // Exibe uma mensagem que o evento foi iniciado
        alert(`Evento ${titulo} iniciado!`);
        
        // Redireciona para a página de seleção de setores do evento
        router.push(`/cadastroP/`);
    };

    return (
        <>
            <CabecalhoLogado />
            <div className={style.Geral}>
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
                                        {/* Ícone de editar */}
                                        <MdEdit onClick={() => handleEdit(evento.titulo)} style={{ cursor: 'pointer' }} />
                                        
                                        {/* Ícone de iniciar evento */}
                                        <MdTimer onClick={() => handleStart(evento.titulo)} style={{ cursor: 'pointer' }} />
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
