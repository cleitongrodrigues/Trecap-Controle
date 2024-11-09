import { useState } from 'react';
import style from './modal.module.css';

const ModalEdit = ({ evento, onClose, onSave }) => {
    // Cria uma cópia do evento para edição
    const [eventoEditado, setEventoEditado] = useState({ ...evento });

    // Função para lidar com as mudanças no nome ou na data
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventoEditado((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Função para enviar as edições
    const handleSubmit = () => {
        // Valida se o nome do evento está vazio
        if (!eventoEditado.evento_nome) {
            alert("O nome do evento não pode estar vazio.");
            return;
        }

        // Verifica se a data de início é válida
        const dataEventoInicio = new Date(eventoEditado.evento_data_inicio);
        if (isNaN(dataEventoInicio.getTime())) {
            alert("Data de início inválida!");
            return;
        }

        onSave(eventoEditado); // Chama a função onSave com o evento editado
        onClose(); // Fecha o modal
    };

    return (
        <div className={style.modal}>
            <div className={style.modalContent}>
                <h2>Editar Evento</h2>

                {/* Campo para editar o nome do evento */}
                <label htmlFor="evento_nome">Nome do Evento:</label>
                <input
                    type="text"
                    id="evento_nome"
                    name="evento_nome"
                    value={eventoEditado.evento_nome}
                    onChange={handleChange}
                />

                {/* Campo para editar a data de início */}
                <label htmlFor="evento_data_inicio">Data de Início:</label>
                <input
                    type="date"
                    id="evento_data_inicio"
                    name="evento_data_inicio"
                    value={eventoEditado.evento_data_inicio.split('T')[0]} // Exibindo apenas a data
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
