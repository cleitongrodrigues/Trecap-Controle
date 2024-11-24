import { useState, useEffect } from 'react';
import style from './modal.module.css';
import axios from 'axios';
import Swal from "sweetalert2";

const ModalEdit = ({ evento, onClose, onSave }) => {
    const [eventoEditado, setEventoEditado] = useState({
        evento_nome: '',
        evento_data_inicio: '', // Data sem hora
        evento_data_termino: '', // Data de término
        evento_hora: '', // Hora separada
        evento_local: '',
        evento_professor: '',
        evento_status: true,
        evento_id: '',
        ...evento,
    });

    const [errors, setErrors] = useState({
        nome: '',
        dataInicio: '',
        dataTermino: '',
        horaInicio: '',
        local: '',
        professor: '',
    });

    useEffect(() => {
        if (evento) {
            setEventoEditado({
                evento_nome: evento.evento_nome || '',
                evento_data_inicio: evento.evento_data_inicio || '',
                evento_data_termino: evento.evento_data_termino || '',
                evento_hora: evento.evento_hora || '',
                evento_local: evento.evento_local || '',
                evento_professor: evento.evento_professor || '',
                evento_id: evento.evento_id || '',
            });
        }
    }, [evento]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventoEditado((prev) => ({
            ...prev,
            [name]: value,
        }));

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
    
        const dataEventoInicio = new Date(eventoEditado.evento_data_inicio);
        if (!eventoEditado.evento_data_inicio) {
            newErrors.dataInicio = 'A data de início não pode estar vazia.';
            isValid = false;
        } else if (isNaN(dataEventoInicio.getTime())) {
            newErrors.dataInicio = 'Data de início inválida!';
            isValid = false;
        }
    
        const dataEventoTermino = new Date(eventoEditado.evento_data_termino);
        if (!eventoEditado.evento_data_termino) {
            newErrors.dataTermino = 'A data de término não pode estar vazia.';
            isValid = false;
        } else if (isNaN(dataEventoTermino.getTime())) {
            newErrors.dataTermino = 'Data de término inválida!';
            isValid = false;
        } else if (dataEventoTermino < dataEventoInicio) {
            newErrors.dataTermino = 'A data de término não pode ser antes da data de início.';
            isValid = false;
        }
    
        const horaEventoInicio = eventoEditado.evento_hora;
        if (!horaEventoInicio) {
            newErrors.horaInicio = 'A hora de início não pode estar vazia.';
            isValid = false;
        }
    
        if (!eventoEditado.evento_local) {
            newErrors.local = 'O local do evento não pode estar vazio.';
            isValid = false;
        }
    
        if (!eventoEditado.evento_professor) {
            newErrors.professor = 'O nome do professor não pode estar vazio.';
            isValid = false;
        }
    
        if (!isValid) {
            setErrors(newErrors);
            return;
        }
    
        if (!eventoEditado.evento_id) {
            alert('Evento não encontrado para edição.');
            return;
        }
    
        try {
            const response = await axios.patch(
                `http://localhost:3333/Eventos/${eventoEditado.evento_id}`,
                {
                    evento_nome: eventoEditado.evento_nome,
                    evento_data_inicio: eventoEditado.evento_data_inicio,
                    evento_data_termino: eventoEditado.evento_data_termino,
                    evento_hora: eventoEditado.evento_hora,
                    evento_local: eventoEditado.evento_local,
                    evento_professor: eventoEditado.evento_professor,
                    evento_status: eventoEditado.evento_status ?? true,
                    usu_id: 1,  // Adicionando o ID do usuário logado, substitua conforme necessário
                }
            );
    
            if (response.status === 200) {
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Evento atualizado com sucesso.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                  })

                const updateEvent = await axios.get(
                    `http://localhost:3333/Eventos/${eventoEditado.evento_id}`
                );

                onSave(updateEvent.data);
                onClose();
            } else {
                Swal.fire({
                    title: 'Erro!',
                    text: 'Erro ao atualizar evento.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                  })
            }
        } catch (error) {
            console.error('Erro no axios:', error.response || error.message || error);
            // alert('Erro ao salvar as alterações. Tente novamente.');
        }
    };

    return (
        <div className={style.modal}>
            <div className={style.modalContent}>
                <h1 className={style.Editar}>Editar Evento</h1>

                <label className={style.nomeEvento} htmlFor="evento_nome">Nome do Evento:</label>
                <input
                    type="text"
                    id="evento_nome"
                    name="evento_nome"
                    value={eventoEditado.evento_nome}
                    onChange={handleChange}
                />
                {errors.nome && <p className={style.error}>{errors.nome}</p>}

                <br />
                <label className={style.dataEvento} htmlFor="evento_data_inicio">Data de Início:</label>
                <input
                    type="date"
                    id="evento_data_inicio"
                    name="evento_data_inicio"
                    value={eventoEditado.evento_data_inicio}
                    onChange={handleChange}
                />
                {errors.dataInicio && <p className={style.error}>{errors.dataInicio}</p>}

                <br />
                <label className={style.dataEvento} htmlFor="evento_data_termino">Data de Término:</label>
                <input
                    type="date"
                    id="evento_data_termino"
                    name="evento_data_termino"
                    value={eventoEditado.evento_data_termino}
                    onChange={handleChange}
                />
                {errors.dataTermino && <p className={style.error}>{errors.dataTermino}</p>}

                <br />
                <label className={style.horaEvento} htmlFor="evento_hora">Hora de Início:</label>
                <input
                    type="time"
                    id="evento_hora"
                    name="evento_hora"
                    value={eventoEditado.evento_hora}
                    onChange={handleChange}
                />
                {errors.horaInicio && <p className={style.error}>{errors.horaInicio}</p>}

                <br />
                <label className={style.localEvento} htmlFor="evento_local">Local do Evento:</label>
                <input
                    type="text"
                    id="evento_local"
                    name="evento_local"
                    value={eventoEditado.evento_local}
                    onChange={handleChange}
                />
                {errors.local && <p className={style.error}>{errors.local}</p>}

                <br />
                <label className={style.professorEvento} htmlFor="evento_professor">Professor:</label>
                <input
                    type="text"
                    id="evento_professor"
                    name="evento_professor"
                    value={eventoEditado.evento_professor}
                    onChange={handleChange}
                />
                {errors.professor && <p className={style.error}>{errors.professor}</p>}

                <div className={style.buttonContainer}>
                    <button onClick={handleSubmit} className={style.buttonSalvar}>Salvar</button>
                    <button onClick={onClose} className={style.buttonCancelar}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default ModalEdit;
