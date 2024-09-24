"use client";

import CabecalhoLogado from "@/cabecalhoLogado/page";
import style from "./page.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import InputMask from "react-input-mask";
import { useRouter } from "next/navigation";
import useForm from "@/hooks/useForm";
import Input from "@/components/Input";

export default function CadastrarEvento() {
  const router = useRouter();

  const nome = useForm("nome");

  const email = useForm("email");

  const CPF = useForm("CPF");

  const biometria = useForm("biometria");

  const telefone = useForm("telefone");

  const CEP = useForm("CEP");

  const rua = useForm("rua");

  const cidade = useForm("cidade");

  const bairro = useForm("bairro");

  const estado = useForm("estado");

  const [numero, setNumero] = useState("");
  const [erroNumero, setErroNumero] = useState("");

  const [complemento, setComplemento] = useState("");
  const [erroComplemento, setErroComplemento] = useState("");

  const campo = "Este campo é obrigatório!";
  const mensagem = "Este campo não deve conter menos que 4 caracteres";

  const getEndereco = async () => {
    try {
      const response = await axios.get(
        `https://viacep.com.br/ws/${CEP.value}/json`
      );
      if (response.data.erro) {
        rua.setValue("");
        estado.setValue("");
        bairro.setValue("");
        cidade.setValue("");
      } else {
        rua.setValue(response.data.logradouro);
        rua.setError(null);
        estado.setValue(response.data.uf);
        estado.setError(null);
        bairro.setValue(response.data.bairro);
        bairro.setError(null);
        cidade.setValue(response.data.localidade);
        cidade.setError(null);
      }
    } catch (error) {
      console.log("Erro ao buscar", error);
    }
  };

  useEffect(() => {
    if (!CEP.error) {
    }
  }, [CEP.value]);

  const validaNumero = () => {
    if (numero.length === 0) {
      setErroNumero(`${campo} e deve ser maior que zero`);
      return false;
    }
    setErroNumero("");
    return true;
  };

  const validaComplemento = () => {
    if (complemento.length == 0) {
      setErroComplemento(campo);
      return false;
    }
    if (complemento.length < 4) {
      setErroComplemento(mensagem);
      return false;
    }
    setErroComplemento("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita o reload da página
    validaTudo();

    const colaboradorData = {
      colaborador_nome: nome.value,
      colaborador_email: email.value,
      colaborador_CPF: CPF.value,
      colaborador_biometria: biometria.value,
      colaborador_telefone: telefone.value,
      endereco: {
        CEP: CEP.value,
        rua: rua.value,
        estado: estado.value,
        bairro: bairro.value,
        cidade: cidade.value,
        numero: numero,
        complemento: complemento,
      },
    };
    try {
      const response = await axios.post(`http://localhost:3333/Colaboradores`, colaboradorData);

      console.log(response)
    } catch (error) {
      console.log("Erro ao cadastrar colaborador", error);
    }
  };

  const validaTudo = () => {
    CEP.isValid();
    nome.isValid();
    biometria.isValid();
    telefone.isValid();
    rua.isValid();
    estado.isValid();
    bairro.isValid();
    cidade.isValid();
    email.isValid();
    CPF.isValid();
    validaNumero();
    validaComplemento();
  };

  return (
    <>
      <CabecalhoLogado />
      <div className={style.ContainerGeral}>
        <div className={style.Container}>
          <h1>Cadastro de Colaboradores</h1>
          <div className={style.ContainerTudo}>
            <div className={style.FormDados}>
              <form onSubmit={handleSubmit}>
                <label className={style.Titulos}>Dados pessoais</label>
                <div className={style.CentralizaDados}>
                  <div className={style.DadosPessoais}>
                    <label>Nome do colaborador:</label>
                    {/* <Input
                     inputPlaceholderText='Nome'
                     name='nome'
                     labelText='Nome:'
                     typeInput='text'
                     {...nome}
                   /> */}
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
            <div className={style.FormEndereco}>
              <form onSubmit={handleSubmit}>
                <div className={style.Teste}>
                  <label className={style.Titulos}>Endereço</label>
                </div>
                <div className={style.CentralizaEndereco}>
                  <div className={style.DadosEndereco}>
                    <label>CEP:</label>
                    <InputMask
                      mask="99999-999"
                      value={CEP.value}
                      onChange={CEP.onChange}
                      onBlur={async () => {
                        CEP.onBlur();
                        if (CEP.isValid()) {
                          await getEndereco();
                        }
                      }}
                      placeholder="Digite o CEP"
                    />
                    {CEP.error && (
                      <p
                        style={{
                          color: "red",
                          marginBottom: "1rem",
                          fontStyle: "italic",
                          fontSize: "1rem",
                        }}
                      >
                        {CEP.error}
                      </p>
                    )}{" "}
                    {/* Exibe a mensagem de erro */}
                    <label>Rua:</label>
                    <input
                      type="text"
                      value={rua.value}
                      onChange={rua.onChange}
                      onBlur={rua.onBlur}
                      placeholder="Digite o nome da Rua"
                    />
                    {rua.error && (
                      <p
                        style={{
                          color: "red",
                          marginBottom: "1rem",
                          fontStyle: "italic",
                          fontSize: "1rem",
                        }}
                      >
                        {rua.error}
                      </p>
                    )}{" "}
                    {/* Exibe a mensagem de erro */}
                    <label>Estado:</label>
                    <input
                      type="text"
                      value={estado.value}
                      onChange={estado.onChange}
                      onBlur={estado.onBlur}
                      placeholder="Nome do Estado"
                    />
                    {estado.error && (
                      <p
                        style={{
                          color: "red",
                          marginBottom: "1rem",
                          fontStyle: "italic",
                          fontSize: "1rem",
                        }}
                      >
                        {estado.error}
                      </p>
                    )}{" "}
                    {/* Exibe a mensagem de erro */}
                    <label>Bairro:</label>
                    <input
                      type="text"
                      value={bairro.value}
                      onChange={bairro.onChange}
                      onBlur={bairro.onBlur}
                      placeholder="Digite o nome do Bairro"
                    />
                    {bairro.error && (
                      <p
                        style={{
                          color: "red",
                          marginBottom: "1rem",
                          fontStyle: "italic",
                          fontSize: "1rem",
                        }}
                      >
                        {bairro.error}
                      </p>
                    )}{" "}
                    {/* Exibe a mensagem de erro */}
                  </div>
                  <div className={style.DadosEndereco}>
                    <label>Cidade:</label>
                    <input
                      type="text"
                      value={cidade.value}
                      onChange={cidade.onChange}
                      onBlur={cidade.onBlur}
                      placeholder="Nome da Cidade"
                    />
                    {cidade.error && (
                      <p
                        style={{
                          color: "red",
                          marginBottom: "1rem",
                          fontStyle: "italic",
                          fontSize: "1rem",
                        }}
                      >
                        {cidade.error}
                      </p>
                    )}{" "}
                    {/* Exibe a mensagem de erro */}
                    <label>Número:</label>
                    <input
                      type="text"
                      value={numero}
                      onChange={({ target }) => setNumero(target.value)}
                      onBlur={validaNumero}
                      placeholder="Ex: 01"
                    />
                    {erroNumero && (
                      <p
                        style={{
                          color: "red",
                          marginBottom: "1rem",
                          fontStyle: "italic",
                          fontSize: "1rem",
                        }}
                      >
                        {erroNumero}
                      </p>
                    )}
                    <label>Complemento:</label>
                    <input
                      type="text"
                      value={complemento}
                      onChange={({ target }) => setComplemento(target.value)}
                      // onBlur={validaComplemento}
                      placeholder="Ex: Casa, Apto"
                    />
                    {erroComplemento && (
                      <p
                        style={{
                          color: "red",
                          marginBottom: "1rem",
                          fontStyle: "italic",
                          fontSize: "1rem",
                        }}
                      >
                        {erroComplemento}
                      </p>
                    )}
                  </div>
                </div>
              </form>
            </div>
            <div className={style.ContainerButton}>
              <button
                type="submit"
                className={style.Button}
                onClick={handleSubmit}
              >
                Cadastrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
