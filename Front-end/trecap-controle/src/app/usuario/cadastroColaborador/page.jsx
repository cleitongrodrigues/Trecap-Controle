"use client";

import CabecalhoLogado from "@/cabecalhoLogado/page";
import style from "./page.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import InputMask from "react-input-mask";
import { useRouter } from "next/navigation";
import useForm from "@/hooks/useForm";
import Input from "@/components/Input";
import { MdSearch } from "react-icons/md";
import { IconContext } from "react-icons";

export default function CadastrarEvento() {
  const router = useRouter();

  const [lista, setlista] = useState([]);

  const nome = useForm("nome");

  const email = useForm("email");

  const CPF = useForm("CPF");

  const biometria = useForm("biometria");

  const telefone = useForm("telefone");
  const getColaboradores = async () =>{
    const response = await axios.get(`http://localhost:3333/colaboradores`) 

    const dadosColaboradores = response.data.dados;

    setlista(dadosColaboradores);
  }

  useEffect(() => {
    getColaboradores()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita o reload da página
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

    console.log(colaboradorData);
    try {
      const response = await axios.post(
        `http://localhost:3333/colaboradores`,
        colaboradorData
      );
      console.log(colaboradorData);

      CPF.setValue("");
      email.setValue("");
      nome.setValue("");
      biometria.setValue("");
      telefone.setValue("");
      getColaboradores()
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

  return (
    <>
      <CabecalhoLogado />
      <div className={style.CorCinza}>
        <div className={style.ContainerGeral}>
          <div className={style.Container}>
            {/* <h1>Cadastro de Colaboradores</h1> */}
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
                      {nome.error && (
                        <p
                          style={{
                            color: "red",
                            marginBottom: "1rem",
                            fontStyle: "italic",
                            fontSize: "1rem",
                          }}
                        >
                          {nome.error}
                        </p>
                      )}{" "}
                      {/* Exibe a mensagem de erro */}
                      <label>Email:</label>
                      <input
                        type="text"
                        value={email.value}
                        onChange={email.onChange}
                        onBlur={email.onBlur}
                        placeholder="Digite o email do colaborador"
                      />
                      {email.error && (
                        <p
                          style={{
                            color: "red",
                            marginBottom: "1rem",
                            fontStyle: "italic",
                            fontSize: "1rem",
                          }}
                        >
                          {email.error}
                        </p>
                      )}{" "}
                      {/* Exibe a mensagem de erro */}
                      <label>CPF:</label>
                      <InputMask
                        mask="999.999.999-99"
                        type="text"
                        value={CPF.value}
                        onChange={CPF.onChange}
                        onBlur={CPF.onBlur}
                        placeholder="Digite o CPF do colaborador"
                      />
                      {CPF.error && (
                        <p
                          style={{
                            color: "red",
                            marginBottom: "1rem",
                            fontStyle: "italic",
                            fontSize: "1rem",
                          }}
                        >
                          {CPF.error}
                        </p>
                      )}{" "}
                      {/* Exibe a mensagem de erro */}
                    </div>
                    <div className={style.DadosPessoais}>
                      <label>Biometria:</label>
                      <input
                        type="text"
                        value={biometria.value}
                        onChange={biometria.onChange}
                        onBlur={biometria.onBlur}
                        placeholder="Digite o nome da Rua"
                      />
                      {biometria.error && (
                        <p
                          style={{
                            color: "red",
                            marginBottom: "1rem",
                            fontStyle: "italic",
                            fontSize: "1rem",
                          }}
                        >
                          {biometria.error}
                        </p>
                      )}{" "}
                      {/* Exibe a mensagem de erro */}
                      <label>Telefone:</label>
                      <InputMask
                        mask="(99) 99999-9999"
                        type="text"
                        value={telefone.value}
                        onChange={telefone.onChange}
                        onBlur={telefone.onBlur}
                        placeholder="Digite o telefone do colaborador"
                      />
                      {telefone.error && (
                        <p
                          style={{
                            color: "red",
                            marginBottom: "1rem",
                            fontStyle: "italic",
                            fontSize: "1rem",
                          }}
                        >
                          {telefone.error}
                        </p>
                      )}
                    </div>
                  </div>
                </form>
              </div>
              <div className={style.ContainerButton}>
                <button
                  type="submit"
                  className={style.ButtonCadastrar}
                  onClick={handleSubmit}
                >
                  Cadastrar
                </button>
                <button
                  type="submit"
                  className={style.ButtonCancelar}
                  onClick={handleSubmit}
                >
                  Cancelar
                </button>
              </div>
              <div className={style.Novo}>
                <div className={style.InputIcon}>
                  <label htmlFor="">Pesquisar Colaboradores:</label>
                  <input
                    type="text"
                    placeholder="Digite o nome do Colaborador"
                  />
                  <IconContext.Provider value={{ size: 25 }}>
                    <MdSearch />
                  </IconContext.Provider>
                </div>

                <div className={style.containerColaborador}>
                  <div className={style.ContainerCabecalho}>
                    <div className={style.ContainerId}>#</div>
                    <div className={style.ContainerNome}>
                      Nome
                    </div>
                    <div className={style.ContainerEmail}>
                      Email
                    </div>
                    <div className={style.ContainerBotaoTeste}>Ações</div>
                  </div>
                  {lista && lista.map((colaborador, index) => (
                    <div key={index} className={style.ContainerDivs}>
                      <div className={style.ContainerId}>{colaborador.colaborador_id}</div>
                      <div className={style.ContainerNome}>
                        {colaborador.colaborador_nome}
                      </div>
                      <div className={style.ContainerEmail}>
                        {colaborador.colaborador_email}
                      </div>
                      <div className={style.ContainerBotaoTeste}>
                      <div className={style.ContainerButton}>
                <button
                  type="submit"
                  className={style.ButtonCadastrar}
                  onClick={handleSubmit}
                >
                  Cadastrar
                </button>
                <button
                  type="submit"
                  className={style.ButtonCancelar}
                  onClick={handleSubmit}
                >
                  Cancelar
                </button>
              </div>
                        </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// https://github.com/analistaatila/Cadastro-Cliente-ReactJs-Crud
