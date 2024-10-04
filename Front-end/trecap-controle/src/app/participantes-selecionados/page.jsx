"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import MenuLateral from "@/components/menuLateral/page";

export default function ParticipantesSelecionados() {
  const [participantesSelecionados, setParticipantesSelecionados] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para indicar o carregamento
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const selecionados = JSON.parse(localStorage.getItem('participantesSelecionados')) || [];
        setParticipantesSelecionados(selecionados);
      } catch (error) {
        console.error('Erro ao carregar participantes do localStorage:', error);
        setParticipantesSelecionados([]);
      } finally {
        setLoading(false); // Carregamento completo
      }
    }
  }, []);

  const iniciarChamada = () => {
    router.push('/registrarPresenca');
  };

  return (
    <>
      <MenuLateral />

      <div className={styles.layout}>
        <div className={styles.Header}>
          <div className={styles.checkin}>
            <h1>TREINAMENTO SOBRE HIGIENE NO TRABALHO</h1>

            <div className={styles.cadastro}>
              <h2>Participantes Selecionados</h2>

              {loading ? (
                <p>Carregando participantes...</p>
              ) : (
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
              )}
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
