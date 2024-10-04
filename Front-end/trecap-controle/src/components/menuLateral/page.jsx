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
  MdLogout,
} from "react-icons/md";
import axios from "axios";
import styles from "./page.module.css";
import Image from "next/image";
import logo from "../../assets/logoBranca.svg";
import { usePathname } from "next/navigation";
import Modal from "./ReactDom";
import Swal from "sweetalert2";
import InputMask from "react-input-mask";

const validacoes = {
  email: {
    validate(value) {
      const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
      return regex.test(value);
    },
    messageError: "Email inválido",
  },
  cpf: {
    validate(value) {
      const regex =
        /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/;
      return regex.test(value);
    },
    messageError: "CPF inválido!",
  },
  nome: {
    validate(value) {
      const regex = /^[a-zA-ZÀ-ÿ\s]+$/;
      return value.length >= 3 && regex.test(value);
    },
    messageError: "Nome inválido!",
  },
  telefone: {
    validate(value) {
      const regex = /^\(?\d{2}\)?[\s-]?9?\d{4}[-]?\d{4}$/;
      return regex.test(value);
    },
    messageError: "Digite um número válido!",
  },
};

const MenuLateral = () => {
  const [lista, setLista] = useState([]);
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selecionaImagem, setSelecionaImagem] = useState(null);
  const [visuImagem, setVisuImagem] = useState(null);
  const [usuarioInfo, setUsuarioInfo] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
  });
  const [editando, setEditando] = useState(false);
  const [emailErro, setEmailErro] = useState("");
  const [cpfErro, setCpfErro] = useState("");
  const [nomeErro, setNomeErro] = useState("");
  const [telefoneErro, setTelefoneErro] = useState("");

  const pathName = usePathname();

  const getUsuario = async () => {
    try {
      const response = await axios.get(`http://localhost:3333/usuario`);
      const dadosUsuario = response.data.dados;
      setLista(dadosUsuario);

      const usuarioAtual = dadosUsuario[0];
      setNomeUsuario(usuarioAtual.usu_nome);
      setUsuarioInfo({
        nome: usuarioAtual.usu_nome,
        cpf: usuarioAtual.usu_CPF,
        email: usuarioAtual.usu_email,
        telefone: usuarioAtual.usu_telefone,
      });
    } catch (error) {
      console.error("Erro ao buscar usuários", error);
    }
  };

  useEffect(() => {
    getUsuario();
  }, []);

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    setEditando(false); // Reseta o estado de edição ao fechar o modal
    setVisuImagem(null); // Limpa a prévia da imagem ao fechar
    setSelecionaImagem(null); // Reseta o arquivo da imagem ao fechar
  };

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelecionaImagem(file);
      setVisuImagem(URL.createObjectURL(file)); // Prévia da imagem
    }
  };

  const handleChange = (e) => {
    setUsuarioInfo({
      ...usuarioInfo,
      [e.target.id]: e.target.value,
    });
  };

  const toggleEdit = () => {
    setEditando(!editando);
  };

  const validarCampos = () => {
    setEmailErro("");
    setCpfErro("");
    setNomeErro("");
    setTelefoneErro("");

    const emailValido = validacoes.email.validate(usuarioInfo.email);
    const cpfValido = validacoes.cpf.validate(usuarioInfo.cpf);
    const nomeValido = validacoes.nome.validate(usuarioInfo.nome);
    const telefoneValido = validacoes.telefone.validate(usuarioInfo.telefone);

    if (!emailValido) {
      setEmailErro(validacoes.email.messageError);
      return false;
    }

    if (!cpfValido) {
      setCpfErro(validacoes.cpf.messageError);
      return false;
    }

    if (!nomeValido) {
      setNomeErro(validacoes.nome.messageError);
      return false;
    }

    if (!telefoneValido) {
      setTelefoneErro(validacoes.telefone.messageError);
      return false;
    }

    return true;
  };

  const salvarAlteracoes = async () => {
    if (!validarCampos()) return;

    try {
      const usuarioId = lista[0].usu_id;
      const cpfSemFormatacao = usuarioInfo.cpf.replace(/[.-]/g, "");

      const dadosAtualizados = {
        usu_nome: usuarioInfo.nome,
        usu_CPF: cpfSemFormatacao,
        usu_email: usuarioInfo.email,
        usu_telefone: usuarioInfo.telefone,
        tipo_usuario_id: 1,
        usu_ativo: 1,
        usu_data_cadastro: "2024-09-23",
        empresa_id: 1,
      };

      const response = await axios.patch(
        `http://localhost:3333/usuario/${usuarioId}`,
        dadosAtualizados
      );

      if (response.status === 200) {
        Swal.fire({
          title: "Enviado!",
          text: "Dados alterados com sucesso!",
          icon: "success",
          backdrop: false,
        });
        setEditando(false);
        setEmailErro("");
        setNomeErro("");
        setTelefoneErro("");
      }
    } catch (error) {
      console.error("Erro ao salvar alterações", error);
      alert("Erro ao salvar alterações");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o envio padrão do formulário
    const usuarioId = lista[0].usu_id;
    const formData = new FormData();
    formData.append('image', selecionaImagem);
    formData.append('userCode', usuarioId);

    try {
      const response = await axios.post(`http://localhost:3333/upload`, formData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        Swal.fire({
          title: 'Enviado',
          text: 'Imagem enviada com sucesso',
          icon: 'success',
          backdrop: false,
        });
        setVisuImagem(response.data.imagePath); // Exibe a nova imagem
        closeModal(); // Fecha o modal após o upload
      }
    } catch (error) {
      console.error("Erro ao fazer upload", error);
      alert("Erro ao fazer upload da imagem");
    }
  };

  return (
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
              {visuImagem ? (
                <img
                  src={visuImagem}
                  alt="Foto do usuário"
                  className={styles.ImagemPerfil}
                />
              ) : (
                <MdAccountCircle />
              )}
              {nomeUsuario || "Nome"}
            </Link>
          </div>

          {/* Modal */}
          <Modal isOpen={modalOpen} closeModal={closeModal}>
            <div className={styles.modalTeste}>
              <div className={styles.modalContent}>
                <h2>Perfil</h2>
                <form onSubmit={handleSubmit}>
                  <label>Foto de Perfil</label>
                  <div className={styles.imagePreviewContainer}>
                    {visuImagem ? (
                      <img src={visuImagem} alt="Foto de perfil" />
                    ) : (
                      <MdAccountCircle size={64} />
                    )}
                  </div>
                  <input type="file" accept="image/*" onChange={handleImagemChange} />
                  <button type="submit">Salvar imagem</button>
                  <label htmlFor="nome">Nome:</label>
                  <input
                    type="text"
                    id="nome"
                    value={usuarioInfo.nome}
                    onChange={handleChange}
                    disabled={!editando}
                  />
                  {nomeErro && <span className={styles.error}>{nomeErro}</span>}

                  <label htmlFor="cpf">CPF:</label>
                  <InputMask
                    mask="999.999.999-99"
                    id="cpf"
                    value={usuarioInfo.cpf}
                    onChange={handleChange}
                    disabled={!editando}
                  />
                  {cpfErro && <span className={styles.error}>{cpfErro}</span>}

                  <label htmlFor="email">Email:</label>
                  <input
                    type="text"
                    id="email"
                    value={usuarioInfo.email}
                    onChange={handleChange}
                    disabled={!editando}
                  />
                  {emailErro && <span className={styles.error}>{emailErro}</span>}

                  <label htmlFor="telefone">Telefone:</label>
                  <InputMask
                    mask="(99) 99999-9999"
                    id="telefone"
                    value={usuarioInfo.telefone}
                    onChange={handleChange}
                    disabled={!editando}
                  />
                  {telefoneErro && <span className={styles.error}>{telefoneErro}</span>}
                  <button type="button" onClick={toggleEdit}>
                    {editando ? "Salvar" : "Editar"}
                  </button>
                  {editando && (
                    <button type="button" onClick={salvarAlteracoes}>
                      Salvar Alterações
                    </button>
                  )}
                  <button type="button" onClick={closeModal}>
                    Fechar
                  </button>
                </form>
              </div>
            </div>
          </Modal>

          {/* Links do Menu */}
          <Link href="/home/gestor" className={pathName === "/home/gestor" ? styles.active : ""}>
            <MdCalendarMonth />
            Dashboard
          </Link>
          <Link href="/home/turmas" className={pathName === "/home/turmas" ? styles.active : ""}>
            <MdHourglassBottom />
            Turmas
          </Link>
          <Link href="/home/relatorios" className={pathName === "/home/relatorios" ? styles.active : ""}>
            <MdEventNote />
            Relatórios
          </Link>
          <Link href="/home/colaboradores" className={pathName === "/home/colaboradores" ? styles.active : ""}>
            <MdPeople />
            Colaboradores
          </Link>
          <Link href="/home/configuracoes" className={pathName === "/home/configuracoes" ? styles.active : ""}>
            <MdSettings />
            Configurações
          </Link>
          <Link href="/" className={styles.sair}>
            <MdLogout />
            Sair
          </Link>
        </div>
      </IconContext.Provider>
    </div>
  );
};

export default MenuLateral;
