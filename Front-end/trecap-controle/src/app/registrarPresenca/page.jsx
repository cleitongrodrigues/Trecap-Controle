"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import styles from "./page.module.css";
import MenuLateral from '@/components/menuLateral/page';
import axios from "axios";
import Swal from "sweetalert2";

export default function RegistrarPresenca() {
  const [participantesSelecionados, setParticipantesSelecionados] = useState([]);
  const [participantesPresentes, setParticipantesPresentes] = useState({});
  const [eventoSelecionado, setEventoSelecionado] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 14;
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
      Swal.fire({
        title: 'Sem participantes Presentes!',
        text: 'O evento necessita de participantes presentes para ser registrado.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
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

      // Exibir alerta de sucesso
      Swal.fire({
        title: 'Sucesso!',
        text: 'Presenças registradas com sucesso.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        // Redirecionar para a página de relatório de presença
        router.push('/relatorioPresenca');
      });
    } catch (error) {
      console.error('Erro ao salvar registros de presença:', error);
      // Exibir alerta de erro
      Swal.fire({
        title: 'Erro!',
        text: 'Ocorreu um erro ao registrar as presenças.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const totalParticipantes = participantesSelecionados.length;
  const totalPresentes = Object.keys(participantesPresentes).length;
  const totalAusentes = totalParticipantes - totalPresentes;
  const porcentagemPresentes = ((totalPresentes / totalParticipantes) * 100).toFixed(2);

  const indiceUltimoParticipante = paginaAtual * itensPorPagina;
  const indicePrimeiroParticipante = indiceUltimoParticipante - itensPorPagina;
  const participantesPaginaAtual = participantesSelecionados.slice(indicePrimeiroParticipante, indiceUltimoParticipante);
  const numeroPaginas = Math.ceil(totalParticipantes / itensPorPagina);

  const mudarPagina = (novaPagina) => {
    setPaginaAtual(novaPagina);
  };

  return (
    <>
      <MenuLateral />
      <div className={styles.layout}>
        <div className={styles.container}>
          <div className={styles.header}>
          <h1>{eventoSelecionado}</h1>
            <div className={styles.cadastro}>
              <h2>REGISTRO DE PRESENÇA</h2>

              <div className={styles.listaParticipantes}>
                <h3>Selecione os participantes presentes:</h3>
                <br></br>
                <ul className={styles.lista}>
                  {participantesPaginaAtual.length > 0 ? (
                    participantesPaginaAtual.map((participante) => (
                      <li key={participante.id} className={styles.participanteItem}>
                        <label>
                          <input
                            type="checkbox"
                            checked={participantesPresentes[participante.id] !== undefined}
                            onChange={(e) => registrarPresenca(participante.id, participante.nome, e.target.checked)}
                          />
                          {participante.nome}
                          {participantesPresentes[participante.id] ? (
                            <span className={styles.horario}>
                              (Presente: {dayjs(participantesPresentes[participante.id]?.hora).format("DD/MM/YYYY HH:mm")})
                            </span>
                          ) : (
                            <span className={styles.ausente}> (Ausente) </span>
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
            {numeroPaginas > 1 && (
              <div className={styles.paginacao}>
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
            )}

            <button className={styles.botaoRegistro} onClick={salvarPresenca}>
              Registrar presenças
            </button>
          </div>
        </div>
        <div className={styles.infoBox}>
          <h2>CONTADOR</h2>
          <p className={styles.total}>Total de Participantes: {totalParticipantes}</p>          
          <p className={styles.ausentes}>Ausentes: {totalAusentes}</p>
          <p className={styles.presentes}>Presentes: {totalPresentes}</p>
          <p className={styles.porcentagem}>Percentual: {porcentagemPresentes}%</p>
        </div>
      </div>
    </>
  );
}
