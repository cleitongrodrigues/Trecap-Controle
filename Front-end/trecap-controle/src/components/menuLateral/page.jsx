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
  // const [editando, setEditando] = useState(false);
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
      console.error("Erro ao buscar usuarios", error);
    }
  };

  useEffect(() => {
    getUsuario();
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
                {visuImagem ? (
                  <img
                    src={visuImagem}
                    alt="Foto do usuário"
                    className={styles.ImagemPerfil}
                  />
                ) : (
                  <MdAccountCircle />
                )}
                {nomeUsuario || "Nome"} {/* Aqui vai o nome */}
              </Link>
            </div>

            {/* Modal */}
            <Modal isOpen={modalOpen} closeModal={closeModal}>
              <div className={styles.modalTeste}>
                <div className={styles.modalContent}>
                  <h2>Perfil </h2>
                  <form>
                    <label>Foto de Perfil</label>
                    <div className={styles.imagePreviewContainer}>
                      {visuImagem /* Corrigido para 'visuImagem' */ ? (
                        <img src={visuImagem} alt="Foto de perfil" />
                      ) : (
                        <img
                          src="url_da_imagem_atual_aqui"
                          alt="Foto de perfil atual"
                        />
                      )}
                    </div>
                    <label
                      htmlFor="imageUpload"
                      className={styles.EscollherArquivo}
                    >
                      Escolher Arquivo
                    </label>
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
                    <input
                      type="text"
                      value={usuarioInfo.nome}
                      placeholder="Nome"
                      readOnly
                    />
                    <label htmlFor="">CPF</label>
                    <input
                      type="text"
                      value={usuarioInfo.cpf}
                      placeholder="Nome"
                      readOnly
                    />
                    <label htmlFor="">Email</label>
                    <input
                      type="text"
                      value={usuarioInfo.email}
                      placeholder="Nome"
                      readOnly
                    />
                    <label htmlFor="">Telefone</label>
                    <input
                      type="text"
                      value={usuarioInfo.telefone}
                      placeholder="Nome"
                      readOnly
                    />
                  </form>
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
            <Link href="/calendario">
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


// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { IconContext } from "react-icons";
// import {
//   MdCalendarMonth,
//   MdHourglassBottom,
//   MdEventNote,
//   MdPeople,
//   MdSettings,
//   MdAccountCircle,
//   MdLogout
// } from "react-icons/md";
// import axios from "axios";
// import styles from "./page.module.css";
// import Image from "next/image";
// import logo from "../../assets/logoBranca.svg";
// import { usePathname } from 'next/navigation';
// import Modal from "./ReactDom";

// const MenuLateral = () => {
//   const [lista, setLista] = useState([]);
//   const [nomeUsuario, setNomeUsuario] = useState("");
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selecionaImagem, setSelecionaImagem] = useState(null);
//   const [visuImagem, setVisuImagem] = useState(null);
//   const [usuarioInfo, setUsuarioInfo] = useState({
//     nome: "",
//     cpf: "",
//     email: "",
//     telefone: ""
//   });
//   const [editando, setEditando] = useState(false); // Controle de edição
//   const pathName = usePathname();

//   const getUsuario = async () => {
//     try {
//       const response = await axios.get(`http://localhost:3333/usuario`);
//       const dadosUsuario = response.data.dados;
//       setLista(dadosUsuario);

//       const usuarioAtual = dadosUsuario[0]; // Ajuste se necessário
//       setNomeUsuario(usuarioAtual.usu_nome);
//       setUsuarioInfo({
//         nome: usuarioAtual.usu_nome,
//         cpf: usuarioAtual.usu_cpf,
//         email: usuarioAtual.usu_email,
//         telefone: usuarioAtual.usu_telefone
//       });
//     } catch (error) {
//       console.error("Erro ao buscar usuários", error);
//     }
//   };

//   useEffect(() => {
//     getUsuario();
//   }, []);

//   // Funções para abrir e fechar o modal
//   const openModal = () => setModalOpen(true);
//   const closeModal = () => setModalOpen(false);

//   // Função para lidar com a troca de imagem
//   const handleImagemChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelecionaImagem(file);
//       setVisuImagem(URL.createObjectURL(file));
//     }
//   };

//   // Função para lidar com a mudança nos campos editáveis
//   const handleChange = (e) => {
//     setUsuarioInfo({
//       ...usuarioInfo,
//       [e.target.id]: e.target.value
//     });
//   };

//   // Função para alternar entre modo de edição e leitura
//   const toggleEdit = () => {
//     setEditando(!editando);
//   };

//   // Função para salvar as alterações
//   const salvarAlteracoes = async () => {
//     try {
//       // Suponha que o usuário atual tenha um ID
//       const usuarioId = lista[0].usu_id;

//       await axios.put(`http://localhost:3333/usuario/${usuarioId}`, usuarioInfo);
//       alert("Dados atualizados com sucesso!");
//       setEditando(false); // Desabilita o modo de edição após salvar
//     } catch (error) {
//       console.error("Erro ao salvar alterações", error);
//       alert("Erro ao salvar alterações");
//     }
//   };

//   return (
//     <>
//       <div className={styles.menuLateral}>
//         <IconContext.Provider value={{ size: "2rem" }}>
//           <div className={styles.menuItems}>
//             <div className={styles.logo}>
//               <Link href="/home/gestor">
//                 <h1 className={styles.logoTexto}>Trecap</h1>
//                 <Image src={logo} className={styles.logoImage} />
//               </Link>
//             </div>

//             <div className={styles.Perfil}>
//               <Link href="#" onClick={openModal}>
//                 {visuImagem ? (
//                   <img src={visuImagem} alt="Foto do usuário" className={styles.ImagemPerfil} />
//                 ) : (
//                   <MdAccountCircle />
//                 )}
//                 {nomeUsuario || "Nome"} {/* Exibindo nome do usuário */}
//               </Link>
//             </div>

//             {/* Modal */}
//             <Modal isOpen={modalOpen} closeModal={closeModal}>
//               <div className={styles.modalTeste}>
//                 <div className={styles.modalContent}>
//                   <h2>Perfil</h2>
//                   <form>
//                     <label>Foto de Perfil</label>
//                     <div className={styles.imagePreviewContainer}>
//                       {visuImagem ? (
//                         <img src={visuImagem} alt="Foto de perfil" />
//                       ) : (
//                         <img src="url_da_imagem_atual_aqui" alt="Foto de perfil atual" />
//                       )}
//                     </div>
//                     <label htmlFor="imageUpload" className={styles.EscollherArquivo}>Escolher Arquivo</label>
//                     <div className={styles.file}>
//                       <input
//                         className={styles.file}
//                         type="file"
//                         id="imageUpload"
//                         accept="image/*"
//                         onChange={handleImagemChange}
//                       />
//                     </div>

//                     {/* Campos de perfil editáveis */}
//                     <label htmlFor="nome">Nome</label>
//                     <input
//                       type="text"
//                       id="nome"
//                       value={usuarioInfo.nome}
//                       onChange={handleChange}
//                       placeholder="Nome"
//                       readOnly={!editando} // Desabilita edição quando não está em modo de edição
//                     />

//                     <label htmlFor="cpf">CPF</label>
//                     <input
//                       type="text"
//                       id="cpf"
//                       value={usuarioInfo.cpf}
//                       onChange={handleChange}
//                       placeholder="CPF"
//                       readOnly={!editando}
//                     />

//                     <label htmlFor="email">Email</label>
//                     <input
//                       type="text"
//                       id="email"
//                       value={usuarioInfo.email}
//                       onChange={handleChange}
//                       placeholder="Email"
//                       readOnly={!editando}
//                     />

//                     <label htmlFor="telefone">Telefone</label>
//                     <input
//                       type="text"
//                       id="telefone"
//                       value={usuarioInfo.telefone}
//                       onChange={handleChange}
//                       placeholder="Telefone"
//                       readOnly={!editando}
//                     />
//                   </form>
//                   <button onClick={editando ? salvarAlteracoes : toggleEdit}>
//                     {editando ? "Salvar" : "Editar"}
//                   </button>
//                   <button onClick={closeModal}>Fechar</button>
//                 </div>
//               </div>
//             </Modal>

//             <Link className={pathName === "/eventos" ? styles.active : ''} href="/eventos">
//               <MdEventNote /> Eventos
//             </Link>
//             <Link href="/historico">
//               <MdHourglassBottom /> Histórico
//             </Link>
//             <Link href="/calendario">
//               <MdCalendarMonth /> Calendário
//             </Link>
//             <Link className={pathName === "/usuario/cadastroColaborador" ? styles.active : ''} href="/usuario/cadastroColaborador">
//               <MdPeople /> Colaboradores
//             </Link>
//           </div>

//           <div className={styles.menuFooter}>
//             <Link href="/configuracoes">
//               <MdSettings /> Configurações
//             </Link>
//             <Link href="/usuario/login">
//               <MdLogout /> Sair
//             </Link>
//           </div>
//         </IconContext.Provider>
//       </div>
//     </>
//   );
// };

// export default MenuLateral;
