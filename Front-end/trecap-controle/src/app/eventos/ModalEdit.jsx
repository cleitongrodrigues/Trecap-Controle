import { useState } from 'react';
import style from './modal.module.css';

const ModalEdit = ({ evento, onClose, onSave }) => {
    // Cria uma cópia do evento para edição
    const [eventoEditado, setEventoEditado] = useState({ ...evento });

    // Função para lidar com as mudanças na data de início
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventoEditado((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Função para enviar as edições
    const handleSubmit = () => {
        onSave(eventoEditado); // Chama a função onSave com o evento editado
        onClose(); // Fecha o modal
    };

    return (
        <div className={style.modal}>
            <div className={style.modalContent}>
                <h2>Editar Data do Evento</h2>

                <label htmlFor="evento_data_inicio">Data de Início:</label>
                <input
                    type="datetime-local"
                    id="evento_data_inicio"
                    name="evento_data_inicio"
                    value={eventoEditado.evento_data_inicio}
                    onChange={handleChange}
                />

                <div className={style.buttonContainer}>
                    <button onClick={handleSubmit} className={style.button}>Salvar</button>
                    <button onClick={onClose} className={style.button}>Fechar</button>
                </div>
            </div>
        </div>
    );
};

export default ModalEdit;
