"use client";

import { useState } from "react";
import styles from "../presenca/page.module.css";
import CabecalhoLogado from "@/CabecalhoLogado/page";

export default function CheckinEvento() {
<<<<<<< Updated upstream
  const [mostrarAlerta, setMostrarAlerta] = useState(true);

  const fecharAlerta = () => {
    setMostrarAlerta(false);
  };
=======
    const [mostrarAlerta, setMostrarAlerta] = useState(true);

    const fecharAlerta = () => {
        setMostrarAlerta(false);
    };
>>>>>>> Stashed changes

  return (
    <>
      <CabecalhoLogado />

<<<<<<< Updated upstream
      <div className={styles.Header}>
        <div className={styles.checkin}>
          <h1>TREINAMENTO SOBRE HIGIENE NO TRABALHO</h1>

          <div className={styles.cadastro}>
            <h2>Lista de Colaboradores</h2>
            <div>
              {mostrarAlerta && (
                <div className={styles.alerta}>
                   <p>
                    Evento sem participantes. Cadastre participantes ao evento.
                  </p>
                  <button onClick={fecharAlerta} className={styles.botaoFechar}>
                    Fechar
                  </button>
                </div>
              )}
=======
    return (

        <>
            <CabecalhoLogado />


            <div className={styles.Header} >

                <div className={styles.checkin}>
                    <h1>TREINAMENTO SOBRE HIGIENE NO TRABALHO</h1>


                    <div className={styles.cadastro} >
                        <h2>Lista de Colaboradores</h2>
                        <div>
                            {mostrarAlerta && (
                                <div className={styles.alerta}>
                                    <p>Evento sem participantes. Cadastre participantes ao evento.</p>
                                    <button onClick={fecharAlerta} className={styles.botaoFechar}>Fechar</button>
                                </div>
                            )}

                        </div>
                    </div>


                    <button className={styles.botaoCadastro}>Cadastrar participantes</button>

                </div>


>>>>>>> Stashed changes
            </div>
          </div>

<<<<<<< Updated upstream
          <button className={styles.botaoCadastro}>
            Adicionar participantes
          </button>
        </div>
      </div>
    </>
  );
}
=======
        </>


    )
}
>>>>>>> Stashed changes
