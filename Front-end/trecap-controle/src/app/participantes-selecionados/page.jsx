"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import MenuLateral from "@/components/menuLateral/page";
import axios from "axios";

export default function ParticipantesSelecionados() {
  const [participantesSelecionados, setParticipantesSelecionados] = useState([]);
  const [eventoSelecionado, setEventoSelecionado] = useState("");
  const [loading, setLoading] = useState(true);
  const [horarioInicioEvento, setHorarioInicioEvento] = useState(null); // Estado para armazenar o horário de início
  const router = useRouter();

  useEffect(() => {
    async function getEventoNome(eventoSelecionado) {
      const response = await axios.get(`http://localhost:3333/Eventos/${eventoSelecionado}`);
      const evento = response.data.dados[0];
      setEventoSelecionado(evento.evento_nome);
    }

    if (typeof window !== 'undefined') {
      try {
        const selecionados = JSON.parse(localStorage.getItem('participantesSelecionados')) || [];
        setParticipantesSelecionados(selecionados);

        // Recupera o nome do evento do localStorage
        const evento = localStorage.getItem('eventoSelecionado');
        getEventoNome(evento);
      } catch (error) {
        console.error('Erro ao carregar participantes do localStorage:', error);
        setParticipantesSelecionados([]);
      } finally {
        setLoading(false);
      }
    }
  }, []);

  const iniciarChamada = () => {
    const agora = new Date();
    setHorarioInicioEvento(agora); // Armazena a hora de início do evento
    localStorage.setItem('horarioInicioEvento', agora.toISOString()); // Armazena como string ISO
    console.log(`Evento iniciado em: ${agora.toLocaleString('pt-BR')}`); // Exibe no console

    // Redireciona para a página de registrar presença
    router.push('/registrarPresenca');
  };

  return (
    <>
      <MenuLateral />
      <div className={styles.layout}>
        <div className={styles.Header}>
          <h1>{eventoSelecionado}</h1>
          <div className={styles.checkin}>
            <div className={styles.cadastro}>
              <h2>Participantes Selecionados</h2>

              {loading ? (
                <p>Carregando participantes...</p>
              ) : (
                <ul className={styles.listaParticipantes}>
                  {participantesSelecionados.length > 0 ? (
                    participantesSelecionados.map((participante, index) => (
                      <li key={index} className={styles.participanteItem}>
                        <label>{participante.nome}</label> {/* Exibe o nome do participante */}
                      </li>
                    ))
                  ) : (
                    <p>Nenhum participante selecionado.</p>
                  )}
                </ul>
              )}
            </div>

            <div className={styles.botaoContainer}>
              <button className={styles.botaoCadastro} onClick={iniciarChamada}>
                Iniciar Chamada para Evento
              </button>
              <button className={styles.botaoCadastro} onClick={router.back}>
                Retornar à seleção de participantes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
