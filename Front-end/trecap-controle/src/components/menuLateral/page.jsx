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
import axios from "axios";
import styles from "./page.module.css";
import Image from "next/image";
import logo from "../../assets/logoBranca.svg";
import { usePathname } from 'next/navigation';
import Modal from "./ReactDom";

const MenuLateral = () => {
  const [lista, setLista] = useState([]);
  const [nomeColaborador, setNomeColaborador] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selecionaImagem, setSelecionaImagem] = useState(null);
  const [visuImagem, setVisuImagem] = useState(null);
  const pathName = usePathname();

  const getColaboradores = async () => {
    try {
      const response = await axios.get(`http://localhost:3333/usuario`);
      const dadosColaboradores = response.data.dados;
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

  // Funções para abrir e fechar o modal
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // Função para lidar com a troca de imagem
  const handleImagemChange = (e) => {
    const file = e.target.files[0]; // Corrigido para 'files'
    if (file) {
      setSelecionaImagem(file);
      setVisuImagem(URL.createObjectURL(file)); // Prévia da imagem
    }
  }

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
              <Link href="#" onClick={openModal}>
                <MdAccountCircle /> {nomeColaborador || "Nome"} {/* Aqui vai o nome */}
              </Link>
            </div>

            {/* Modal */}
            <Modal isOpen={modalOpen} closeModal={closeModal}>
              <div className={styles.modalTeste}>
                <div className={styles.modalContent}>
                  <h2>Perfil do Colaborador</h2>
                  <form>
                    <label>Foto de Perfil</label>
                    <div className={styles.imagePreviewContainer}>
                      {visuImagem ? ( /* Corrigido para 'visuImagem' */
                        <img src={visuImagem} alt="Foto de perfil"/>
                      ) : (
                        <img src="url_da_imagem_atual_aqui" alt="Foto de perfil atual" />
                      )}
                    </div>
                    <label htmlFor="imageUpload" className={styles.EscollherArquivo}>Escolher Arquivo</label>
                    <div className={styles.file}>
                      <input
                        className={styles.file}
                        type="file"
                        id="imageUpload"
                        accept="image/*"
                        onChange={handleImagemChange}
                      />
                    </div>
                      <label htmlFor="">Nome</label>
                      <input type="text" placeholder="Nome" />
                      <label htmlFor="">CPF</label>
                      <input type="text" placeholder="CPF" />
                      <label htmlFor="">Email</label>
                      <input type="text" placeholder="Email" />
                      <label htmlFor="">Telefone</label>
                      <input type="text" placeholder="Telefone" />
                  </form>
                  <button onClick={closeModal}>Fechar</button>
                </div>
              </div>
            </Modal>

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
