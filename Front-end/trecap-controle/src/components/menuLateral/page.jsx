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
import { usePathname } from 'next/navigation';

const MenuLateral = () => {
  const [lista, setLista] = useState([]);
  const [nomeColaborador, setNomeColaborador] = useState("");
  const [modalOpen, setModalOpen] = useState(false); // Mover estado do modal aqui
  const pathName = usePathname();

  const getColaboradores = async () => {
    try {
      const response = await axios.get(`http://localhost:3333/usuario`);
      const dadosColaboradores = response.data.dados;
      console.log(dadosColaboradores[0].usu_nome);
      setLista(dadosColaboradores);
      
      // Supondo que o colaborador atual seja o primeiro da lista (ajuste conforme necessário)
      setNomeColaborador(dadosColaboradores[0].usu_nome);
    } catch (error) {
      console.error("Erro ao buscar colaboradores", error);
    }
  };

  useEffect(() => {
    getColaboradores();
  }, []);

  console.log(pathName);

  // Funções para abrir e fechar o modal
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

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
            {/* {lista &&
                    lista.map((colaborador, index) => ( */}
            <div className={styles.Perfil}>
              <Link href="#" onClick={openModal}> {/* Mudar o href para evitar navegação */}
                <MdAccountCircle /> {nomeColaborador || "Nome"} {/* Aqui vai o nome */}
              </Link>
              {/* Modal */}
              {modalOpen && (
                <div className={styles.modal}>
                  <div className={styles.modalContent}>
                    <h2>Perfil do Colaborador</h2>
                    <form>
                      <label htmlFor="">Nome</label>
                      <input type="text" placeholder="Nome"/>
                      <label htmlFor="">CPF</label>
                      <input type="text" placeholder="CPF"/>
                      <label htmlFor="">Email</label>
                      <input type="text" placeholder="Email"/>
                      <label htmlFor="">Telefone</label>
                      <input type="text" placeholder="Telefone"/>
                    </form>
                    <button onClick={closeModal}>Fechar</button>
                  </div>
                </div>
              )}
            </div>
            <Link className={pathName === "/eventos" ? styles.active : ''} href="/eventos">
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
