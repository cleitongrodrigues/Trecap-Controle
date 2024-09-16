"use client";
import styles from './page.module.css'
import { useState } from 'react'
import CabecalhoLogado from '@/cabecalhoLogado/page';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Mycalendar = () => {
    const [date, setDate] = useState(new Date());

    <CabecalhoLogado />
    return (
        <div className={styles.containerCalendar}>
            <h2> Calendario Empresarial</h2>
            <Calendar
            onChange={setDate}
            value={date}
            locale='pt-BR'
            />

            <p>Data selecionada: {date.toLocaleDateString()}</p>
        </div>
    );
};

export default Mycalendar