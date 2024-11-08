import { useState } from 'react';

const ModalEdit = ({ evento, onClose, onSave }) => {
    const [eventoEditado, setEventoEditado] = useState(evento);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventoEditado((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        onSave(eventoEditado);  // Envia o evento editado para a função de salvar
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Editar Evento</h2>
                <label>Nome do Evento:</label>
                <input
                    type="text"
                    name="evento_nome"
                    value={eventoEditado.evento_nome}
                    onChange={handleChange}
                />
                <label>Data de Início:</label>
                <input
                    type="datetime-local"
                    name="evento_data_inicio"
                    value={eventoEditado.evento_data_inicio}
                    onChange={handleChange}
                />
                <label>Local:</label>
                <input
                    type="text"
                    name="evento_local"
                    value={eventoEditado.evento_local}
                    onChange={handleChange}
                />
                <button onClick={handleSubmit}>Salvar</button>
                <button onClick={onClose}>Fechar</button>
            </div>
        </div>
    );
};

export default ModalEdit;
