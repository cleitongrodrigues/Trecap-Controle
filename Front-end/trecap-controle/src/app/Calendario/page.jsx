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

export default function HomePage() {
  
  const [events, setEvents] = useState([
    { id: 1, title: "Evento 1", start: "2024-09-17", end: "2024-09-19" },
    { id: 2, title: "Evento 2", start: "2024-09-20", allDay: true },
  ]);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  
  const handleDateSelect = (selectInfo) => {
    setSelectedDate(selectInfo); // Armazena a data selecionada
    setIsModalOpen(true); // Abre o modal
  };

  // Função para adicionar o evento
  const handleAddEvent = (title) => {
    let calendarApi = selectedDate.view.calendar;

    calendarApi.unselect(); // limpar seleção

    if (title) {
      // Adicionar novo evento
      const newEvent = {
        id: Date.now(),
        title,
        start: selectedDate.startStr,
        end: selectedDate.endStr,
        allDay: selectedDate.allDay,
      };
      setEvents([...events, newEvent]);
    }
    setIsModalOpen(false); // Fecha o modal após adicionar o evento
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
        {event.title} - {format(new Date(event.start), "dd/MM/yyyy")}{" "}
        {event.end ? `até ${format(new Date(event.end), "dd/MM/yyyy")}` : ""}
      </li>
    ));
  };

  return (
    <>
      <CabecalhoLogado />
      <div className="calendar-container">
        <div className="calendar">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            editable={true} // habilitar arrastar e soltar
            selectable={true} // habilitar seleção de datas
            selectMirror={true}
            droppable={true}
            select={handleDateSelect} // ao selecionar datas
            eventDrop={handleEventDrop} // ao arrastar e soltar eventos
            eventClick={(info) => alert(info.event.title)} // interação ao clicar em eventos
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            locale={ptLocale} // Define o idioma para português
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
                {eventInfo.event.title}
              </div>
            )}
            eventStyle={(event) => ({
              backgroundColor: '#7f00ff',
              borderColor: '#7f00ff'
            })}
          />
        </div>

        {/* Lista de eventos na lateral direita */}
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

      {/* Modal Customizado */}
      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleAddEvent}
      />
    </>
  );
}
