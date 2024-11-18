'use client';

import style from './page.module.css';
import { MdWash, MdPsychology, MdEdit, MdPlayArrow } from "react-icons/md";
import { IconContext } from 'react-icons';
import { useRouter } from 'next/navigation';
import MenuLateral from '@/components/menuLateral/page';
import { useEffect, useState } from 'react';
import ModalEdit from './ModalEdit';
import axios from 'axios';

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
    const [mesAnoFiltro, setMesAnoFiltro] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [eventoEditando, setEventoEditando] = useState(null);

    const fetchEventos = async () => {
        try {
            const response = await axios.get('http://localhost:3333/Eventos');
            if (response.status !== 200) {
                throw new Error(`Erro ${response.status}: Não foi possível carregar os eventos.`);
            }
            const data = response.data;

            const eventosFiltrados = data.dados.filter(evento => {
                if (!evento.evento_data_inicio || !evento.evento_hora) {
                    console.warn("Evento com data ou hora inválida:", evento);
                    return false;
                }

                const dataEvento = new Date(evento.evento_data_inicio);
                const anoMesEvento = `${dataEvento.getFullYear()}-${String(dataEvento.getMonth() + 1).padStart(2, '0')}`;

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

    const handleEdit = (evento) => {
        setEventoEditando(evento);
        setModalOpen(true);
    };

    const handleSaveEdit = async (eventoEditado) => {
        try {
            const dataEventoInicio = eventoEditado.evento_data_inicio;
            const dataEventoTermino = eventoEditado.evento_data_termino;
            if (!dataEventoInicio || !dataEventoTermino) {
                alert("Datas inválidas!");
                return;
            }

            // Formatar as datas no formato YYYY-MM-DD
            const dataInicioFormatada = new Date(dataEventoInicio).toISOString().split('T')[0];
            const dataTerminoFormatada = new Date(dataEventoTermino).toISOString().split('T')[0];

            // Validar e formatar a hora
            let [hora, minuto] = eventoEditado.evento_hora.split(':');
            if (!hora || !minuto) {
                alert("Hora de início inválida!");
                return;
            }

            hora = String(hora).padStart(2, '0');
            minuto = String(minuto).padStart(2, '0');

            const eventoEditadoComData = {
                ...eventoEditado,
                evento_data_inicio: dataInicioFormatada,
                evento_data_termino: dataTerminoFormatada,
                evento_hora: `${hora}:${minuto}`,
            };

            const response = await axios.patch(`http://localhost:3333/Eventos/${eventoEditadoComData.evento_id}`, eventoEditadoComData);

            if (response.status !== 200) {
                throw new Error(`Erro ao salvar evento: ${response.status}`);
            }

            // Atualizar o evento na lista de eventos localmente
            setEventos((prevEventos) =>
                prevEventos.map((evento) =>
                    evento.evento_id === eventoEditadoComData.evento_id ? eventoEditadoComData : evento
                )
            );

            // Fechar o modal
            setModalOpen(false);
        } catch (error) {
            console.error("Erro ao salvar evento:", error);
        }
    };


    const handleStart = (evento) => {
        
        const horaFormatada = evento.evento_hora.includes(':') ? evento.evento_hora : `${evento.evento_hora}:00`;
        const dataEventoStr = `${evento.evento_data_inicio.split('T')[0]}T${horaFormatada}`;
        const dataEvento = new Date(dataEventoStr);
        const dataAtual = new Date();
        const tolerancia = 30 * 60 * 1000;
    
        const dataEventoComTolerancia = new Date(dataEvento.getTime() - tolerancia);
    
        if (dataAtual < dataEventoComTolerancia) {
            alert(`O evento ${evento.evento_nome} ainda não pode ser iniciado!`);
        } else if (dataAtual > dataEvento) {
            alert(`O prazo para entrar no Evento ${evento.evento_nome} já ultrapassou!`);
        } else {

            localStorage.setItem('eventoId', evento.evento_id);

            // Aqui estamos passando a ID do evento (evento.evento_id) ao invés do nome
            router.push(`/cadastroP?eventoId=${encodeURIComponent(evento.evento_id)}`);
        }
    };    

    useEffect(() => {
        fetchEventos();
    }, [mesAnoFiltro]);

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
                                            <MdEdit onClick={() => handleEdit(evento)} style={{ cursor: 'pointer' }} />
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


            {modalOpen && eventoEditando && (
                <ModalEdit
                    evento={eventoEditando}
                    onClose={() => setModalOpen(false)}
                    onSave={handleSaveEdit}
                />
            )}
        </>
    );
}
