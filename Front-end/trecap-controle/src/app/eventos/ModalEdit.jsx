import { useState } from 'react';
import style from './modal.module.css';
import axios from 'axios';




const ModalEdit = ({ evento, onClose, onSave }) => {
    
    // Cria uma cópia do evento para edição
    const [eventoEditado, setEventoEditado] = useState({ ...evento });

    // Estados para mensagens de erro
    const [errors, setErrors] = useState({
        nome: '',
        dataInicio: '',
        horaInicio: '',
    });

    // Função para lidar com as mudanças no nome, data e hora
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventoEditado((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Limpa o erro ao modificar o campo
        setErrors((prev) => ({
            ...prev,
            [name]: '',
        }));
    };

    // Função para enviar as edições
    const handleSubmit = async () => {
        let isValid = true;
        const newErrors = {};
    
        // Validação dos campos
        if (!eventoEditado.evento_nome) {
            newErrors.nome = 'O nome do evento não pode estar vazio.';
            isValid = false;
        }
    
        const dataEventoInicio = new Date(eventoEditado.evento_data_inicio);
        if (isNaN(dataEventoInicio.getTime())) {
            newErrors.dataInicio = 'Data de início inválida!';
            isValid = false;
        }
    
        const horaEventoInicio = eventoEditado.evento_hora;
        if (!horaEventoInicio) {
            newErrors.horaInicio = 'A hora de início não pode estar vazia.';
            isValid = false;
        }
    
        // Se houver algum erro, não prosseguir
        if (!isValid) {
            setErrors(newErrors);
            return;
        }
    
        try {
            // Enviar a requisição de atualização
            const response = await axios.patch(`http://localhost:3000/Eventos/${eventoEditado.evento_id}`, {
                evento_nome: eventoEditado.evento_nome,
                evento_data_inicio: eventoEditado.evento_data_inicio,
                evento_hora: eventoEditado.evento_hora,  // Apenas os campos que precisam ser atualizados
            });
    
            if (response.status === 200) {
                alert('Evento atualizado com sucesso!');
                onSave(eventoEditado); // Atualiza a lista de eventos
                onClose(); // Fecha o modal
            } else {
                alert('Erro ao atualizar o evento.');
            }
        } catch (error) {
            console.error('Erro no axios:', error.response || error.message|| error);
            // alert('Erro ao salvar as alterações. Tente novamente.');
        }
    };

    return (
        <div className={style.modal}>
            <div className={style.modalContent}>
                <h1>Editar Evento</h1>

                {/* Campo para editar o nome do evento */}
                <label className={style.nomeEvento} htmlFor="evento_nome">Nome do Evento:</label>
                <input
                    type="text"
                    id="evento_nome"
                    name="evento_nome"
                    value={eventoEditado.evento_nome}
                    onChange={handleChange}
                />
                {errors.nome && <p className={style.error}>{errors.nome}</p>} {/* Mensagem de erro */}

                {/* Campo para editar a data de início */}
                <br />
                <label className={style.dataEvento} htmlFor="evento_data_inicio">Data de Início:</label>
                <input
                    type="date"
                    id="evento_data_inicio"
                    name="evento_data_inicio"
                    value={eventoEditado.evento_data_inicio.split('T')[0]} // Exibindo apenas a data
                    onChange={handleChange}
                />
                {errors.dataInicio && <p className={style.error}>{errors.dataInicio}</p>} {/* Mensagem de erro */}

                {/* Campo para editar a hora de início */}
                <br />
                <label className={style.horaEvento} htmlFor="evento_hora_inicio">Hora de Início:</label>
                <input
                    type="time"
                    id="evento_hora_inicio"
                    name="evento_hora_inicio"
                    value={eventoEditado.evento_hora}
                    onChange={handleChange}
                />
                {errors.horaInicio && <p className={style.error}>{errors.horaInicio}</p>} {/* Mensagem de erro */}

                <div className={style.buttonContainer}>
                    <button onClick={handleSubmit} className={style.button}>Salvar</button>
                    <button onClick={onClose} className={style.button}>Fechar</button>
                </div>
            </div>
        </div>
    );
};

export default ModalEdit;
