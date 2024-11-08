'use client';

import style from './page.module.css';
import { MdWash, MdPsychology, MdEdit, MdPlayArrow } from "react-icons/md";
import { IconContext } from 'react-icons';
import { useRouter } from 'next/navigation';
import MenuLateral from '@/components/menuLateral/page';
import { useEffect, useState } from 'react';
import ModalEdit from './ModalEdit'; // Certifique-se de que o caminho está correto

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
    const [modalOpen, setModalOpen] = useState(false); // Estado para controlar a abertura da modal
    const [eventoEditando, setEventoEditando] = useState(null); // Armazena o evento sendo editado

    // Função para buscar os eventos
    const fetchEventos = async () => {
        try {
            const response = await fetch('http://localhost:3333/Eventos');
            if (!response.ok) {
                throw new Error(`Erro ${response.status}: Não foi possível carregar os eventos.`);
            }
            const data = await response.json();
            console.log("Dados recebidos da API:", data);

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

    // Função para abrir o modal de edição
    const handleEdit = (evento) => {
        console.log("Editando evento: ", evento); // Adicionando log de depuração
        setEventoEditando(evento);  // Define o evento a ser editado
        setModalOpen(true);          // Abre a modal
    };

    const handleSaveEdit = async (eventoEditado) => {
        try {
            // Verifica se a data de início é válida
            const dataEventoInicio = new Date(eventoEditado.evento_data_inicio);
            if (isNaN(dataEventoInicio.getTime())) {
                alert("Data de início inválida!");
                return;
            }
    
            // Extrai a hora e minuto de 'evento_hora' e combina com a data de início
            const [hora, minuto] = eventoEditado.evento_hora.split(':');
            if (!hora || !minuto) {
                alert("Hora de início inválida!");
                return;
            }
            dataEventoInicio.setHours(hora, minuto, 0, 0); // Ajusta a hora e minuto para a data
    
            // Converte a data e hora para o formato ISO 8601 (UTC)
            const eventoDataInicioISO = dataEventoInicio.toISOString(); // Exemplo: "2024-11-08T20:20:00.000Z"
    
            // Cria um novo objeto com a data de início no formato ISO
            const eventoEditadoComData = {
                ...eventoEditado,
                evento_data_inicio: eventoDataInicioISO
            };
    
            // Agora enviamos a requisição PATCH
            const response = await fetch(`http://localhost:3333/Eventos/${eventoEditadoComData.evento_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventoEditadoComData),
            });
    
            if (!response.ok) {
                throw new Error(`Erro ao salvar evento: ${response.status}`);
            }
    
            // Atualiza o evento localmente no estado
            setEventos((prevEventos) =>
                prevEventos.map((evento) =>
                    evento.evento_id === eventoEditadoComData.evento_id ? eventoEditadoComData : evento
                )
            );
    
            setModalOpen(false); // Fecha a modal após salvar
        } catch (error) {
            console.error("Erro ao salvar evento:", error);
        }
    };
    
    

    // Função para iniciar o evento
    const handleStart = (evento) => {
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

    useEffect(() => {
        fetchEventos();
    }, [mesAnoFiltro]); // Atualizar os eventos ao mudar o filtro

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

            {/* Modal de Edição */}
            {modalOpen && eventoEditando && (
                <ModalEdit
                    evento={eventoEditando}
                    onClose={() => {
                        console.log("Fechando modal"); // Log de depuração
                        setModalOpen(false);
                    }}
                    onSave={(eventoEditado) => {
                        console.log("Salvando evento editado: ", eventoEditado); // Log de depuração
                        handleSaveEdit(eventoEditado);
                    }}
                />
            )}
        </>
    );
}
