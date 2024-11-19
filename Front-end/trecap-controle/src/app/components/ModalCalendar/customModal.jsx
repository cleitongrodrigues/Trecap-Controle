import React, { useState } from "react";

export default function CustomModal({ isOpen, onClose, onConfirm }) {
  const [startTime, setStartTime] = useState("00:00"); // Hora de início

  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();

    // Coletando os valores dos campos
    const title = event.target.elements.title.value;
    const professor = event.target.elements.professor.value;
    const description = event.target.elements.description.value;

    // Formatando a hora de início, se necessário (HH:mm:ss)
    const formattedStartTime = `${startTime}:00`;

    // Log para depuração no console
    console.log("Dados enviados:", {
      title,
      professor,
      description,
      startTime: formattedStartTime,
    });

    // Envia os dados para a função onConfirm
    onConfirm({
      title,
      professor,
      description,
      startTime: formattedStartTime, // Enviando a hora formatada
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Adicionar Evento</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Título do evento"
            className="modal-input"
          />
          <input
            type="text"
            name="professor"
            placeholder="Nome do professor"
            className="modal-input"
          />
          <textarea
            name="description"
            placeholder="Descrição do evento"
            className="modal-input"
          />

          {/* Campo para a hora de início */}
          <div className="modal-time-picker">
            <label htmlFor="start-time">Hora de Início:</label>
            <input
              type="time"
              id="start-time"
              name="start-time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="modal-input"
            />
          </div>

          <div className="modal-actions">
            <button type="submit" className="btn-confirm">
              Confirmar
            </button>
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
