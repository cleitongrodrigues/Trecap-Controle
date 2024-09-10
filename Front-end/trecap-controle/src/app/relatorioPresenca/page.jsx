"use client";

import { useEffect, useState } from "react";
import { jsPDF } from "jspdf"; // Importa jsPDF
import styles from "./page.module.css";
import CabecalhoLogado from "@/CabecalhoLogado/page";

export default function RelatorioPresenca() {
  const [participantesPresentes, setParticipantesPresentes] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Recuperar os participantes presentes do localStorage
      const presentes = JSON.parse(localStorage.getItem('participantesPresentes')) || [];
      const presentesArray = Object.entries(presentes).map(([nome, horario]) => ({
        nome,
        horario
      }));
      setParticipantesPresentes(presentesArray);

      // Verifique se os participantes estão sendo carregados corretamente
      console.log('Participantes presentes carregados:', presentesArray);
    }
  }, []);

  // Função para imprimir o relatório
  const imprimirRelatorio = () => {
    window.print(); // Abre a caixa de diálogo de impressão do navegador
  };

  // Função para salvar o relatório como PDF
  const salvarRelatorioPDF = () => {
    const doc = new jsPDF();

    // Adicionar título
    doc.text("Relatório de Presença", 10, 10);

    // Adicionar lista de participantes presentes no PDF
    participantesPresentes.forEach((participante, index) => {
      doc.text(`${index + 1}. ${participante.nome} - Chegada: ${participante.horario}`, 10, 20 + index * 10);
    });

    // Salvar o PDF
    doc.save("relatorio-presenca.pdf");
  };

  return (
    <>
      <CabecalhoLogado />

      <div className={styles.Header}>
        <div className={styles.relatorio}>
          <h1>RELATÓRIO DE PRESENÇA</h1>

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
