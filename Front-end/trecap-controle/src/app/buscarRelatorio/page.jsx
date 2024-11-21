'use client';

import style from './page.module.css';
import { useRouter } from 'next/navigation';
import MenuLateral from '@/components/menuLateral/page';
import { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function BuscarRelatorio() {
    const router = useRouter();
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mesAnoFiltro, setMesAnoFiltro] = useState("");
    const [termoBusca, setTermoBusca] = useState("");

    const fetchEventos = async () => {
        try {
            const response = await axios.get('http://localhost:3333/Eventos');
            if (response.status !== 200) {
                throw new Error(`Erro ${response.status}: Não foi possível carregar os eventos.`);
            }

            // Filtra eventos pela data (se fornecido o filtro)
            const eventosFiltrados = response.data.dados.filter(evento => {
                if (!evento.evento_data_inicio || !evento.evento_hora) {
                    console.warn("Evento com data ou hora inválida:", evento);
                    return false;
                }

                const dataEvento = new Date(evento.evento_data_inicio);
                const anoMesEvento = `${dataEvento.getFullYear()}-${String(dataEvento.getMonth() + 1).padStart(2, '0')}`;

                return !mesAnoFiltro || anoMesEvento === mesAnoFiltro;
            });

            // Carregar a presença dos participantes para cada evento
            const eventosComPresenca = await Promise.all(eventosFiltrados.map(async (evento) => {
                const presencaResponse = await axios.get(`http://localhost:3333/registros/${evento.evento_id}`);
                if (presencaResponse.status === 200) {
                    evento.participantes = presencaResponse.data.dados; // Adiciona os participantes ao evento
                }
                return evento;
            }));

            setEventos(eventosComPresenca);
        } catch (error) {
            console.error("Erro ao buscar eventos:", error);
            setError(error.message || 'Erro ao buscar eventos');
        } finally {
            setLoading(false);
        }
    };

    const gerarPDF = (evento) => {
        try {
            const participantes = evento.participantes || [];
            
            // Criar o PDF com os dados de presença
            const doc = new jsPDF();
            doc.setFontSize(18);
            doc.text("Relatório de Presença", 14, 22);
            doc.setFontSize(12);
            doc.text(`Evento: ${evento.evento_nome}`, 14, 32);
            doc.text(`Data: ${new Date(evento.evento_data_inicio).toLocaleDateString('pt-BR')}`, 14, 40);
            doc.text(`Horário: ${evento.evento_hora.slice(0, 5)}`, 14, 48);

            // Adiciona uma linha separadora antes da tabela
            doc.setLineWidth(0.5);
            doc.line(14, 53, 200, 53);  // Linha de 200mm de comprimento

            // Tabelas com os dados dos participantes
            const colunas = ["Nome", "Setor", "Data de Chegada", "Hora de Chegada"];
            const linhas = participantes.map((p) => [
                p.colaborador_nome, // Nome do colaborador
                p.setor_nome || "Desconhecido", // Se o setor for nulo ou indefinido
                new Date(p.registros_hora_entrada).toLocaleDateString('pt-BR'), // Data de Chegada
                new Date(p.registros_hora_entrada).toLocaleTimeString('pt-BR') // Hora de Chegada
            ]);

            // Definindo o início da tabela
            doc.autoTable({
                head: [colunas],
                body: linhas,
                startY: 60,  // Começar a tabela 60mm abaixo do topo
                theme: 'grid', // Usar o tema de grade para a tabela
                margin: { horizontal: 14 },
                theme: 'striped',
                headStyles: { fillColor: [74, 20, 140] },
                styles: { halign: 'center' },
            });

            // rodapé
      const agora = new Date();
      const dataGeracao = `Data e Hora de Geração: ${agora.toLocaleString("pt-BR")}`;
      const metodoGeracao = "Relatório gerado usando o sistema de gestão de presença Trecap";
      doc.setFontSize(8);

      doc.text(dataGeracao, 10, doc.internal.pageSize.height - 10);
      doc.text(metodoGeracao, 10, doc.internal.pageSize.height - 5);

            // Salvar o arquivo PDF gerado
            doc.save(`Relatorio_Presenca_${evento.evento_nome}.pdf`);
        } catch (error) {
            console.error("Erro ao gerar PDF:", error);
        }
    };

    useEffect(() => {
        fetchEventos();
    }, [mesAnoFiltro]);

    if (loading) {
        return <div className={style.loading}>Carregando eventos...</div>;
    }

    if (error) {
        return <div className={style.error}>Erro: {error}</div>;
    }

    const eventosFiltrados = eventos.filter(evento =>
        evento.evento_nome.toLowerCase().includes(termoBusca.toLowerCase())
    );

    return (
        <>
            <MenuLateral />
            <div className={style.container}>
                <h1 className={style.h1}>Eventos</h1>
                <div className={style.searchContainer}>
                    <input
                        type="text"
                        placeholder="Buscar evento"
                        className={style.buscarInput}
                        value={termoBusca}
                        onChange={(e) => setTermoBusca(e.target.value)}
                    />
                    <input
                        type="month"
                        id="mesAnoFiltro"
                        className={style.searchInput}
                        value={mesAnoFiltro}
                        onChange={(e) => setMesAnoFiltro(e.target.value)}
                    />
                    <button className={style.searchButton} onClick={() => setMesAnoFiltro("")}>
                        Limpar Filtro
                    </button>
                </div>

                <div className={style.resultContainer}>
                    {eventosFiltrados.length > 0 ? (
                        <ul className={style.listaRelatorios}>
                            {eventosFiltrados.map((evento, index) => {
                                const dataEvento = (
                                    <p className={style.eventInfo}>
                                        Data: {new Date(evento.evento_data_inicio).toLocaleDateString('pt-BR')}
                                    </p>
                                );
                                const horarioEvento = (
                                    <p className={style.eventInfo}>
                                        Horário de início: {evento.evento_hora.slice(0, 5)}
                                    </p>
                                );

                                return (
                                    <li key={index} className={style.relatorioItem}>
                                        <div>
                                            <h3>{evento.evento_nome}</h3>
                                            {dataEvento}
                                            {horarioEvento}
                                        </div>
                                        <div>
                                            <button
                                                className={style.gerarPDFButton}
                                                onClick={() => gerarPDF(evento)}>
                                                Gerar PDF
                                            </button>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <p>Nenhum evento encontrado</p>
                    )}
                </div>
            </div>
        </>
    );
}
