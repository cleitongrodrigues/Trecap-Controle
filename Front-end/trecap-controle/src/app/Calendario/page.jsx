"use client";
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptLocale from "@fullcalendar/core/locales/pt-br";
import { format } from "date-fns";
import CustomModal from "../components/ModalCalendar/customModal";
import "./calendar.css";
import axios from "axios";
import MenuLateral from "@/components/menuLateral/page";
import Link from "next/link";
import CadastroP from "../cadastroP/page";

export default function Calendario() {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null); // Armazena o evento a ser editado

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3333/evento");
        const loadedEvents = response.data.map(event => ({
          id: event.evento_id,
          title: event.evento_nome,
          start: event.evento_data_inicio,
          end: event.evento_data_termino,
          evento_local: 'treino',
          professor: event.evento_professor,
          description: event.evento_descricao,
        }));
        setEvents(loadedEvents);
      } catch (error) {
        console.error("Erro ao carregar eventos:", error);
      }
    };
    fetchEvents();
  }, []);

  const handleDateSelect = (selectInfo) => {
    console.log(selectInfo)
    setSelectedDate(selectInfo); // Armazena a data selecionada
    setSelectedEvent(null); // Reseta o evento selecionado para adicionar novo
    setIsModalOpen(true); // Abre o modal
  };
  // const handleAddEvent = async (eventData) => {
  //   let calendarApi = selectedDate?.view.calendar;
  //   calendarApi?.unselect(); // Limpar seleção
  
  //   if (eventData.title && eventData.start && eventData.end) {
  //     const newEvent = {
  //       title: eventData.title,
  //       start: eventData.start,
  //       end: eventData.end,
  //       professor: eventData.professor,
  //       description: eventData.description,
  //       usu_id: 1,
  //     };
  
  //     if (selectedEvent) {
  //       // Edição do evento existente
  //       try {
  //         await axios.patch(`http://localhost:3333/evento/${selectedEvent.id}`, {
  //           evento_nome: newEvent.title,
  //           evento_data_inicio: newEvent.start,
  //           evento_data_termino: newEvent.end,
  //           evento_professor: newEvent.professor,
  //           evento_local: "treino",
  //           evento_status: 1,
  //         });
          
  //         // Atualiza o estado local
  //         setEvents((prevEvents) =>
  //           prevEvents.map((event) =>
  //             event.id === selectedEvent.id ? { ...event, ...newEvent } : event
  //           )
  //         );
  //       } catch (error) {
  //         console.error("Erro ao editar o evento:", error);
  //       }
  //     } else {
  //       // Criação de novo evento
  //       try {
  //         const response = await axios.post("http://localhost:3333/evento", {
  //           usu_id: newEvent.usu_id,
  //           evento_nome: newEvent.title,
  //           evento_data_inicio: newEvent.start,
  //           evento_data_termino: newEvent.end,
  //           evento_local: "treino",
  //           evento_status: 1,
  //           evento_professor: newEvent.professor,
  //         });
  
  //         // Atualiza o estado local
  //         setEvents((prevEvents) => [...prevEvents, response.data]);
  //       } catch (error) {
  //         console.error("Erro ao criar o evento:", error);
  //       }
  //     }
  //   }
  
  //   setIsModalOpen(false); // Fecha o modal após a ação
  // };
  

  // Função para adicionar ou editar o evento
  const handleAddEvent = async (eventData) => {
    let calendarApi = selectedDate?.view.calendar;

    calendarApi?.unselect(); // Limpar seleção

    if (eventData.title) {
      if (selectedEvent) {
        // Edição do evento existente
        const updatedEvents = events.map((event) =>
          event.id === selectedEvent.id
            ? {
              ...event,
              title: eventData.title,
              professor: eventData.professor,
              description: eventData.description,
            }
            : event
        );
        setEvents(updatedEvents);

        // Atualiza o evento no backend via API (requisição PUT)
        try {
          await axios.put(`http://localhost:3333/evento/${selectedEvent.id}`, {
            evento_nome: eventData.title,
            evento_professor: eventData.professor,
            evento_data_inicio: selectedEvent.start,
            evento_data_termino: selectedEvent.end,
            evento_local: "treino",
            evento_status: 1,
            usu_id: 1,
          });
        } catch (error) {
          console.error("Erro ao editar o evento:", error);
        }
      } else {
        // Criação de novo evento
        const newEvent = {
          id: Date.now(),
          title: eventData.title,
          start: selectedDate.startStr,
          end: selectedDate.endStr,
          allDay: selectedDate.allDay,
          professor: eventData.professor,
          description: eventData.description,
          usu_id: 1,
        };

        const formattedStartDate = format(
          new Date(newEvent.start),
          "yyyy-MM-dd"
        );
        const formattedEndDate = format(new Date(newEvent.end), "yyyy-MM-dd");

        try {
          const response = await axios.post("http://localhost:3333/evento", {
            usu_id: newEvent.usu_id,
            evento_nome: newEvent.title,
            evento_data_inicio: formattedStartDate,
            evento_data_termino: formattedEndDate,
            evento_local: "treino",
            evento_status: 1,
            evento_professor: newEvent.professor,
          });

          setEvents([...events, newEvent]);
        } catch (error) {
          console.error("Erro ao criar o evento:", error);
        }
      }
    }

    setIsModalOpen(false);
  };

  // Função para abrir o modal para editar evento
  const handleEditEvent = (event) => {
    setSelectedEvent(event); // Armazena o evento a ser editado
    setIsModalOpen(true); // Abre o modal para edição
  };

  // Função para excluir eventos
  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:3333/evento/${id}`); // Deleta no backend
      setEvents(events.filter((event) => event.id !== id));
    } catch (error) {
      console.error("Erro ao excluir o evento:", error);
    }
  };

  // Função para lidar com drag and drop dos eventos
  const handleEventDrop = async (dropInfo) => {
    const { id, startStr, endStr } = dropInfo.event;

    const updatedEvents = events.map((event) =>
      event.id === parseInt(id)
        ? { ...event, start: startStr, end: endStr }
        : event
    );
    setEvents(updatedEvents);

    // Atualiza o evento no backend após o drag and drop
    try {
      await axios.put(`http://localhost:3333/evento/${id}`, {
        evento_data_inicio: startStr,
        evento_data_termino: endStr,
      });
    } catch (error) {
      console.error("Erro ao mover o evento:", error);
    }
  };

  // Função para exibir os eventos na lateral direita
  const renderEventList = () => {
    return events.map((event) => (
      <li key={event.id}>
        <strong>{event.title}</strong> -{" "}
        {format(new Date(event.start), "dd/MM/yyyy")}{" "}
        {event.end ? `até ${format(new Date(event.end), "dd/MM/yyyy")}` : ""}
        <br />
        <em>Professor: {event.professor}</em>
        <br />
        <p>{event.description}</p>
        <div className="btn-comum">
          <button onClick={() => handleEditEvent(event)}>
            Editar
          </button>
          <button
            onClick={() => handleDeleteEvent(event.id)}
          >
            Excluir
          </button>
          <Link href='/cadastroP'>
            <button>
              Iniciar Evento
            </button>
          </Link>
        </div>
      </li>
    ));
  };

  return (
    <>
      <MenuLateral />
      <div className="calendar-container">
        <div className="calendar">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            editable={true}
            selectable={true}
            selectMirror={true}
            droppable={true}
            select={handleDateSelect}
            eventDrop={handleEventDrop}
            eventClick={(info) => alert(info.event.title)}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            locale={ptLocale}
            themeSystem="bootstrap"
            contentHeight="auto"
            buttonText={{
              today: "Hoje",
              month: "Mês",
              week: "Semana",
              day: "Dia",
            }}
            eventContent={(eventInfo) => (
              <div className="event-content">
                <strong>{eventInfo.event.title}</strong>
                <br />
                <em>{eventInfo.event.extendedProps.professor}</em>
                <br />
                <p>{eventInfo.event.extendedProps.description}</p>
              </div>
            )}
            eventStyle={() => ({
              backgroundColor: "#7f00ff",
              borderColor: "#7f00ff",
            })}
          />
        </div>

        <div className="event-list">
          <h2>Lista de Eventos</h2>
          <ul>
            {events.length > 0 ? (
              renderEventList()
            ) : (
              <p>Nenhum evento adicionado</p>
            )}
          </ul>
        </div>
      </div>
      {/* <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleAddEvent}
        selectedEvent={selectedEvent} // Passa o evento selecionado para o modal
      /> */}
      {isModalOpen && (
  <div className="modal">
    <div className="modal-content">
      <h3>{selectedEvent ? "Editar Evento" : "Adicionar Evento"}</h3>
      <label>Título</label>
      <input
        type="text"
        placeholder="Digite o nome do curso"
        value={selectedEvent?.title || ""}
        onChange={(e) =>
          setSelectedEvent({ ...selectedEvent, title: e.target.value })
        }
      />
      <label>Selecione a data do inicio do curso</label>
      <input
        type="date"
        placeholder="Data e Hora de Início"
        value={selectedEvent?.start || ""}
        onChange={(e) =>
          setSelectedEvent({ ...selectedEvent, start: e.target.value })
        }
      />
      <label>Selecione a data do término do curso</label>
      <input
        type="date"
        placeholder="Data e Hora de Término"
        value={selectedEvent?.end || ""}
        onChange={(e) =>
          setSelectedEvent({ ...selectedEvent, end: e.target.value })
        }
      />
      <label>Professor</label>
      <input
        type="text"
        placeholder="Digite o nome do professor responsavel"
        value={selectedEvent?.professor || ""}
        onChange={(e) =>
          setSelectedEvent({ ...selectedEvent, professor: e.target.value })
        }
      />
      <label>Descrição</label>
      <textarea
        placeholder="Digite a descrição do curso..."
        value={selectedEvent?.description || ""}
        onChange={(e) =>
          setSelectedEvent({ ...selectedEvent, description: e.target.value })
        }
      ></textarea>
      <button onClick={() => handleAddEvent(selectedEvent)}>Salvar</button>
      <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
    </div>
  </div>
)}

    </>
  );
}
