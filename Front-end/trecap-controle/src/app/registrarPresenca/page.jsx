"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import MenuLateral from '@/components/menuLateral/page';

export default function RegistrarPresenca() {
  const [participantesSelecionados, setParticipantesSelecionados] = useState([]);
  const [participantesPresentes, setParticipantesPresentes] = useState({});
  const [eventoSelecionado, setEventoSelecionado] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const selecionados = localStorage.getItem('participantesSelecionados');
      setParticipantesSelecionados(selecionados ? JSON.parse(selecionados) : []);
      
      const evento = localStorage.getItem('eventoSelecionado');
      setEventoSelecionado(evento || "Nome do Evento Não Encontrado");
    }
  }, []);

  const registrarPresenca = (nome, isChecked) => {
    console.log(`Participante: ${nome}, Checked: ${isChecked}`); // Debug
    const agora = new Date();
    
    // Formatar a data e hora no seu horário local
    const formattedDate = agora.toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo', // Defina o fuso horário correto
    });

    setParticipantesPresentes((prev) => {
      const novosPresentes = { ...prev };

      if (isChecked) {
        novosPresentes[nome] = formattedDate;
      } else {
        delete novosPresentes[nome];
      }

      localStorage.setItem('participantesPresentes', JSON.stringify(novosPresentes));
      return novosPresentes;
    });
  };

  const salvarPresenca = async () => {
    const dadosPresenca = Object.entries(participantesPresentes).map(([nome, hora]) => {
      // Aqui você deve garantir que o ID do colaborador seja obtido corretamente
      const colaboradorId = nome; // Ajuste isso para pegar o ID correto

      return {
        registros_presenca: 1,
        registros_hora_entrada: hora,
        registros_hora_saida: null,
        evento_id: 1, // Substitua pelo evento real
        colaborador_id: colaboradorId // Aqui você deve garantir que o ID está correto
      };
    });

    if (dadosPresenca.length === 0) {
      alert("Nenhum participante presente selecionado.");
      return; // Evita enviar se não houver dados
    }

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
          const errorData = await response.json();
          throw new Error(`Erro ${response.status}: ${errorData.message || 'Erro ao registrar presença'}`);
        }

        const data = await response.json();
        console.log('Registros de presença salvos com sucesso:', data);
      } catch (error) {
        console.error('Erro ao salvar a presença:', error);
        // alert("Ocorreu um erro ao salvar a presença: " + error.message);
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
            <h1>{eventoSelecionado}</h1>
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
