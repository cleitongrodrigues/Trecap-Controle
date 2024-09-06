"use client";

import styles from "./page.module.css";
import CabecalhoLogado from "@/CabecalhoLogado/page";

export default function CheckinEvento() {

      return (
            <>
            <CabecalhoLogado />


            <div className={styles.Header} >

                <div className={styles.checkin}>
                    <h1>TREINAMENTO SOBRE HIGIENE NO TRABALHO</h1>


                    <div className={styles.cadastro} >
                        <h2>Lista de Colaboradores Presen</h2>
                        <div>
                            <ul>
                                <li>Teste</li>
                            </ul>
                        </div>
                    </div>


                    <button className={styles.botaoCadastro}>Insira sua digital para registrar a presença</button>

                </div>
            </div>          
        </>

    )
}

