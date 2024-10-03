"use client";
import { useState } from "react";
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

export default function HomePage() {
  
  const [events, setEvents] = useState([
    { id: 1, title: "Evento 1", start: "2024-09-17", end: "2024-09-19", professor: "Prof. A", description: "Descrição do Evento 1" },
    { id: 2, title: "Evento 2", start: "2024-09-20", allDay: true, professor: "Prof. B", description: "Descrição do Evento 2" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelect = (selectInfo) => {
    setSelectedDate(selectInfo); // Armazena a data selecionada
    setIsModalOpen(true); // Abre o modal
  };

  // Função para adicionar o evento
  const handleAddEvent = async (eventData) => {
    let calendarApi = selectedDate.view.calendar;
  
    calendarApi.unselect(); // limpar seleção
  
    if (eventData.title) {
      const newEvent = {
        id: Date.now(),
        title: eventData.title,
        start: selectedDate.startStr,
        end: selectedDate.endStr,
        allDay: selectedDate.allDay,
        professor: eventData.professor, // Armazena o professor
        description: eventData.description, // Armazena a descrição
        usu_id: 1
      };
      const response = await axios.post(
        "http://localhost:3333/evento",
        {
          usu_id: newEvent.usu_id,
          evento_nome: newEvent.title,
          evento_data_inicio: newEvent.start,
          evento_data_termino: newEvent.end,
          evento_local:"treino",
          evento_status: 1,
          evento_professor: newEvent.professor
        }
      
      )
      console.log(response)
      setEvents([...events, newEvent]);
    }
    setIsModalOpen(false);
  };

  // Função para excluir eventos
  const handleDeleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };
  
  // Função para lidar com drag and drop dos eventos
  const handleEventDrop = (dropInfo) => {
    const { id, startStr, endStr } = dropInfo.event;
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === parseInt(id) ? { ...event, start: startStr, end: endStr } : event
      )
    );
  };

  // Função para exibir os eventos na lateral direita
  const renderEventList = () => {
    return events.map((event) => (
      <li key={event.id}>
        <strong>{event.title}</strong> - {format(new Date(event.start), "dd/MM/yyyy")}{" "}
        {event.end ? `até ${format(new Date(event.end), "dd/MM/yyyy")}` : ""}<br />
        <em>Professor: {event.professor}</em><br />
        <p>{event.description}</p>
        <button onClick={() => handleDeleteEvent(event.id)} className="delete-btn">
          Excluir
        </button>
      </li>
    ));
  };

  return (
    <>
      <MenuLateral/>
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
      />
    </>
  );
}
