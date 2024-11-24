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
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 12;
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

  const mudarPagina = (novaPagina) => {
    setPaginaAtual(novaPagina);
  };

  // Calcular os participantes a serem exibidos na página atual
  const indiceUltimoParticipante = paginaAtual * itensPorPagina;
  const indicePrimeiroParticipante = indiceUltimoParticipante - itensPorPagina;
  const participantesPaginaAtual = participantesSelecionados.slice(indicePrimeiroParticipante, indiceUltimoParticipante);
  

  return (
    <>
      <MenuLateral />
      <div className={styles.layout}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1>{eventoSelecionado}</h1>
            <div className={styles.cadastro}>              
              <h2>Antes de iniciar, revise os participantes selecionados.</h2>
              <br></br>

              {loading ? (
                <p>Carregando participantes...</p>
              ) : (
                <ul className={styles.listaParticipantes}>
                  {participantesPaginaAtual.length > 0 ? (
                    participantesPaginaAtual.map((participante, index) => (
                      <li key={index} className={styles.participanteItem}>
                        <span className={styles.participanteNome}>{participante.nome}</span> {/* Exibe o nome do participante */}
                      </li>
                    ))
                  ) : (
                    <p>Nenhum participante selecionado.</p>
                  )}
                </ul>
              )}
            </div>

            <div className={styles.paginacao}>
            <div className={styles.numerosPagina}>
              {Array.from({ length: Math.ceil(participantesSelecionados.length / itensPorPagina) }, (_, index) => (
                <button
                  key={index}
                  onClick={() => mudarPagina(index + 1)}
                  className={paginaAtual === index + 1 ? styles.pagina : styles.pagina}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <div>
              <button className={styles.botaoCadastro} onClick={iniciarChamada}>
                Iniciar Chamada para Evento
              </button>
              <button className={styles.botaoCadastro} onClick={() => router.back()}>
                Retornar à seleção de participantes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
