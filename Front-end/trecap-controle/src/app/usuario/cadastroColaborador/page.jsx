"use client";

import CabecalhoLogado from "@/cabecalhoLogado/page";
import style from "./page.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import InputMask from "react-input-mask";
import { useRouter } from "next/navigation";
import useForm from "@/hooks/useForm";
import { MdSearch, MdEdit, MdDelete } from "react-icons/md";
import { IconContext } from "react-icons";
import MenuLateral from "@/components/menuLateral/page";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/userContext";

export default function CadastrarEvento() {
  const router = useRouter();

  const [lista, setLista] = useState([]);
  const [showModal, setShowModal] = useState(false); // Estado para controlar o modal de edição
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Estado para o modal de exclusão
  const [selectedColaborador, setSelectedColaborador] = useState(null); // Colaborador a ser editado
  const [colaboradorToDelete, setColaboradorToDelete] = useState(null); // Colaborador a ser excluído

  const nome = useForm("nome");
  const email = useForm("email");
  const CPF = useForm("CPF");
  const biometria = useForm("biometria");
  const telefone = useForm("telefone");

  const getColaboradores = async () => {
    const response = await axios.get(`http://localhost:3333/colaboradores`);
    const dadosColaboradores = response.data.dados;
    setLista(dadosColaboradores);
  };

  useEffect(() => {
    getColaboradores();
  }, []);

  const handleCancelar = () => {
    CPF.setValue("");
    email.setValue("");
    nome.setValue("");
    biometria.setValue("");
    telefone.setValue("");
    setShowModal(false);
    setSelectedColaborador(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nome.value || !email.value || !CPF.value || !biometria.value || !telefone.value) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    validaTudo();

    const colaboradorData = {
      colaborador_nome: nome.value,
      colaborador_email: email.value,
      colaborador_CPF: CPF.value.replace(/[.-]/g, ""),
      colaborador_biometria: biometria.value,
      colaborador_telefone: telefone.value,
      colaborador_ativo: 1,
      empresa_id: 1,
      setor_id: 1,
    };

    try {
      if (selectedColaborador) {
        // Editar colaborador existente
        await axios.patch(
          `http://localhost:3333/colaboradores/${selectedColaborador.colaborador_id}`,
          colaboradorData
        );
        setShowModal(false);
      } else {
        // Cadastrar novo colaborador
        await axios.post(`http://localhost:3333/colaboradores`, colaboradorData);
      }

      handleCancelar();
      getColaboradores();
    } catch (error) {
      console.log("Erro ao cadastrar colaborador", error);
    }
  };

  const validaTudo = () => {
    nome.isValid();
    biometria.isValid();
    telefone.isValid();
    email.isValid();
    CPF.isValid();
  };

  const handleEdit = (colaborador) => {
    setSelectedColaborador(colaborador);
    nome.setValue(colaborador.colaborador_nome);
    email.setValue(colaborador.colaborador_email);
    CPF.setValue(colaborador.colaborador_CPF);
    biometria.setValue(colaborador.colaborador_biometria);
    telefone.setValue(colaborador.colaborador_telefone);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3333/colaboradores/${colaboradorToDelete.colaborador_id}`
      );
      setShowDeleteModal(false);
      getColaboradores(); // Atualiza a lista após a exclusão
    } catch (error) {
      console.log("Erro ao excluir colaborador", error);
    }
  };

  const confirmDelete = (colaborador) => {
    setColaboradorToDelete(colaborador);
    setShowDeleteModal(true); // Abre o modal de confirmação de exclusão
  };

  return (
    <>
      <ProtectedRoute>
        {/* <CabecalhoLogado /> */}
        <MenuLateral />
        <div className={style.CorCinza}>
          <div className={style.ContainerGeral}>
            <div className={style.Container}>
              <div className={style.ContainerTudo}>
                <div className={style.FormDados}>
                  <form onSubmit={handleSubmit}>
                    <div className={style.CentralizaDados}>
                      <div className={style.DadosPessoais}>
                        <label>Nome do colaborador:</label>
                        <input
                          type="text"
                          value={nome.value}
                          onChange={nome.onChange}
                          onBlur={nome.onBlur}
                          placeholder="Digite o nome completo do colaborador"
                        />
                        <label>Email:</label>
                        <input
                          type="text"
                          value={email.value}
                          onChange={email.onChange}
                          onBlur={email.onBlur}
                          placeholder="Digite o email do colaborador"
                        />
                        <label>CPF:</label>
                        <InputMask
                          mask="999.999.999-99"
                          type="text"
                          value={CPF.value}
                          onChange={CPF.onChange}
                          onBlur={CPF.onBlur}
                          placeholder="Digite o CPF do colaborador"
                        />
                      </div>
                      <div className={style.DadosPessoais}>
                        <label>Biometria:</label>
                        <input
                          type="text"
                          value={biometria.value}
                          onChange={biometria.onChange}
                          onBlur={biometria.onBlur}
                          placeholder="Digite a biometria"
                        />
                        <label>Telefone:</label>
                        <InputMask
                          mask="(99) 99999-9999"
                          type="text"
                          value={telefone.value}
                          onChange={telefone.onChange}
                          onBlur={telefone.onBlur}
                          placeholder="Digite o telefone do colaborador"
                        />
                      </div>
                    </div>
                  </form>
                </div>
                <div className={style.ContainerButton}>
                  <button type="submit" className={style.ButtonCadastrar} onClick={handleSubmit}>
                    {selectedColaborador ? "Salvar" : "Cadastrar"}
                  </button>
                  <button type="button" className={style.ButtonCancelar} onClick={handleCancelar}>
                    Cancelar
                  </button>
                </div>

                {/* Modal de Edição */}
                {showModal && (
                  <div className={style.modal}>
                    <div className={style.modalContent}>
                      <h2>Editar Colaborador</h2>
                      <form onSubmit={handleSubmit}>
                        <label>Nome:</label>
                        <input
                          type="text"
                          value={nome.value}
                          onChange={nome.onChange}
                          placeholder="Digite o nome completo do colaborador"
                        />
                        <label>Email:</label>
                        <input
                          type="text"
                          value={email.value}
                          onChange={email.onChange}
                          placeholder="Digite o email do colaborador"
                        />
                        <label>CPF:</label>
                        <InputMask
                          mask="999.999.999-99"
                          type="text"
                          value={CPF.value}
                          onChange={CPF.onChange}
                          placeholder="Digite o CPF do colaborador"
                        />
                        <label>Biometria:</label>
                        <input
                          type="text"
                          value={biometria.value}
                          onChange={biometria.onChange}
                          placeholder="Digite a biometria"
                        />
                        <label>Telefone:</label>
                        <InputMask
                          mask="(99) 99999-9999"
                          type="text"
                          value={telefone.value}
                          onChange={telefone.onChange}
                          placeholder="Digite o telefone do colaborador"
                        />
                        <button type="submit" onClick={handleSubmit}>
                          Salvar
                        </button>
                        <button type="button" onClick={() => setShowModal(false)}>
                          Cancelar
                        </button>
                      </form>
                    </div>
                  </div>
                )}

                {/* Modal de Confirmação de Exclusão */}
                {showDeleteModal && (
                  <div className={style.modal}>
                    <div className={style.modalContent}>
                      <h2>Confirmar Exclusão</h2>
                      <p>Tem certeza de que deseja excluir o(a) colaborador(a) {colaboradorToDelete?.colaborador_nome}?</p>
                      <button onClick={handleDelete}>Excluir</button>
                      <button onClick={() => setShowDeleteModal(false)}>Cancelar</button>
                    </div>
                  </div>
                )}
                <div className={style.Novo}>
                  <div className={style.InputIcon}>
                    <label htmlFor="">Pesquisar Colaboradores:</label>
                    <input type="text" placeholder="Digite o nome do Colaborador" />
                    <IconContext.Provider value={{ size: 25 }}>
                      <MdSearch />
                    </IconContext.Provider>
                  </div>

                  <div className={style.containerColaborador}>
                    <div className={style.ContainerCabecalho}>
                      <div className={style.ContainerId}>#</div>
                      <div className={style.ContainerNome}>Nome</div>
                      <div className={style.ContainerEmail}>Email</div>
                      <div className={style.ContainerBotaoTeste}>Ações</div>
                    </div>
                    {lista &&
                      lista.map((colaborador, index) => (
                        <div key={index} className={style.ContainerDivs}>
                          <div className={style.ContainerId}>{colaborador.colaborador_id}</div>
                          <div className={style.ContainerNome}>{colaborador.colaborador_nome}</div>
                          <div className={style.ContainerEmail}>{colaborador.colaborador_email}</div>
                          <div className={style.ContainerBotaoEditar}>
                            <button
                              type="button"
                              className={style.ButtonEditar}
                              onClick={() => handleEdit(colaborador)}
                            >
                              <IconContext.Provider value={{ size: 20 }}>
                                <MdEdit />
                              </IconContext.Provider>
                            </button>
                            <button
                              type="button"
                              className={style.ButtonExcluir}
                              onClick={() => confirmDelete(colaborador)}
                            >
                              <IconContext.Provider value={{ size: 20 }}>
                                <MdDelete />
                              </IconContext.Provider>
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </>
  );
}
