"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css"; // Adapte o caminho conforme necessário
import MenuLateral from "@/components/menuLateral/page";

export default function ConsultaPresenca() {
  const [eventos, setEventos] = useState([]); // Estado para armazenar eventos
  const [eventoId, setEventoId] = useState(""); // ID do evento a ser consultado
  const [participantes, setParticipantes] = useState([]);
  const [participanteNome, setParticipanteNome] = useState("");
  const [presente, setPresente] = useState(null);

  // Função para buscar eventos iniciados
  const buscarEventos = async () => {
    try {
      const response = await fetch(`http://localhost:3333/eventos/iniciados`);
      if (!response.ok) {
        throw new Error("Erro ao buscar eventos.");
      }
      const data = await response.json();
      console.log("Eventos encontrados:", data); // Log para verificar a resposta
      setEventos(data); // Supondo que os dados venham como um array
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    }
  };

  // Função para buscar participantes do evento selecionado
  const buscarParticipantes = async () => {
    if (!eventoId) return; // Verifica se o evento foi selecionado
    try {
      const response = await fetch(`http://localhost:3333/evento/${eventoId}/participantes`);
      if (!response.ok) {
        throw new Error('Erro ao buscar participantes.');
      }
      const data = await response.json();
      setParticipantes(data); // Supondo que os dados venham como um array
    } catch (error) {
      console.error('Erro ao buscar participantes:', error);
    }
  };

  const verificarPresenca = () => {
    const participante = participantes.find(p => p.nome === participanteNome);
    setPresente(participante ? true : false);
  };

  useEffect(() => {
    buscarEventos(); // Busca eventos quando o componente é montado
  }, []);

  // Use este useEffect para buscar participantes quando o eventoId muda
  useEffect(() => {
    if (eventoId) {
      buscarParticipantes(); // Busca participantes somente se um evento estiver selecionado
    } else {
      setParticipantes([]); // Limpa os participantes se nenhum evento estiver selecionado
    }
  }, [eventoId]);

  return (
    <>
      <MenuLateral />
      <div className={styles.container}>
        <h1>Consulta de Presença</h1>

        <div>
          <label htmlFor="eventoId">Selecionar Evento:</label>
          <select
            id="eventoId"
            value={eventoId}
            onChange={e => setEventoId(e.target.value)}
          >
            <option value="">-- Selecione um evento --</option>
            {eventos.map(evento => (
              <option key={evento.id} value={evento.id}>
                {evento.nome} - {evento.data} {evento.hora}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="participanteNome">Nome do Participante:</label>
          <input
            type="text"
            id="participanteNome"
            value={participanteNome}
            onChange={e => setParticipanteNome(e.target.value)}
          />
          <button onClick={verificarPresenca}>Verificar Presença</button>
        </div>

        {presente !== null && (
          <p>{participanteNome} está {presente ? 'presente' : 'ausente'} no evento.</p>
        )}

        <h2>Participantes Presentes:</h2>
        <ul>
          {participantes.map((participante, index) => (
            <li key={index}>{participante.nome}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
