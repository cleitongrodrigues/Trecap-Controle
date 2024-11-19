import React, { useState, useEffect, useContext } from "react";
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
import Calendario from "@/app/Calendario/page";
import { UserContext } from "@/context/userContext";
import ProtectedRoute from "../ProtectedRoute";

const validacoes = {
  email: {
    validate(value) {
      const regex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
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
  const { user, handleLogout, fetchUserData, token } = useContext(UserContext)

  const [userData, setUserData] = useState({ ...user })


  const [lista, setLista] = useState([]);
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selecionaImagem, setSelecionaImagem] = useState(null);
  const [visuImagem, setVisuImagem] = useState(null);
  const [usuarioInfo, setUsuarioInfo] = useState({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    visuImagem: ""
  });
  const [editando, setEditando] = useState(false);

  const [emailErro, setEmailErro] = useState("");

  const [cpfErro, setCpfErro] = useState("");

  const [nomeErro, setNomeErro] = useState("");

  const [telefoneErro, setTelefoneErro] = useState("");

  const pathName = usePathname();

  const handleChangeDataUser = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    setUserData((prevalue) => {
      return {
        ...prevalue,   // Spread Operator               
        [name]: value
      }
    })


  }

  useEffect(() => {
    async function teste(){
      await fetchUserData(token)
    }
    teste()
  }, []);

  // const getUserData = async usu_id => {
  //   const response = await axios.get(`http://localhost:3333/usuarios/${usu_id}`);
  //   const userData = response.data.dados
  //   setUserData(userData)
  // }

  // Funções para abrir e fechar o modal
  const openModal = () => setModalOpen(true);

  const closeModal = () => {
    setModalOpen(false);
    setEditando(false); // Reseta o estado de edição ao fechar o modal
  };

  // Função para lidar com a troca de imagem
  const handleImagemChange = (e) => {
    const file = e.target.files[0]; // Corrigido para 'files'
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

  const salvarAlteracoes = async () => {
    const emailValido = validacoes.email.validate(usuarioInfo.email);

    const cpfValido = validacoes.cpf.validate(usuarioInfo.cpf);

    const nomeValido = validacoes.nome.validate(usuarioInfo.nome);

    const telefoneValido = validacoes.telefone.validate(usuarioInfo.telefone);

    setEmailErro("");
    setCpfErro("");
    setNomeErro("");
    setTelefoneErro("");

    if (!emailValido) {
      setEmailErro(validacoes.email.messageError);
      return;
    }

    if (!cpfValido) {
      setCpfErro(validacoes.cpf.messageError);
      return;
    }

    if (!nomeValido) {
      setNomeErro(validacoes.nome.messageError);
      return;
    }

    if (!telefoneValido) {
      setTelefoneErro(validacoes.telefone.messageError);
      return;
    }

    try {
      const usuarioId = lista[0].usu_id;

      const cpfSemFormatacao = usuarioInfo.cpf.replace(/[.-]/g, "");

      const dadosAtualizados = {
        usu_nome: usuarioInfo.nome,
        usu_CPF: cpfSemFormatacao,
        usu_email: usuarioInfo.email,
        usu_telefone: usuarioInfo.telefone,
        usu_img: usuarioInfo.visuImagem,
        tipo_usuario_id: 1,
        usu_ativo: 1,
        usu_data_cadastro: "2024-09-23",
        empresa_id: 1,
      };

      // console.log(usuarioInfo);

      const response = await axios.patch(
        `http://localhost:3333/usuario/${usuarioId}`,

        dadosAtualizados
      );

      console.log(response);

      if (response.status === 200) {
        Swal.fire({
          title: "Enviado!",
          text: "Dados alterados com sucesso!",
          icon: "success",
          backdrop: false,
        }).then(() => {
          window.location.reload();
        });
        setEditando(false);
        setEmailErro("");
        setNomeErro("");
        setTelefoneErro("");
      }
    } catch (error) {
      console.error("Erro ao salvar alterações", error);
      alert("Erro ao salvar aterações");
    }
  };

  const handleSubmit = async () => {
    // Validações dos campos de texto
    // const emailValido = validacoes.email.validate(usuarioInfo.email);
    // const cpfValido = validacoes.cpf.validate(usuarioInfo.cpf);
    // const nomeValido = validacoes.nome.validate(usuarioInfo.nome);
    // const telefoneValido = validacoes.telefone.validate(usuarioInfo.telefone);

    setEmailErro("");
    setCpfErro("");
    setNomeErro("");
    setTelefoneErro("");

    // Verifica se todos os campos são válidos antes de continuar
    // if (!emailValido) {
    //   setEmailErro(validacoes.email.messageError);
    //   return;
    // }

    // if (!cpfValido) {
    //   setCpfErro(validacoes.cpf.messageError);
    //   return;
    // }

    // if (!nomeValido) {
    //   setNomeErro(validacoes.nome.messageError);
    //   return;
    // }

    // if (!telefoneValido) {
    //   setTelefoneErro(validacoes.telefone.messageError);
    //   return;
    // }

    // Se a imagem foi alterada, faz o upload
    if (!selecionaImagem) {
      Swal.fire({
        title: 'Erro!',
        text: 'Selecione uma imagem antes de salvar.',
        icon: 'error',
        backdrop: false,
      });
      return; // Impede o envio se nenhuma imagem for selecionada
    }

    // Faz o envio da imagem
    const usuarioId = userData.usu_id // seleciona o primeiro usuário da lista

    const formData = new FormData();
    formData.append('img', selecionaImagem);
    formData.append('userCode', usuarioId);

    try {
      const response = await axios.patch(
        `http://localhost:3333/usuario/${usuarioId}/imagem`,
        formData,
        { headers: { 'content-type': 'multipart/form-data' } }
      );

      if (response.status === 200) {
        const NovaImagem = response.data.imagePath;
        // setUsuarioInfo((prev) => ({
        //   ...prev,
        //   visuImagem: NovaImagem
        // }));

        Swal.fire({
          title: 'Enviado',
          text: 'Imagem enviada com sucesso!',
          icon: 'success',
          backdrop: false,
        });
      }
    } catch (error) {
      console.error("Erro ao fazer upload", error);
      Swal.fire({
        title: 'Erro!',
        text: 'Houve um problema ao enviar a imagem.',
        icon: 'error',
        backdrop: false,
      });
    }

    // Após o upload da imagem, salva os dados do usuário (nome, cpf, email, etc)
    // const cpfSemFormatacao = usuarioInfo.cpf.replace(/[.-]/g, "");
    // const dadosAtualizados = {
    //   usu_nome: usuarioInfo.nome,
    //   usu_CPF: cpfSemFormatacao,
    //   usu_email: usuarioInfo.email,
    //   usu_telefone: usuarioInfo.telefone,
    //   usu_img: usuarioInfo.visuImagem,
    //   tipo_usuario_id: 1,
    //   usu_ativo: 1,
    //   usu_data_cadastro: "2024-09-23",
    //   empresa_id: 1,
    // };

    

    try {
      const response = await axios.patch(
        `http://localhost:3333/usuario/${usuarioId}`,
        userData
      );

      if (response.status === 200) {
        Swal.fire({
          title: "Enviado!",
          text: "Dados alterados com sucesso!",
          icon: "success",
          backdrop: false,
        }).then(() => {
          
        });
        setEditando(false);
      }
    } catch (error) {
      console.error("Erro ao salvar alterações", error);
      Swal.fire({
        title: 'Erro!',
        text: 'Erro ao salvar alterações',
        icon: 'error',
        backdrop: false,
      });
    }

    await fetchUserData(token)
  };


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
                  {user ? (
                    <img
                      src={userData.usu_img}
                      alt="Foto do usuário"
                      className={styles.ImagemPerfil}
                    />
                  ) : (
                    <MdAccountCircle />
                  )}
                  {user.usu_nome || "Nome"}
                </Link>
              </div>

              {/* Modal */}
              <Modal isOpen={modalOpen} closeModal={closeModal}>
                <div className={styles.modalTeste}>
                  <div className={styles.modalContent}>
                    <h2>Perfil</h2>
                    <form onSubmit={(e) => e.preventDefault()}>
                      <label>Foto de Perfil</label>
                      <div className={styles.imagePreviewContainer}>
                        {userData.usu_img ? (
                          <img src={userData.usu_img} alt="Foto de perfil" />
                        ) : (
                          <MdAccountCircle size={64} />
                        )}
                      </div>

                      {editando && (
                        <>
                          <label htmlFor="imageUpload" className={styles.EscollherArquivo}>
                            Escolher Arquivo
                          </label>
                          <input
                            className={styles.file}
                            type="file"
                            id="imageUpload"
                            accept="image/*"
                            onChange={handleImagemChange}
                          />
                        </>
                      )}

                      <label htmlFor="nome">Nome</label>
                      <input
                        id="nome"
                        type="text"
                        value={userData.usu_nome}
                        name="usu_nome"
                        onChange={handleChangeDataUser}
                        placeholder="Nome"
                        readOnly={!editando}
                      />
                      {nomeErro && <p style={{ color: "red" }}>{nomeErro}</p>}

                      <label htmlFor="cpf">CPF</label>
                      <InputMask
                        mask="999.999.999-99"
                        id="cpf"
                        type="text"
                        name="usu_CPF"
                        value={userData.usu_CPF}
                        onChange={handleChangeDataUser}
                        placeholder="CPF"
                        readOnly={!editando}
                      />
                      {cpfErro && <p style={{ color: "red" }}>{cpfErro}</p>}

                      <label htmlFor="email">Email</label>
                      <input
                        id="email"
                        type="text"
                        value={userData.usu_email}
                        name="usu_email"
                        onChange={handleChangeDataUser}
                        placeholder="Email"
                        readOnly={!editando}
                      />
                      {emailErro && <p style={{ color: "red" }}>{emailErro}</p>}

                      <label htmlFor="telefone">Telefone</label>
                      <InputMask
                        id="telefone"
                        mask="(99) 99999-9999"
                        type="text"
                        value={userData.usu_telefone}
                        name="usu_telefone"
                        onChange={handleChangeDataUser}
                        placeholder="Telefone do usuário"
                        readOnly={!editando}
                      />
                      {telefoneErro && <p style={{ color: "red" }}>{telefoneErro}</p>}
                    </form>

                    <button onClick={editando ? handleSubmit : toggleEdit}>
                      {editando ? "Salvar" : "Editar"}
                    </button>

                    <button onClick={closeModal}>Fechar</button>
                  </div>
                </div>
              </Modal>


              <Link
                className={pathName === "/eventos" ? styles.active : ""}
                href="/eventos"
              >
                <MdEventNote /> Eventos
              </Link>
              <Link href="/historico">
                <MdHourglassBottom /> Histórico
              </Link>
              <Link
                className={
                  pathName === "/Calendario" ? styles.active : ""
                }
                href="/Calendario"
              >
                <MdCalendarMonth /> Calendário
              </Link>

              <Link
                className={
                  pathName === "/usuario/cadastroColaborador" ? styles.active : ""
                }
                href="/usuario/cadastroColaborador"
              >
                <MdPeople /> Colaboradores
              </Link>
            </div>

            <div className={styles.menuFooter}>
              <Link href="/configuracoes">
                <MdSettings /> Configurações
              </Link>
              <Link href="/usuario/login" onClick={handleLogout}>
                <MdLogout /> Sair
              </Link>
            </div>
          </IconContext.Provider>
        </div>
    </>
  );
};

export default MenuLateral;