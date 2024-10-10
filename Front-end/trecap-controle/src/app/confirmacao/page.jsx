"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import CabecalhoLogado from "@/CabecalhoLogado/page";

export default function CheckinEvento() {
  const router = useRouter();
  const [participantesSelecionados, setParticipantesSelecionados] = useState([]);
  const [curso, setCurso] = useState("TREINAMENTO SOBRE HIGIENE NO TRABALHO"); // Nome do curso

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

  // Função para salvar a lista de participantes e redirecionar para a página de participantes salvos
  const salvarParticipantes = () => {
    // Salvar os participantes selecionados no localStorage com uma chave específica para os finalizados
    localStorage.setItem('participantesSelecionados', JSON.stringify(participantesSelecionados));

    // Redirecionar para a página que mostrará os participantes salvos
    router.push('/participantes-selecionados');
  };

  return (
    <>
      <CabecalhoLogado />

      <div className={styles.Header}>
        <div className={styles.checkin}>
          <h1>{curso}</h1> {/* Nome do curso na página de confirmação */}

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
        </div>

        {/* Botão "Salvar" para registrar os participantes */}
        <div className={styles.botaoContainer}>
          <button className={styles.botaoCadastro} onClick={salvarParticipantes}>
            Salvar
          </button>
          <button className={styles.botaoCadastro} onClick={router.back}>
            Voltar
          </button>
        </div>
      </div>
    </>
  );
}
