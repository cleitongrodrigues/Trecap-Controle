"use client";

import { useEffect, useState } from "react";
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

  const imprimirRelatorio = () => {
    window.print(); // Abre a caixa de diálogo de impressão do navegador
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

          <button className={styles.botaoImprimir} onClick={imprimirRelatorio}>
            Imprimir Relatório
          </button>
        </div>
      </div>
    </>
  );
}
