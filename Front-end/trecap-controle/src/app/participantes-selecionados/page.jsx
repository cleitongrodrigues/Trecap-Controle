"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import CabecalhoLogado from "@/CabecalhoLogado/page";
import MenuLateral from "@/components/menuLateral/page";

export default function ParticipantesSelecionados() {
  const [participantesSelecionados, setParticipantesSelecionados] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Garantir que estamos no cliente antes de acessar o localStorage
    if (typeof window !== 'undefined') {
      // Recuperar os participantes selecionados do localStorage
      const selecionados = JSON.parse(localStorage.getItem('participantesSelecionados')) || [];
      setParticipantesSelecionados(selecionados);

      // Verifique se os participantes estão sendo carregados corretamente
      console.log('Participantes selecionados carregados:', selecionados);
    }
  }, []);

  const iniciarChamada = () => {
    router.push('/registrarPresenca');
  };

  return (
    <>
      <CabecalhoLogado />

      <div className={styles.layout}>
        {/* Incluindo o MenuLateral */}
        <MenuLateral />

        <div className={styles.Header}>
          <div className={styles.checkin}>
            <h1>TREINAMENTO SOBRE HIGIENE NO TRABALHO</h1>

            <div className={styles.cadastro}>
              <h2>Participantes Selecionados</h2>
              
              <ul className={styles.listaParticipantes}>
                {participantesSelecionados.length > 0 ? (
                  participantesSelecionados.map((participante, index) => (
                    <li key={index} className={styles.participanteItem}>
                      <label>{participante}</label>
                    </li>
                  ))
                ) : (
                  <p>Nenhum participante selecionado.</p>
                )}
              </ul>
            </div>

            <button className={styles.botaoCadastro} onClick={iniciarChamada}>
              Iniciar Chamada para Evento
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
