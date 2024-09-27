"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import CabecalhoLogado from "@/CabecalhoLogado/page";
import MenuLateral from '@/components/menuLateral/page';

export default function RegistrarPresenca() {
  const [participantesSelecionados, setParticipantesSelecionados] = useState([]);
  const [participantesPresentes, setParticipantesPresentes] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const selecionados = JSON.parse(localStorage.getItem('participantesSelecionados')) || [];
      setParticipantesSelecionados(selecionados);
    }
  }, []);

  const registrarPresenca = (nome, isChecked) => {
    const agora = new Date().toLocaleString(); // Obtém a data e hora atual

    setParticipantesPresentes((prev) => {
      const novosPresentes = { ...prev };

      if (isChecked) {
        // Adicionar o participante à lista com a hora atual
        novosPresentes[nome] = agora;
      } else {
        // Remover o participante da lista
        delete novosPresentes[nome];
      }

      // Atualizar o localStorage com os participantes presentes
      localStorage.setItem('participantesPresentes', JSON.stringify(novosPresentes));

      return novosPresentes;
    });
  };

  const salvarPresenca = () => {
    router.push('/relatorioPresenca');
  };

  return (
    <>
    
      <MenuLateral />
    <div className={styles.layout}>
      

      <div className={styles.Header}>
        <div className={styles.checkin}>
          <h1>TREINAMENTO SOBRE HIGIENE NO TRABALHO</h1>

          <div className={styles.cadastro}>
            <h2>REGISTRO DE PRESENÇA</h2>

            <div className={styles.listaParticipantes}>
              <h3>Selecione os participantes presentes:</h3>
              <ul className={styles.lista}>
                {participantesSelecionados.length > 0 ? (
                  participantesSelecionados.map((participante, index) => (
                    <li key={index} className={styles.participanteItem}>
                      <label>
                        <input
                          type="checkbox"
                          checked={participantesPresentes[participante] !== undefined}
                          onChange={(e) => registrarPresenca(participante, e.target.checked)}
                        />
                        {participante}
                        {participantesPresentes[participante] && (
                          <span className={styles.horario}>
                            (Chegada: {participantesPresentes[participante]})
                          </span>
                        )}
                      </label>
                    </li>
                  ))
                ) : (
                  <p>Nenhum participante selecionado.</p>
                )}
              </ul>
            </div>
          </div>

          <button className={styles.botaoCadastro} onClick={salvarPresenca}>
            Salvar
          </button>
          <button className={styles.botaoCadastro} onClick={router.back}>
            Voltar
          </button>
        </div>
      </div>
      </div>
    </>
  );
}
