"use client";

import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import styles from "./page.module.css";
import MenuLateral from "@/components/menuLateral/page";
import dayjs from "dayjs";
import axios from "axios";

export default function RelatorioPresenca() {
  const [participantesPresentes, setParticipantesPresentes] = useState([]);
  const [curso, setCurso] = useState("");
  const [eventoSelecionado, setEventoSelecionado] = useState("");
  const [dataEvento, setDataEvento] = useState("");
  const [horarioEvento, setHorarioEvento] = useState("");
  const [horarioInicioEvento, setHorarioInicioEvento] = useState("");

  useEffect(() => {
    async function getEventoNome(eventoId) {
      try {
        const response = await axios.get(`http://localhost:3333/Eventos/${eventoId}`);
        const evento = response.data.dados[0];
        setEventoSelecionado(evento.evento_nome);
      } catch (error) {
        console.error("Erro ao buscar nome do evento:", error);
      }
    }
 

    const fetchEventoData = async () => {
      const eventoId = localStorage.getItem("eventoSelecionado");
      try {
        const response = await fetch(`http://localhost:3333/evento/${eventoId}`);
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados do evento.");
        }
        const eventoData = await response.json();
        setDataEvento(eventoData.data);
        setHorarioEvento(eventoData.evento_hora);
        setHorarioInicioEvento(eventoData.evento_hora || "Horário de Início Não Encontrado");
      } catch (error) {
        console.error("Erro ao buscar os dados do evento:", error);
      }
    };

    if (typeof window !== "undefined") {
      const participantesLocalStorage = JSON.parse(localStorage.getItem("participantesPresentes")) || {};

      const participantesArray = Object.entries(participantesLocalStorage).map(([id, { nome, hora }]) => {
        const dataHora = dayjs(hora, "DD/MM/YYYY HH:mm:ss");
        return { nome, horario: dataHora };
      });

      const participantesOrdenados = participantesArray.sort((a, b) => a.horario - b.horario);
      setParticipantesPresentes(participantesOrdenados);

      const eventoId = localStorage.getItem("eventoSelecionado");
      getEventoNome(eventoId);
      fetchEventoData();
      

      const horarioInicio = localStorage.getItem("horarioInicioEvento");
      setHorarioInicioEvento(horarioInicio || "Horário de Início Não Encontrado");
    }
  }, []);

  const formatarDataHora = (dataHora) => {
    if (!dataHora || !dataHora.isValid()) {
      return "Data Inválida";
    }
    return dataHora.format("DD/MM/YYYY HH:mm");
  };

  const imprimirRelatorio = () => {
    window.print();
  };

  const salvarRelatorioPDF = async (evento) => {
  try {
    const response = await axios.get(`http://localhost:3333/registros/${evento.evento_id}`);
    if (response.status !== 200) {
      throw new Error("Erro ao buscar participantes");
    }
    const eventos  = response.data.dados;
    const participantes = response.data.dados;

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Relatório de Presença", 14, 22);
    
    // Certifique-se de que evento.evento_data_inicio e evento.evento_hora estão no formato correto

   

    const dataEventoFormatada = dayjs(eventos.evento_data_inicio).format("DD/MM/YYYY"); // Formato de data
    const horaEventoFormatada = dayjs(eventos.evento_hora, "HH:mm:ss").format("HH:mm"); // Formato de hora

    doc.setFontSize(12);
    doc.text(`Evento: ${evento.evento_nome}`, 14, 32);
    doc.text(`Data: ${dataEventoFormatada}`, 14, 40);
    doc.text(`Horário: ${horaEventoFormatada}`, 14, 48);

    doc.setLineWidth(0.5);
    doc.line(14, 53, 200, 53);

    const colunas = ["Nome", "Setor", "Data de Chegada", "Hora de Chegada"];
    const linhas = participantes.map((p) => {
      const dataHoraEntrada = new Date(p.registros_hora_entrada);
      return [
        p.colaborador_nome,
        p.setor_nome || "Desconhecido", // Se o setor não for encontrado, coloca "Desconhecido"
        dataHoraEntrada.toLocaleDateString("pt-BR"),
        dataHoraEntrada.toLocaleTimeString("pt-BR"),
      ];
    });

    doc.autoTable({
      head: [colunas],
      body: linhas,
      startY: 60,
      theme: "grid",
      margin: { horizontal: 14 },
      theme: 'striped',
      headStyles: { fillColor: [74, 20, 140] },
      styles: { halign: 'center' },
    });

    doc.save(`Relatorio_Presenca_${evento.evento_nome}.pdf`);
  } catch (error) {
    console.error("Erro ao gerar PDF:", error);
  }
};

  return (
    <>
      <MenuLateral />
      <div className={styles.Header}>
        <div className={styles.relatorio}>
          <h1>RELATÓRIO DE PRESENÇA</h1>
          <h1>{eventoSelecionado}</h1>

          <div className={styles.cadastro}>
            <h2>Participantes Presentes</h2>
            <div className={styles.listaParticipantes}>
              <ul className={styles.lista}>
                {participantesPresentes.length > 0 ? (
                  participantesPresentes.map((participante, index) => (
                    <li key={index} className={styles.participanteItem}>
                      <label>
                        {participante.nome} - Chegada: {formatarDataHora(participante.horario)}
                      </label>
                    </li>
                  ))
                ) : (
                  <p>Nenhum participante presente.</p>
                )}
              </ul>
            </div>
          </div>

          <button className={styles.botaoImprimir} onClick={imprimirRelatorio}>
            Imprimir Relatório
          </button>

          <button
            className={styles.botaoImprimir}
            onClick={() =>
              salvarRelatorioPDF({
                evento_id: localStorage.getItem("eventoSelecionado"),
                evento_nome: eventoSelecionado,
                evento_data_inicio: dataEvento,
                evento_hora: horarioEvento,
              })
            }
          >
            Salvar Relatório
          </button>
        </div>
      </div>
    </>
  );
}
