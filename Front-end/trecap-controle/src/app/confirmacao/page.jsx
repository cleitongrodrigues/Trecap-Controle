"use client";

import styles from "./page.module.css";
import Image from "next/image";
import CabecalhoLogado from "@/CabecalhoLogado/page";
import biometria from "../../assets/biometria.png";

export default function CheckinEvento() {
  // Lista de participantes mockada (você pode substituí-la por dados dinâmicos se necessário)
  const participantesMock = [
    { nome: "Arlindo Goveia Santos" },
    { nome: "Artur Fernandes Silva" },
    { nome: "Bruno Alves Souza" },
    { nome: "Carlos Emanuel Santos" },
    { nome: "Douglas Bispo" },
    { nome: "Ronaldinho" },
    { nome: "Romarinhooooooooooo" },
  ];

  return (
    <>
      <CabecalhoLogado />

      <div className={styles.Header}>
        <div className={styles.checkin}>
          <h1>TREINAMENTO SOBRE HIGIENE NO TRABALHO</h1>

          <div className={styles.cadastro}>
            <h2>Lista de Colaboradores Presentes</h2>
            
            <ul className={styles.listaParticipantes}>
              {participantesMock.map((participante, index) => (
                <li key={index} className={styles.participanteItem}>
                  <label>{participante.nome}</label>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.biometriaContainer}>
          <button className={styles.botaoCadastro}>
            <Image src={biometria} alt="Ícone de biometria" className={styles.biometriaIcon} />
            Insira sua digital para registrar a presença
          </button>
          <button className={styles.botaoCancelar}>Cancelar</button>
        </div>
      </div>
    </>
  );
}
