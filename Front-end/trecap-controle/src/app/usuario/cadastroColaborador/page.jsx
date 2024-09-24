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
                    {/* <label>Empresa:</label>
                    <select name="" id="">
                      <option>Selecione a Empresa</option>
                      <option>Usa</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select> */}
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
