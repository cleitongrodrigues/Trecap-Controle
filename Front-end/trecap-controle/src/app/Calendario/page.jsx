"use client";
import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptLocale from "@fullcalendar/core/locales/pt-br";
import { format } from "date-fns";
import CabecalhoLogado from "@/cabecalhoLogado/page";
import CustomModal from "../components/ModalCalendar/customModal";
import "./calendar.css";
import axios from "axios";
import MenuLateral from "@/components/menuLateral/page";
import Link from "next/link";

export default function Calendario() {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null); // Armazena o evento a ser editado

  const handleDateSelect = (selectInfo) => {
    console.log(selectInfo)
    setSelectedDate(selectInfo); // Armazena a data selecionada
    setSelectedEvent(null); // Reseta o evento selecionado para adicionar novo
    setIsModalOpen(true); // Abre o modal
  };

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
        <button onClick={() => handleEditEvent(event)} className="edit-btn">
          Editar
        </button>
        <button
          onClick={() => handleDeleteEvent(event.id)}
          className="delete-btn"
        >
          Excluir
        </button>
        <Link href='/CadastroP'>
          <button className="iniciar-teste">
            Iniciar Evento
          </button>
        </Link>
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

      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleAddEvent}
        selectedEvent={selectedEvent} // Passa o evento selecionado para o modal
      />
    </>
  );
}
