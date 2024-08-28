"use client";
import styles from "./page.module.css";
import Image from "next/image";
import logoBranca from "../../../assets/logoBranca.svg";
import { useState } from "react";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";


export default function esqueceuSenha() {
  const [ocult, setOcult] = useState(<IoEyeOffOutline className={styles.icon}/>);
  const [keytype, setKeytype] = useState('password')

  return (
    <div className={styles.container}>
      <div className={styles.divflexbox}>
        <div className={styles.containerRoxo}>
          <div className={styles.row}>
            <h1 className={styles.trecapTitlle}>TreCap</h1>
            <Image
              className={styles.image}
              src={logoBranca}
              width={83}
              height={85}
              alt="Logo"
            />
          </div>
          <h1 className={styles.trecapSubTitlle}>
            Treinamento e capacitação para colaboradores
          </h1>
        </div>
        <div className={styles.containerClaro}>
          <div className={styles.gridcontainer}>
            <h1 className={styles.login}>Login</h1>
          </div>
          <div>
            <h3 className={styles.campos}>Email:</h3>
            <input className={styles.textBox} placeholder="Digiete Seu Email" />
          </div>

          <div>
            <h3 className={styles.campos}>Senha:</h3>
            <div className={styles.containerBotao}>
              <input
                className={styles.textBox}
                type={keytype}
                placeholder="Digiete Sua senha"
              />

              <button 
                onClick={() => setOcult( ocult=<IoEyeOffOutline/> ? setOcult(<IoEye/>) : setOcult(<IoEyeOffOutline/>)}
                className={styles.botao}  
              >
                {ocult}
              </button>
            </div>
          </div>

          <div className={styles.gridcontainer}>
            <button className={styles.button}>ENVIAR!</button>
          </div>
        </div>
      </div>
    </div>
  );
}
