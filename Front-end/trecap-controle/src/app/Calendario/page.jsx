"use client";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptLocale from '@fullcalendar/core/locales/pt-br'; 
import { format } from "date-fns"; 
import CabecalhoLogado from '@/cabecalhoLogado/page';
import CustomModal from "../components/ModalCalendar/customModal";

import './calendar.css'; 
import axios from "axios";
import MenuLateral from "@/components/menuLateral/page";

export default function Calendario() {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Carregar eventos do banco de dados ao montar o componente
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3333/evento");
        const fetchedEvents = response.data.map((event) => ({
          id: event.id,
          title: event.evento_nome,
          start: event.evento_data_inicio,
          end: event.evento_data_termino,
          professor: event.evento_professor,
          description: event.evento_local,
        }));
        setEvents(fetchedEvents);  // Armazenando os eventos no estado
      } catch (error) {
        console.error("Erro ao carregar eventos:", error);
      }
    };
    fetchEvents();
  }, []);

  const handleDateSelect = (selectInfo) => {
    setSelectedDate(selectInfo);
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const handleAddEvent = async (eventData) => {
    let calendarApi = selectedDate?.view.calendar;
    calendarApi?.unselect();

    if (eventData.title) {
      if (selectedEvent) {
        // Edição de evento
        const updatedEvents = events.map(event =>
          event.id === selectedEvent.id
            ? { ...event, title: eventData.title, professor: eventData.professor, description: eventData.description }
            : event
        );
        setEvents(updatedEvents);

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
        if (selectedDate && selectedDate.startStr && selectedDate.endStr) {
          const newEvent = {
            title: eventData.title,
            start: selectedDate.startStr,
            end: selectedDate.endStr,
            allDay: selectedDate.allDay,
            professor: eventData.professor,
            description: eventData.description,
            usu_id: 1
          };

          try {
            const response = await axios.post("http://localhost:3333/evento", {
              usu_id: newEvent.usu_id,
              evento_nome: newEvent.title,
              evento_data_inicio: newEvent.start,
              evento_data_termino: newEvent.end,
              evento_local: "treino",
              evento_status: 1,
              evento_professor: newEvent.professor
            });

            const createdEvent = { ...newEvent, id: response.data.id }; // Adiciona ID real retornado pela API
            setEvents([...events, createdEvent]);
          } catch (error) {
            console.error("Erro ao criar o evento:", error);
          }
        }
      }
    }
    setIsModalOpen(false);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:3333/evento/${id}`);
      setEvents(events.filter(event => event.id !== id));
    } catch (error) {
      console.error("Erro ao excluir o evento:", error);
    }
  };
  
  const handleEventDrop = async (dropInfo) => {
    const { id, startStr, endStr } = dropInfo.event;
    const updatedEvents = events.map((event) =>
      event.id === parseInt(id) ? { ...event, start: startStr, end: endStr } : event
    );
    setEvents(updatedEvents);

    try {
      await axios.put(`http://localhost:3333/evento/${id}`, {
        evento_data_inicio: startStr,
        evento_data_termino: endStr
      });
    } catch (error) {
      console.error("Erro ao mover o evento:", error);
    }
  };

  const renderEventList = () => {
    return events.map((event) => (
      <li key={event.id}>
        <strong>{event.title}</strong> - {format(new Date(event.start), "dd/MM/yyyy")}{" "}
        {event.end ? `até ${format(new Date(event.end), "dd/MM/yyyy")}` : ""}<br />
        <em>Professor: {event.professor}</em><br />
        <p>{event.description}</p>
        <button onClick={() => handleEditEvent(event)} className="edit-btn">
          Editar
        </button>
        <button onClick={() => handleDeleteEvent(event.id)} className="delete-btn">
          Excluir
        </button>
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
            events={events}  // Passando os eventos carregados para o calendário
            editable={true}
            selectable={true}
            selectMirror={true}
            droppable={true}
            select={handleDateSelect}
            eventDrop={handleEventDrop}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            locale={ptLocale}
            themeSystem="bootstrap"
            contentHeight="auto"
            buttonText={{
              today: 'Hoje',
              month: 'Mês',
              week: 'Semana',
              day: 'Dia'
            }}
            eventContent={(eventInfo) => (
              <div className="event-content">
                <strong>{eventInfo.event.title}</strong><br />
                <em>{eventInfo.event.extendedProps.professor}</em><br />
                <p>{eventInfo.event.extendedProps.description}</p>
              </div>
            )}
            eventStyle={() => ({
              backgroundColor: '#7f00ff',
              borderColor: '#7f00ff',
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
        selectedEvent={selectedEvent}
      />
    </>
  );
}
