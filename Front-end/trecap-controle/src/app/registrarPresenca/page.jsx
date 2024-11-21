"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import styles from "./page.module.css";
import MenuLateral from '@/components/menuLateral/page';
import axios from "axios";

export default function RegistrarPresenca() {
  const [participantesSelecionados, setParticipantesSelecionados] = useState([]);
  const [participantesPresentes, setParticipantesPresentes] = useState({});
  const [eventoSelecionado, setEventoSelecionado] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function getEventoNome(eventoSelecionado)
    {
      const response = await axios.get(`http://localhost:3333/Eventos/${eventoSelecionado}`);
      const evento = response.data.dados[0];
      setEventoSelecionado(evento.evento_nome);
    }

    if (typeof window !== 'undefined') {
      const selecionados = localStorage.getItem('participantesSelecionados');
      setParticipantesSelecionados(selecionados ? JSON.parse(selecionados) : []);

      const evento = localStorage.getItem('eventoId');
      getEventoNome(evento)
    }
  }, []);

  const registrarPresenca = (id, nome, isChecked) => {
    console.log(`Participante: ${nome}, ID: ${id}, Checked: ${isChecked}`); // Debug
    const agora = dayjs();

    // Formatar a data e hora no formato desejado
    const formattedDate = agora.format("YYYY-MM-DD HH:mm:ss"); // Formato para salvar no backend
    const formattedDateDisplay = agora.format("DD/MM/YYYY HH:mm"); // Formato para exibir

    // Log para verificar o valor da data formatada
    console.log("Data formatada para o backend:", formattedDate);
    console.log("Data formatada para exibição:", formattedDateDisplay);

    setParticipantesPresentes((prev) => {
      const novosPresentes = { ...prev };

      if (isChecked) {
        novosPresentes[id] = { nome, hora: formattedDate };
      } else {
        delete novosPresentes[id];
      }

      localStorage.setItem('participantesPresentes', JSON.stringify(novosPresentes));
      return novosPresentes;
    });
  };

  const salvarPresenca = async () => {
    const dadosPresenca = Object.entries(participantesPresentes).map(([id, { nome, hora }]) => ({
      registros_presenca: 1,
      registros_hora_entrada: hora,
      registros_hora_saida: null,
      evento_id:  localStorage.getItem('eventoId'), // Substitua pelo ID do evento real
      colaborador_id: id, // ID do colaborador
    }));

    if (dadosPresenca.length === 0) {
      alert("Nenhum participante presente selecionado.");
      return; // Evita enviar se não houver dados
    }

    try {
      const promises = dadosPresenca.map(dado =>
        axios.post('http://localhost:3333/registro', dado)
          .then(response => {
            if (response.status !== 200) {
              throw new Error(`Erro ${response.status}`);
            }
            return response.data;
          })
      );
      await Promise.all(promises);
      console.log('Todos os registros de presença salvos com sucesso');
    } catch (error) {
      console.error('Erro ao salvar a presença:', error);
      // Exiba uma mensagem de erro para o usuário de forma mais amigável
    }

    // Redirecionar após salvar todos os registros
    router.push('/relatorioPresenca');
  };

  return (
    <>
      <MenuLateral />
      <div className={styles.layout}>
        <div className={styles.Header}>
          <h1>{eventoSelecionado}</h1>
          <div className={styles.checkin}>
            <div className={styles.cadastro}>
              <h2>REGISTRO DE PRESENÇA</h2>

              <div className={styles.listaParticipantes}>
                <h3>Selecione os participantes presentes:</h3>
                <ul className={styles.lista}>
                  {participantesSelecionados.length > 0 ? (
                    participantesSelecionados.map((participante) => (
                      <li key={participante.id} className={styles.participanteItem}>
                        <label>
                          <input
                            type="checkbox"
                            checked={participantesPresentes[participante.id] !== undefined}
                            onChange={(e) => registrarPresenca(participante.id, participante.nome, e.target.checked)}
                          />
                          {participante.nome}
                          {participantesPresentes[participante.id] && (
                            <span className={styles.horario}>
                              (Chegada: {dayjs(participantesPresentes[participante.id]?.hora).format("DD/MM/YYYY HH:mm")})
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
              Registrar presenças
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
