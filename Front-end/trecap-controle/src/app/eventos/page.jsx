'use client';

import style from './page.module.css';
import { MdWash, MdPsychology, MdEdit, MdPlayArrow } from "react-icons/md";
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
        return <MdPlayArrow />;
    }
};

export default function Evento() {
    const router = useRouter();
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mesAnoFiltro, setMesAnoFiltro] = useState(""); // Estado para o filtro de mês e ano

    const fetchEventos = async () => {
        try {
            const response = await fetch('http://localhost:3333/Eventos');
            if (!response.ok) {
                throw new Error(`Erro ${response.status}: Não foi possível carregar os eventos.`);
            }
            const data = await response.json();
            console.log("Dados recebidos da API:", data);

            // Filtrar eventos com base no mês e ano selecionados
            const eventosFiltrados = data.dados.filter(evento => {
                if (!evento.evento_data_inicio || !evento.evento_hora) {
                    console.warn("Evento com data ou hora inválida:", evento);
                    return false;
                }

                const dataEvento = new Date(evento.evento_data_inicio);
                const anoMesEvento = `${dataEvento.getFullYear()}-${String(dataEvento.getMonth() + 1).padStart(2, '0')}`;

                // Retorna todos os eventos se não houver filtro de mês/ano selecionado
                return !mesAnoFiltro || anoMesEvento === mesAnoFiltro;
            });

            setEventos(eventosFiltrados || []);
        } catch (error) {
            console.error("Erro ao buscar eventos:", error);
            setError(error.message || 'Erro ao buscar eventos');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEventos();
    }, [mesAnoFiltro]); // Atualizar os eventos ao mudar o filtro

    const handleEdit = (titulo) => {
        router.push(`/editarEvento/${titulo}`);
    };

    const handleStart = (evento) => {
        console.log("Evento clicado:", evento);
        const horaFormatada = evento.evento_hora.includes(':') ? evento.evento_hora : `${evento.evento_hora}:00`;
        const dataEventoStr = `${evento.evento_data_inicio.split('T')[0]}T${horaFormatada}`;
        const dataEvento = new Date(dataEventoStr);
        const dataAtual = new Date();
        const tolerancia = 30 * 60 * 1000; // 30 minutos
    
        const dataEventoComTolerancia = new Date(dataEvento.getTime() - tolerancia);
        
        if (dataAtual < dataEventoComTolerancia) {
            alert(`O evento ${evento.evento_nome} ainda não pode ser iniciado!`);
        } else if (dataAtual > dataEvento) {
            alert(`O prazo para entrar no Evento ${evento.evento_nome} já ultrapassado!`);
        } else {
            router.push(`/cadastroP?evento=${encodeURIComponent(evento.evento_nome)}`);
        }
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

                    {/* Input de Mês e Ano */}
                    <div className={style.FiltroDataContainer}>
                        <label htmlFor="mesAnoFiltro">Filtrar por mês e ano:</label>
                        <input
                            type="month"
                            id="mesAnoFiltro"
                            value={mesAnoFiltro}
                            onChange={(e) => setMesAnoFiltro(e.target.value)}
                        />
                        <button onClick={() => setMesAnoFiltro("")}>Limpar Filtro</button>
                    </div>

                    <div className={style.containerContent}>
                        {eventos.length > 0 ? (
                            eventos.map((evento, index) => (
                                <div key={index} className={style.ContainerDivs}>
                                    <div className={style.IconeContainer}>
                                        <IconContext.Provider value={{ size: 100 }}>
                                            {Icones[evento.iconeTipo] && Icones[evento.iconeTipo]()}
                                        </IconContext.Provider>
                                    </div>
                                    <div className={style.ContainerLabel}>
                                        <label className={style.labelTitle}>{evento.evento_nome}</label>
                                        <label className={style.labelData}>Data: {new Date(evento.evento_data_inicio).toLocaleDateString('pt-BR')}</label>
                                        <label className={style.labelData}>Horário de início: {evento.evento_hora.slice(0, 5)}</label>
                                    </div>
                                    <div className={style.Icones}>
                                        <IconContext.Provider value={{ size: 45 }}>
                                            <MdEdit onClick={() => handleEdit(evento.evento_nome)} style={{ cursor: 'pointer' }} />
                                            <MdPlayArrow onClick={() => handleStart(evento)} style={{ cursor: 'pointer' }} />
                                        </IconContext.Provider>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>Nenhum evento encontrado</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
