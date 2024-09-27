"use client";

import { useEffect, useState } from "react";
import { jsPDF } from "jspdf"; // Importa jsPDF
import "jspdf-autotable"; // Importa autoTable
import styles from "./page.module.css";
import MenuLateral from "@/components/menuLateral/page";

export default function RelatorioPresenca() {
  const [participantesPresentes, setParticipantesPresentes] = useState([]);
  const [curso, setCurso] = useState("TREINAMENTO SOBRE HIGIENE NO TRABALHO"); // Nome do curso

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Recuperar os participantes presentes do localStorage
      const presentes = JSON.parse(localStorage.getItem('participantesPresentes')) || [];
      
      // Transformar o objeto em um array com { nome, horario }
      const presentesArray = Object.entries(presentes).map(([nome, horario]) => ({
        nome,
        horario
      }));

      // Ordenar os participantes pela ordem de chegada (horário)
      const presentesOrdenados = presentesArray.sort((a, b) => new Date(a.horario) - new Date(b.horario));

      setParticipantesPresentes(presentesOrdenados);

      // Verifique se os participantes estão sendo carregados corretamente
      console.log('Participantes presentes carregados e ordenados:', presentesOrdenados);
    }
  }, []);

  // Função para imprimir o relatório
  const imprimirRelatorio = () => {
    window.print(); // Abre a caixa de diálogo de impressão do navegador
  };

  // Função para salvar o relatório como PDF em formato de tabela
  const salvarRelatorioPDF = () => {
    const doc = new jsPDF();

    // Centralizar o título "Relatório de Presença"
    const title = "Relatório de Presença";
    const pageWidth = doc.internal.pageSize.getWidth(); // Largura da página
    const textWidth = doc.getTextWidth(title); // Largura do texto
    const textX = (pageWidth - textWidth) / 2; // Cálculo para centralizar o texto

    // Adicionar o título
    doc.text(title, textX, 10);

    // Adicionar nome do curso logo abaixo do título
    const cursoWidth = doc.getTextWidth(curso);
    const cursoX = (pageWidth - cursoWidth) / 2; 
    doc.text(curso, cursoX, 20);

    // Adicionar tabela de participantes presentes no PDF
    doc.autoTable({
      head: [['Nome', 'Horário de Chegada']], // Cabeçalhos da tabela
      body: participantesPresentes.map(participante => [participante.nome, participante.horario]), // Linhas da tabela
      startY: 30, // Define a posição Y inicial para a tabela
      theme: 'striped', // Tema da tabela
      headStyles: { fillColor: [74, 20, 140] }, // Cor do cabeçalho em RGB (roxo escuro)
      styles: { halign: 'center' }, // Alinhamento horizontal centralizado
    });

    // Adicionar informações adicionais
    const agora = new Date();
    const dataGeracao = `Data e Hora de Geração: ${agora.toLocaleDateString()} ${agora.toLocaleTimeString()}`;
    const metodoGeracao = 'Relatório gerado usando o sistema de gestão de presença. Trecap';
    doc.setFontSize(8);

    doc.text(dataGeracao, 10, doc.internal.pageSize.height - 20);
    doc.text(metodoGeracao, 10, doc.internal.pageSize.height - 15);

    // Adicionar assinatura digital com fonte pequena e no rodapé
    const assinatura = 'Assinado digitalmente por: Sistema de Gestão de Presença Trecap';
    doc.setFontSize(8); // Define o tamanho da fonte para 8
    doc.text(assinatura, 10, doc.internal.pageSize.height - 10); // Posiciona o texto no rodapé

    // Salvar o PDF
    doc.save("relatorio-presenca.pdf");
  };

  return (
    <>
      <MenuLateral />

      <div className={styles.Header}>
        <div className={styles.relatorio}>
          <h1>RELATÓRIO DE PRESENÇA</h1>
          <h2>{curso}</h2> {/* Nome do curso na página */}

          <div className={styles.cadastro}>
            <h2>Participantes Presentes</h2>

            <div className={styles.listaParticipantes}>
              <ul className={styles.lista}>
                {participantesPresentes.length > 0 ? (
                  participantesPresentes.map((participante, index) => (
                    <li key={index} className={styles.participanteItem}>
                      <label>
                        {participante.nome} - Chegada: {participante.horario}
                      </label>
                    </li>
                  ))
                ) : (
                  <p>Nenhum participante presente.</p>
                )}
              </ul>
            </div>
          </div>

          {/* Botão para imprimir o relatório */}
          <button className={styles.botaoImprimir} onClick={imprimirRelatorio}>
            Imprimir Relatório
          </button>

          {/* Botão para salvar o relatório em PDF */}
          <button className={styles.botaoImprimir} onClick={salvarRelatorioPDF}>
            Salvar Relatório
          </button>
        </div>
      </div>
    </>
  );
}
