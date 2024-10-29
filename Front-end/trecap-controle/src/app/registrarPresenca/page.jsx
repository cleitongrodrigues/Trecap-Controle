"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import MenuLateral from '@/components/menuLateral/page';

export default function RegistrarPresenca() {
  const [participantesSelecionados, setParticipantesSelecionados] = useState([]);
  const [participantesPresentes, setParticipantesPresentes] = useState({});
  const [eventoSelecionado, setEventoSelecionado] = useState(""); // Adicionado estado para o evento
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const selecionados = JSON.parse(localStorage.getItem('participantesSelecionados')) || [];
      setParticipantesSelecionados(selecionados);

      // Recupera o nome do evento do localStorage
      const evento = localStorage.getItem('eventoSelecionado');
      setEventoSelecionado(evento || "Nome do Evento Não Encontrado"); // Define um nome padrão caso não encontre
    }
  }, []);

  const registrarPresenca = (nome, isChecked) => {
    const agora = new Date(); // Obtém a data atual
    const formattedDate = agora.toISOString().slice(0, 19).replace('T', ' '); // Formata para 'YYYY-MM-DD HH:MM:SS'

    setParticipantesPresentes((prev) => {
      const novosPresentes = { ...prev };

      if (isChecked) {
        novosPresentes[nome] = formattedDate; // Usa a data formatada
      } else {
        delete novosPresentes[nome];
      }

      localStorage.setItem('participantesPresentes', JSON.stringify(novosPresentes));
      return novosPresentes;
    });
  };

  const salvarPresenca = async () => {
    console.log("Tentando salvar presença...");

    const dadosPresenca = Object.entries(participantesPresentes).map(([nome, hora]) => ({
      registros_presenca: 1,
      registros_hora_entrada: hora,
      registros_hora_saida: null, // Lógica para hora de saída pode ser adicionada
      evento_id: 123, // Substitua pelo evento real
      colaborador_id: nome // Supondo que o nome é o ID do colaborador
    }));

    console.log("Dados a serem enviados:", dadosPresenca);

    for (const dado of dadosPresenca) {
      try {
        const response = await fetch('http://localhost:3333/registro', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dado),
        });

        if (!response.ok) {
          throw new Error('Erro ao registrar presença');
        }

        const data = await response.json();
        console.log('Registros de presença salvos com sucesso:', data);
      } catch (error) {
        console.error('Erro ao salvar a presença:', error);
        alert("Ocorreu um erro ao salvar a presença: " + error.message);
      }
    }

    // Redirecionar após salvar todos os registros
    router.push('/relatorioPresenca');
  };

  return (
    <>
      <MenuLateral />
      <div className={styles.layout}>
        <div className={styles.Header}>
          <div className={styles.checkin}>
            <h1>{eventoSelecionado}</h1> {/* Exibe o nome do evento */}
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
