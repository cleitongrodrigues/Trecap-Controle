"use client";

import { useEffect, useState } from "react";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import styles from "./page.module.css";
import MenuLateral from "@/components/menuLateral/page";

export default function RelatorioPresenca() {
  const [participantesPresentes, setParticipantesPresentes] = useState([]);
  const [curso, setCurso] = useState("");
  const [eventoSelecionado, setEventoSelecionado] = useState("");
  const [dataEvento, setDataEvento] = useState("");
  const [horarioEvento, setHorarioEvento] = useState("");
  const [horarioInicioEvento, setHorarioInicioEvento] = useState(""); // Novo estado para horário de início

  useEffect(() => {
    const fetchEventoData = async () => {
      const eventoId = 123; // Substitua pelo ID do evento selecionado

      try {
        const response = await fetch(`http://localhost:3333/evento/${eventoId}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar os dados do evento.');
        }
        const eventoData = await response.json();
        setDataEvento(eventoData.data); // Supondo que o campo se chama 'data'
        setHorarioEvento(eventoData.horario); // Supondo que o campo se chama 'horario'
      } catch (error) {
        console.error('Erro ao buscar os dados do evento:', error);
      }
    };

    if (typeof window !== 'undefined') {
      // Recuperar os participantes presentes do localStorage
      const presentes = JSON.parse(localStorage.getItem('participantesPresentes')) || {};
      const presentesArray = Object.entries(presentes).map(([nome, horario]) => ({
        nome,
        horario
      }));

      // Ordenar os participantes pela ordem de chegada (horário)
      const presentesOrdenados = presentesArray.sort((a, b) => new Date(a.horario) - new Date(b.horario));
      setParticipantesPresentes(presentesOrdenados);

      // Recuperar o nome do evento do localStorage
      const evento = localStorage.getItem('eventoSelecionado');
      setEventoSelecionado(evento || "Nome do Evento Não Encontrado");

      // Buscar dados do evento
      fetchEventoData();

      // Recuperar o horário de início do evento do localStorage
      const horarioInicio = localStorage.getItem('horarioInicioEvento');
      setHorarioInicioEvento(horarioInicio || "Horário de Início Não Encontrado");
    }
  }, []);

  const formatarDataHora = (dataHoraString) => {
    const dataHora = new Date(dataHoraString);
    const dia = String(dataHora.getDate()).padStart(2, '0');
    const mes = String(dataHora.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
    const ano = dataHora.getFullYear();
    const horas = String(dataHora.getHours()).padStart(2, '0');
    const minutos = String(dataHora.getMinutes()).padStart(2, '0');

    return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
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

    // Adicionar título
    doc.text(title, textX, 10);

    // Adicionar informações do curso e evento
    const cursoWidth = doc.getTextWidth(curso);
    const cursoX = (pageWidth - cursoWidth) / 2; 
    doc.text(curso, cursoX, 20);

    const eventoWidth = doc.getTextWidth(eventoSelecionado);
    const eventoX = (pageWidth - eventoWidth) / 2; 
    doc.text(eventoSelecionado, eventoX, 30);

    // Adicionar data e horário de início do evento
    const horarioFormatado = formatarDataHora(horarioInicioEvento); // Formatar o horário
    const inicioWidth = doc.getTextWidth(`Horário de Início: ${horarioFormatado}`);
    const inicioX = (pageWidth - inicioWidth) / 2; 
    doc.text(`Horário de Início: ${horarioFormatado}`, inicioX, 50);

    // Adicionar tabela de participantes
    doc.autoTable({
      head: [['Nome', 'Horário de Chegada']],
      body: participantesPresentes.map(participante => [participante.nome, participante.horario]),
      startY: 60,
      theme: 'striped',
      headStyles: { fillColor: [74, 20, 140] },
      styles: { halign: 'center' },
    });

    // Adicionar informações adicionais
    const agora = new Date();
    const dataGeracao = `Data e Hora de Geração: ${agora.toLocaleString('pt-BR')}`;
    const metodoGeracao = 'Relatório gerado usando o sistema de gestão de presença. Trecap';
    doc.setFontSize(8);

    // Posição do rodapé
    doc.text(dataGeracao, 10, doc.internal.pageSize.height - 20);
    doc.text(metodoGeracao, 10, doc.internal.pageSize.height - 15);

    // Assinatura digital
    const assinatura = 'Assinado digitalmente por: Sistema de Gestão de Presença Trecap';
    doc.setFontSize(8);
    doc.text(assinatura, 10, doc.internal.pageSize.height - 10);

    // Salvar o PDF
    doc.save("relatorio-presenca.pdf");
  };

  return (
    <>
      <MenuLateral />
      <div className={styles.Header}>
        <div className={styles.relatorio}>
          <h1>RELATÓRIO DE PRESENÇA</h1>
          <h3>{eventoSelecionado}</h3>

          <div className={styles.cadastro}>
            <h2>Participantes Presentes</h2>
            <div className={styles.listaParticipantes}>
              <ul className={styles.lista}>
                {participantesPresentes.length > 0 ? (
                  participantesPresentes.map((participante, index) => (
                    <li key={index} className={styles.participanteItem}>
                      <label>
                        {participante.nome} - Chegada: {participante.horario}
                      </label>
                    </li>
                  ))
                ) : (
                  <p>Nenhum participante presente.</p>
                )}
              </ul>
            </div>
          </div>

          {/* Botão para imprimir o relatório */}
          <button className={styles.botaoImprimir} onClick={imprimirRelatorio}>
            Imprimir Relatório
          </button>

          {/* Botão para salvar o relatório em PDF */}
          <button className={styles.botaoImprimir} onClick={salvarRelatorioPDF}>
            Salvar Relatório
          </button>
        </div>
      </div>
    </>
  );
}
