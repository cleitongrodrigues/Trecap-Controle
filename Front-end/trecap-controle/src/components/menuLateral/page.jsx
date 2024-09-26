import React, { useState, useEffect } from "react";
import Link from "next/link";
import { IconContext } from "react-icons";
import {
  MdCalendarMonth,
  MdHourglassBottom,
  MdEventNote,
  MdPeople,
  MdSettings,
  MdAccountCircle,
  MdLogout
} from "react-icons/md";
import axios from "axios"; // Certifique-se de importar axios
import styles from "./page.module.css"; // CSS para o menu lateral
import Image from "next/image";
import logo from "../../assets/logoBranca.svg";
import { usePathname } from 'next/navigation'


const MenuLateral = () => {
  const [nomeColaborador, setNomeColaborador] = useState("");
  const pathName = usePathname()

  const getColaboradores = async () => {
    try {
      const response = await axios.get(`http://localhost:3333/usuario`);
      const dadosColaboradores = response.data.dados;
      console.log(dadosColaboradores[0].usu_nome)
      
      // Supondo que o colaborador atual seja o primeiro da lista (ajuste conforme necessário)
      setNomeColaborador(dadosColaboradores[0].usu_nome);
    } catch (error) {
      console.error("Erro ao buscar colaboradores", error);
    }
  };

  useEffect(() => {
    getColaboradores();
  }, []);
  console.log(pathName)

  return (
    <>
      <div className={styles.menuLateral}>
        <IconContext.Provider value={{ size: "2rem" }}>
          <div className={styles.menuItems}>
            <div className={styles.logo}>
              <Link href="/home/gestor">
                <h1 className={styles.logoTexto}>Trecap</h1>
                <Image src={logo} className={styles.logoImage} />
              </Link>
            </div>
            <div className={styles.Perfil}>
              <Link href="/perfil">
                <MdAccountCircle /> {nomeColaborador || "Nome"} {/* Aqui vai o nome */}
              </Link>
            </div>
            <Link className={pathName === "/eventos" ? styles.active : ''}href="/eventos">
              <MdEventNote /> Eventos
            </Link>
            <Link href="/historico">
              <MdHourglassBottom /> Histórico
            </Link>
            <Link href="/calendario">
              <MdCalendarMonth /> Calendário
            </Link>
            <Link className={pathName === "/usuario/cadastroColaborador" ? styles.active : ''} href="/usuario/cadastroColaborador">
              <MdPeople /> Colaboradores
            </Link>
          </div>

          <div className={styles.menuFooter}>
            <Link href="/configuracoes">
              <MdSettings /> Configurações
            </Link>
            <Link href="/usuario/login">
              <MdLogout /> Sair
            </Link>
          </div>
        </IconContext.Provider>
      </div>
    </>
  );
};

export default MenuLateral;
