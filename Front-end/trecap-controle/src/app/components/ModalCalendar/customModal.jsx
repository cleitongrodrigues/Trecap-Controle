import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import styles from "./page.module.css"; // Importando o CSS do módulo

export default function CustomModal({ isOpen, onClose, onConfirm }) {
  const [title, setTitle] = useState("");
  const [professor, setProfessor] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();

    onConfirm({
      title,
      professor,
      description,
      start: startDate,
      end: endDate,
    });

    // Limpar os campos após a confirmação
    setTitle("");
    setProfessor("");
    setDescription("");
    setStartDate(new Date());
    setEndDate(new Date());
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {/* Botão "X" para fechar o modal */}
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>

        <h2>Adicionar Evento</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Título do evento"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.modalInput}
          />
          <input
            type="text"
            name="professor"
            placeholder="Nome do professor"
            value={professor}
            onChange={(e) => setProfessor(e.target.value)}
            className={styles.modalInput}
          />
          <textarea
            name="description"
            placeholder="Descrição do evento"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.modalInput}
          />

          <label>Data e Hora de Início:</label>
          <DateTimePicker
            onChange={setStartDate}
            value={startDate}
            format="y-MM-dd HH:mm"
            className={styles.modalInput}
          />

          <label>Data e Hora de Término:</label>
          <DateTimePicker
            onChange={setEndDate}
            value={endDate}
            format="y-MM-dd HH:mm"
            className={styles.modalInput}
          />

          <div className={styles.modalActions}>
            <button type="submit" className={styles.btnConfirm}>
              Confirmar
            </button>
            <button type="button" className={styles.btnCancel} onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
