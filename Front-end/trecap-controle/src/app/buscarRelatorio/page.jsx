"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import MenuLateral from "@/components/menuLateral/page";
import jsPDF from "jspdf";
import "jspdf-autotable";
import dayjs from "dayjs";

export default function BuscarRelatorio() {
  const [eventos, setEventos] = useState([]);  // Armazena os eventos
  const [registros, setRegistros] = useState([]);  // Armazena os registros de presença
  const [criterioBusca, setCriterioBusca] = useState("");
  const [registrosFiltrados, setRegistrosFiltrados] = useState([]);  // Registros após filtragem

  // Função para buscar os eventos e registros do backend
  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await fetch("http://localhost:3333/eventos"); // URL para buscar eventos
        if (!response.ok) {
          throw new Error("Erro ao buscar os eventos.");
        }
        const data = await response.json();
        setEventos(data); // Salva os eventos
      } catch (error) {
        console.error("Erro ao buscar os eventos:", error);
      }
    };

    const fetchRegistros = async () => {
      try {
        const response = await fetch("http://localhost:3333/registros"); // URL para buscar os registros
        if (!response.ok) {
          throw new Error("Erro ao buscar os registros.");
        }
        const data = await response.json();
        setRegistros(data);
        setRegistrosFiltrados(data); // Inicialmente, exibe todos os registros
      } catch (error) {
        console.error("Erro ao buscar os registros:", error);
      }
    };

    fetchEventos();
    fetchRegistros();
  }, []);

  // Função para filtrar registros com base no critério de busca
  const handleBusca = () => {
    const filtrados = registros.filter((registro) =>
      registro.evento_nome.toLowerCase().includes(criterioBusca.toLowerCase())
    );
    setRegistrosFiltrados(filtrados);
  };

  // Função para gerar o PDF
  const gerarRelatorioPDF = (registro) => {
    const doc = new jsPDF();

    const title = "Relatório de Presença";
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(title);
    const textX = (pageWidth - textWidth) / 2;
    doc.text(title, textX, 10);

    doc.text(`Evento: ${registro.evento_nome}`, 10, 20);
    doc.text(`Data: ${dayjs(registro.evento_data_inicio).format("DD/MM/YYYY")}`, 10, 30);

    const participantes = registro.participantes.map((p) => [
      p.colaborador_nome,
      dayjs(p.registros_hora_entrada).format("HH:mm"),
    ]);

    doc.autoTable({
      head: [["Nome", "Horário de Chegada"]],
      body: participantes,
      startY: 40,
      theme: "striped",
      headStyles: { fillColor: [74, 20, 140] },
      bodyStyles: { fontSize: 10, textColor: [0, 0, 0] },
      margin: { top: 40, bottom: 20 },
    });

    doc.text(`Gerado em: ${dayjs().format("DD/MM/YYYY HH:mm")}`, 10, doc.internal.pageSize.height - 10);

    doc.save(`${registro.evento_nome}-relatorio.pdf`);
  };

  return (
    <>
      <MenuLateral />
      <div className={styles.container}>
        <h1>Gerar relatórios de presença em evento.</h1>

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Buscar pelo nome do evento"
            value={criterioBusca}
            onChange={(e) => setCriterioBusca(e.target.value)}
            className={styles.searchInput}
          />
          <button onClick={handleBusca} className={styles.searchButton}>
            Buscar
          </button>
        </div>

        <div className={styles.resultContainer}>
          {registrosFiltrados.length > 0 ? (
            <ul className={styles.listaRelatorios}>
              {registrosFiltrados.map((registro) => (
                <li key={registro.registros_id} className={styles.relatorioItem}>
                  <div>
                    <h3>{registro.evento_nome}</h3>
                    <p>Data: {dayjs(registro.evento_data_inicio).format("DD/MM/YYYY")}</p>
                  </div>
                  <button
                    onClick={() => gerarRelatorioPDF(registro)}
                    className={styles.gerarPDFButton}
                  >
                    Gerar PDF
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhum registro encontrado.</p>
          )}
        </div>
      </div>
    </>
  );
}
