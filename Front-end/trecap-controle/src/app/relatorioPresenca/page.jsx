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
    
    async function getEventoNome(eventoSelecionado)
    {
      const response = await axios.get(`http://localhost:3333/Eventos/${eventoSelecionado}`);
      const evento = response.data.dados[0];
      setEventoSelecionado(evento.evento_nome);
    }

    const fetchEventoData = async () => {
      const eventoId = localStorage.getItem('eventoSelecionado');
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
      // Recuperando os participantes do localStorage e associando nome com horário
      const participantesLocalStorage = JSON.parse(localStorage.getItem("participantesPresentes")) || {};
      
      // Transformar o objeto em um array com nome e horário
      const participantesArray = Object.entries(participantesLocalStorage).map(([id, { nome, hora }]) => {
        const dataHora = dayjs(hora, "DD/MM/YYYY HH:mm:ss"); // Ajustando o formato de data/hora
        return { nome, horario: dataHora };
      });

      // Ordenando os participantes pela data/hora de chegada
      const participantesOrdenados = participantesArray.sort((a, b) => a.horario - b.horario);
      setParticipantesPresentes(participantesOrdenados);

      // Definindo o nome do evento
      const evento = localStorage.getItem("eventoSelecionado");
      getEventoNome(evento)

      // Buscando os dados do evento
      fetchEventoData();

      // Recuperando e setando o horário de início do evento
      const horarioInicio = localStorage.getItem("horarioInicioEvento");
      setHorarioInicioEvento(horarioInicio || "Horário de Início Não Encontrado");
    }
  }, []);

  // Função para converter e formatar data/hora para exibição
  const formatarDataHora = (dataHora) => {
    if (!dataHora || !dataHora.isValid()) {
      return "Data Inválida"; // Retorna uma mensagem padrão se a data for inválida
    }
    return dataHora.format("DD/MM/YYYY HH:mm");
  };

  const imprimirRelatorio = () => {
    window.print();
  };

  const salvarRelatorioPDF = () => {
    const doc = new jsPDF();

    const title = "Relatório de Presença";
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(title);
    const textX = (pageWidth - textWidth) / 2;

    doc.text(title, textX, 10);

    const cursoWidth = doc.getTextWidth(curso);
    const cursoX = (pageWidth - cursoWidth) / 2;
    doc.text(curso, cursoX, 20);

    const eventoWidth = doc.getTextWidth(eventoSelecionado.toUpperCase());
    const eventoX = (pageWidth - eventoWidth) / 2;
    doc.text(eventoSelecionado.toUpperCase(), eventoX, 30);

    const horarioFormatado = formatarDataHora(dayjs(horarioInicioEvento, "YYYY-MM-DD HH:mm:ss"));
    const inicioWidth = doc.getTextWidth(`Horário de Início: ${horarioFormatado}`);
    const inicioX = (pageWidth - inicioWidth) / 2;
    doc.text(`Horário de Início: ${horarioFormatado}`, inicioX, 50);

    doc.autoTable({
      head: [["Nome", "Horário de Chegada"]], // Definindo o cabeçalho da tabela
      body: participantesPresentes.map((participante) => [
        participante.nome.toUpperCase(), // Exibindo o nome do colaborador
        formatarDataHora(participante.horario),
      ]),
      startY: 60,
      theme: "striped",
      headStyles: { fillColor: [74, 20, 140] },
      styles: { halign: "center" },
    });

    const agora = new Date();
    const dataGeracao = `Data e Hora de Geração: ${agora.toLocaleString("pt-BR")}`;
    const metodoGeracao = "Relatório gerado usando o sistema de gestão de presença. Trecap";
    doc.setFontSize(8);

    doc.text(dataGeracao, 10, doc.internal.pageSize.height - 20);
    doc.text(metodoGeracao, 10, doc.internal.pageSize.height - 15);

    const assinatura = "Assinado digitalmente por: Sistema de Gestão de Presença Trecap";
    doc.text(assinatura, 10, doc.internal.pageSize.height - 10);

    doc.save("relatorio-presenca.pdf");
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

          <button className={styles.botaoImprimir} onClick={salvarRelatorioPDF}>
            Salvar Relatório
          </button>
        </div>
      </div>
    </>
  );
}
