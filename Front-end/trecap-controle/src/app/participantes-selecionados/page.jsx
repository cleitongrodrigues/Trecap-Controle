"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import MenuLateral from "@/components/menuLateral/page";
import axios from "axios";
import Swal from "sweetalert2";

export default function ParticipantesSelecionados() {
  const [participantesSelecionados, setParticipantesSelecionados] = useState([]);
  const [eventoSelecionado, setEventoSelecionado] = useState("");
  const [loading, setLoading] = useState(true);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 14;
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

  const totalParticipantes = participantesSelecionados.length;

  // Lógica de paginação
  const indiceUltimoParticipante = paginaAtual * itensPorPagina;
  const indicePrimeiroParticipante = indiceUltimoParticipante - itensPorPagina;
  const participantesPaginaAtual = participantesSelecionados.slice(indicePrimeiroParticipante, indiceUltimoParticipante);
  const numeroPaginas = Math.ceil(totalParticipantes / itensPorPagina);

  const mudarPagina = (novaPagina) => {
    setPaginaAtual(novaPagina);
  };

  const iniciarChamada = () => {
    Swal.fire({
      title: 'Deseja iniciar a chamada para o evento?',
      text: "Essa ação poderá ser revertida posteriormente.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4CAF50',
      cancelButtonColor: 'red',
      confirmButtonText: 'Sim, iniciar!'
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/registrarPresenca');
      }
    });
  };

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

            {numeroPaginas > 1 && (
              <div className={styles.paginacao}>
                <div className={styles.numerosPagina}>
                  {Array.from({ length: numeroPaginas }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => mudarPagina(index + 1)}
                      className={paginaAtual === index + 1 ? styles.paginaAtiva : styles.pagina}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button className={styles.botaoCadastro} onClick={iniciarChamada}>
              Iniciar Chamada para Evento
            </button>
            <button className={styles.botaoRetornar} onClick={() => router.back()}>
              Retornar à seleção de participantes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
