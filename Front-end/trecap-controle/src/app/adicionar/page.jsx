"use client";

import { useState } from "react";
import styles from "../adicionar/page.module.css";
import CabecalhoLogado from "@/CabecalhoLogado/page";

export default function CheckinEvento() {
  const [mostrarAlerta, setMostrarAlerta] = useState(true);

  const fecharAlerta = () => {
    setMostrarAlerta(false);
  };

  const participantes = [
    "Arlindo Goveia Santos",
    "Artur Fernandes Silva",
    "Bruno Alves Souza",
    "Carlos Emanuel Santos",
    "Douglas Bispo",
    "Ronaldinho",
    "Romarinhooooooooooo",
  ];

  return (
    <>
      <CabecalhoLogado />

      <div className={styles.Header}>
        <div className={styles.checkin}>
          <h1>TREINAMENTO SOBRE HIGIENE NO TRABALHO</h1>

          <div className={styles.cadastro}>
            <h2>Adicionar Participantes</h2>
            <h3>Setor Selecionado: Produção</h3>
            <div>
              {mostrarAlerta && (
                <div className={styles.alerta}>
                  <p>Selecione os participantes.</p>
                  <button onClick={fecharAlerta} className={styles.botaoFechar}>
                    Ok
                  </button>
                </div>
              )}

              <div className={styles.listaParticipantes}>
                <ul className={styles.participantes}>
                  {participantes.map((participante, index) => (
                    <p key={index} className={styles.participanteItem}>
                      <p>{participante}</p>
                      
                      <input type="checkbox" className={styles.checkbox} />
                    </p>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <button className={styles.botaoCadastro}>Salvar</button>
        </div>
      </div>
    </>
  );
}
