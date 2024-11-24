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
        setHorarioEvento(evento.evento_hora);
      } catch (error) {
        console.error("Erro ao buscar nome do evento:", error);
      }
    }


    const fetchEventoData = async () => {
      try {
        const eventoId = localStorage.getItem("eventoSelecionado");
        const response = await axios.patch(`http://localhost:3333/evento/${eventoId}`);
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados do evento.");
        }

        const eventoData = response.data.dados[0];
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

  const totalParticipantes = JSON.parse(localStorage.getItem('participantesSelecionados')).length;
  const totalPresentes = participantesPresentes.length;
  const totalAusentes = totalParticipantes - totalPresentes;
  const porcentagemPresentes = ((totalPresentes / totalParticipantes) * 100).toFixed(2);

  const salvarRelatorioPDF = async (evento) => {
    try {
      // Buscar os registros de presença para o evento
      const response = await axios.get(`http://localhost:3333/registros/${evento.evento_id}`);
      if (response.status !== 200) {
        throw new Error("Erro ao buscar participantes");
      }
      const participantes = response.data.dados;
      const eventos = response.data.dados[0];


      //FORMATA A DATA PARA EXIBIR
      const dataEventoFormatada = dayjs(eventos.evento_data_inicio, "YYYY/MM/DD").format("DD/MM/YYYY");

      // Criar o PDF com os dados de presença
      const doc = new jsPDF();



      doc.setFontSize(18);
      doc.text("Relatório de Presença", 14, 22);
      doc.setFontSize(12);

      // Informações sobre o evento
      doc.text(`Evento: ${evento.evento_nome}`, 14, 32);
      doc.text(`Data: ${dataEventoFormatada}`, 14, 40);
      doc.text(`Horário: ${evento.evento_hora.slice(0, 5)}`, 14, 48);


      // Adiciona uma linha separadora antes da tabela
      doc.setLineWidth(0.5);
      doc.line(14, 53, 200, 53);

      // Tabelas com os dados dos participantes
      const colunas = ["Nome", "Setor", "Data de Chegada", "Hora de Chegada"];
      const linhas = participantes.map((p) => [
        p.colaborador_nome,
        p.setor_nome || "Desconhecido",
        new Date(p.registros_hora_entrada).toLocaleDateString('pt-BR'),
        new Date(p.registros_hora_entrada).toLocaleTimeString('pt-BR')
      ]);

      // Definindo o início da tabela
      doc.autoTable({
        head: [colunas],
        body: linhas,
        startY: 60,
        theme: 'grid', // Usar o tema de grade para a tabela
        margin: { horizontal: 14 },
        theme: 'striped',
        headStyles: { fillColor: [74, 20, 140] },
        styles: { halign: 'center' },
      });

      // rodapé
      const agora = new Date();
      const dataGeracao = `Data e Hora de Geração: ${agora.toLocaleString("pt-BR")}`;
      const metodoGeracao = "Relatório gerado usando o sistema de gestão de presença. Trecap";
      doc.setFontSize(8);

      doc.text(dataGeracao, 10, doc.internal.pageSize.height - 10);
      doc.text(metodoGeracao, 10, doc.internal.pageSize.height - 5);

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
          {/* <h1>RELATÓRIO DE PRESENÇA</h1> */}
          <h1>{eventoSelecionado}</h1>
          <br></br>
          <h1>Evento concluído com sucesso!</h1>
          <h2>Informações do Evento</h2>
          <br></br>
          {/* <div className={styles.cadastro}>
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
          </div> */}

          <div className={styles.infoBox}>
            <h2>CONTADOR</h2>
            <p className={styles.total}>Total de Participantes: {totalParticipantes}</p>
            <p className={styles.ausentes}>Ausentes: {totalAusentes}</p>
            <p className={styles.presentes}>Presentes: {totalPresentes}</p>
            <p className={styles.porcentagem}>Percentual: {porcentagemPresentes}%</p>
          </div>

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
