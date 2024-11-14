import { useState, useEffect } from 'react';
import style from './modal.module.css';
import axios from 'axios';

const ModalEdit = ({ evento, onClose, onSave }) => {
    // Definir o estado do evento editado com valores padrão, caso `evento` seja undefined
    const [eventoEditado, setEventoEditado] = useState({
        evento_nome: '',
        evento_data_inicio: '', // Data sem hora
        evento_hora: '', // Hora separada
        evento_local: '',
        evento_professor: '',
        evento_status: true,
        evento_id: '',
        // Se evento for fornecido, preenchê-lo com seus valores
        ...evento,
    });

    const [errors, setErrors] = useState({
        nome: '',
        dataInicio: '',
        horaInicio: '',
        local: '',
        professor: '',
    });

    // Usado para garantir que o eventoEditado seja atualizado quando a prop evento mudar
    useEffect(() => {
        if (evento) {
            setEventoEditado({
                evento_nome: evento.evento_nome || '',
                evento_data_inicio: evento.evento_data_inicio || '', // Data (somente data, sem hora)
                evento_hora: evento.evento_hora || '', // Hora (separada)
                evento_local: evento.evento_local || '',
                evento_professor: evento.evento_professor || '',
                evento_status: evento.evento_status !== undefined ? evento.evento_status : true,
                evento_id: evento.evento_id || '', // ID do evento
            });
        }
    }, [evento]);

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

    const handleSubmit = async () => {
        let isValid = true;
        const newErrors = {};

        // Validação dos campos
        if (!eventoEditado.evento_nome) {
            newErrors.nome = 'O nome do evento não pode estar vazio.';
            isValid = false;
        }

        // Validação da data de início
        const dataEventoInicio = new Date(eventoEditado.evento_data_inicio);
        if (!eventoEditado.evento_data_inicio) {
            newErrors.dataInicio = 'A data de início não pode estar vazia.';
            isValid = false;
        } else if (isNaN(dataEventoInicio.getTime())) {
            newErrors.dataInicio = 'Data de início inválida!';
            isValid = false;
        }

        // Validação da hora de início
        const horaEventoInicio = eventoEditado.evento_hora;
        if (!horaEventoInicio) {
            newErrors.horaInicio = 'A hora de início não pode estar vazia.';
            isValid = false;
        }

        // Validação do local
        if (!eventoEditado.evento_local) {
            newErrors.local = 'O local do evento não pode estar vazio.';
            isValid = false;
        }

        // Validação do professor
        if (!eventoEditado.evento_professor) {
            newErrors.professor = 'O nome do professor não pode estar vazio.';
            isValid = false;
        }

        // Se houver algum erro, não prosseguir
        if (!isValid) {
            setErrors(newErrors);
            return;
        }

        // Verificar se o evento_id está presente
        if (!eventoEditado.evento_id) {
            alert('Evento não encontrado para edição.');
            return;  // Não envia a requisição se o ID não estiver presente
        }

        try {
            // A data deve ser no formato 'YYYY-MM-DD' (sem a parte de hora)
            const dataEventoInicio = eventoEditado.evento_data_inicio; // Data no formato 'YYYY-MM-DD'
            const dataHoraInicio = eventoEditado.evento_hora; // Hora no formato 'HH:mm'

            // Atualizar o evento no backend
            const response = await axios.patch(
                `http://localhost:3333/Eventos/${eventoEditado.evento_id}`,
                {
                    evento_nome: eventoEditado.evento_nome,
                    evento_data_inicio: dataEventoInicio, // Enviar a data sem hora
                    evento_hora: dataHoraInicio, // Enviar apenas a hora
                    evento_local: eventoEditado.evento_local,
                    evento_professor: eventoEditado.evento_professor,
                    evento_status: eventoEditado.evento_status, // Campo booleano (pode ser 1 ou 0)
                }
            );

            if (response.status === 200) {
                alert('Evento atualizado com sucesso!');
                onSave(eventoEditado);  // Atualiza a lista de eventos
                onClose();  // Fecha o modal
            } else {
                alert('Erro ao atualizar o evento.');
            }
        } catch (error) {
            console.error('Erro no axios:', error.response || error.message || error);
            alert('Erro ao salvar as alterações. Tente novamente.');
        }
    };

    return (
        <div className={style.modal}>
            <div className={style.modalContent}>
                <h1 className={style.Editar}>Editar Evento</h1>

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
                    value={eventoEditado.evento_data_inicio} // Mostrar no formato YYYY-MM-DD
                    onChange={handleChange}
                />
                {errors.dataInicio && <p className={style.error}>{errors.dataInicio}</p>} {/* Mensagem de erro */}

                {/* Campo para editar a hora de início */}
                <br />
                <label className={style.horaEvento} htmlFor="evento_hora">Hora de Início:</label>
                <input
                    type="time"
                    id="evento_hora"
                    name="evento_hora"
                    value={eventoEditado.evento_hora}
                    onChange={handleChange}
                />
                {errors.horaInicio && <p className={style.error}>{errors.horaInicio}</p>} {/* Mensagem de erro */}

                {/* Campo para editar o local do evento */}
                <br />
                <label className={style.localEvento} htmlFor="evento_local">Local do Evento:</label>
                <input
                    type="text"
                    id="evento_local"
                    name="evento_local"
                    value={eventoEditado.evento_local}
                    onChange={handleChange}
                />
                {errors.local && <p className={style.error}>{errors.local}</p>} {/* Mensagem de erro */}

                {/* Campo para editar o professor */}
                <br />
                <label className={style.professorEvento} htmlFor="evento_professor">Professor:</label>
                <input
                    type="text"
                    id="evento_professor"
                    name="evento_professor"
                    value={eventoEditado.evento_professor}
                    onChange={handleChange}
                />
                {errors.professor && <p className={style.error}>{errors.professor}</p>} {/* Mensagem de erro */}

                <div className={style.buttonContainer}>
                    <button onClick={handleSubmit} className={style.button}>Salvar</button>
                    <button onClick={onClose} className={style.button}>Fechar</button>
                </div>
            </div>
        </div>
    );
};

export default ModalEdit;
