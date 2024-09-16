"use client";
import styles from './page.module.css'
import { useState } from 'react'
import CabecalhoLogado from '@/cabecalhoLogado/page';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';


const MyFullCalendar = () => {
  const events = [
    { title: 'Reunião de Equipe', date: '2024-09-20' },
    { title: 'Apresentação ao Cliente', date: '2024-09-22' },
  ];
<CabecalhoLogado />
  return (
    <div style={{ maxWidth: "80%", margin: "0 auto" }}>
      <h2>Calendário Empresarial</h2>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={events}
       
      />
    </div>
  );
};

export default MyFullCalendar;