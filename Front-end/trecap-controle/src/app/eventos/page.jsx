'use client';

import style from './page.module.css';
import { MdWash, MdPsychology, MdEdit, MdTimer } from "react-icons/md";
import { IconContext } from 'react-icons';
import { useRouter } from 'next/navigation';
import MenuLateral from '@/components/menuLateral/page';
import { useEffect, useState } from 'react';

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
};

export default function Evento() {
    const router = useRouter();
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEventos = async () => {
        try {
            const response = await fetch('http://localhost:3333/Eventos');
            if (!response.ok) {
                throw new Error(`Erro ${response.status}: Não foi possível carregar os eventos.`);
            }
            const data = await response.json();
            console.log("Dados recebidos da API:", data);
            setEventos(data.dados || []);
        } catch (error) {
            console.error("Erro ao buscar eventos:", error);
            setError(error.message || 'Erro ao buscar eventos');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEventos();
    }, []);

    const handleEdit = (titulo) => {
        router.push(`/editarEvento/${titulo}`);
    };

    const handleStart = (titulo) => {
        alert(`Evento ${titulo} iniciado!`);
        router.push(`/cadastroP?evento=${encodeURIComponent(titulo)}`);
    };

    const handleClick = (evento) => {
        console.log('Evento clicado:', evento);
    };

    if (loading) {
        return <div>Carregando eventos...</div>;
    }

    if (error) {
        return <div>Erro: {error}</div>;
    }

    return (
        <>
            <MenuLateral />
            <div className={style.Geral}>
                <div className={style.Container}>
                    <h1 className={style.Titulo}>Eventos</h1>
                    <div className={style.containerContent}>
                        {eventos.length > 0 ? (
                            eventos.map((evento, index) => (
                                <div key={index} onClick={() => handleClick(evento)} className={style.ContainerDivs}>
                                    <IconContext.Provider value={{ size: 100 }}>
                                        {Icones[evento.iconeTipo] && Icones[evento.iconeTipo]()}
                                    </IconContext.Provider>
                                    <div className={style.ContainerLabel}>
                                        <label className={style.labelTitle}>{evento.evento_nome}</label>
                                        <label className={style.labelData}>{new Date(evento.evento_data_inicio).toISOString().split("T")[0]}</label>
                                    </div>
                                    <div className={style.Icones}>
                                        <IconContext.Provider value={{ size: 45 }}>
                                            <MdEdit onClick={() => handleEdit(evento.evento_nome)} style={{ cursor: 'pointer' }} />
                                            <MdTimer onClick={() => handleStart(evento.evento_nome)} style={{ cursor: 'pointer' }} />
                                        </IconContext.Provider>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>Nenhum evento encontrado</div>
                        )}
                    </div>
                </div>
                <footer className={style.footer}>
                    <p>&copy; 2024 TRECAP. Todos os direitos reservados.</p>
                </footer>
            </div>
        </>
    );
}
