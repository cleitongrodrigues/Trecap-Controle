import React from "react";

export default function CustomModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    const title = event.target.elements.title.value;
    const professor = event.target.elements.professor.value;
    const description = event.target.elements.description.value;

    onConfirm({ title, professor, description }); // Passa o título, professor e descrição
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
            type="text"
            name="description"
            placeholder="Descrição do evento"
            className="modal-input"
          />
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
