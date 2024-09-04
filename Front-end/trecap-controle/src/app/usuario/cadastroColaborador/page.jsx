'use client'
import CabecalhoLogado from "@/cabecalhoLogado/page";
import style from "./page.module.css";
import { useState } from "react";
import axios from "axios";
export default function CadastrarEvento() {

  const [cep, setCep ] = useState('');
  const [cidade, setCidade] = useState('');

  async function getEstado(){
    try {
      const response = await axios.get('https://viacep.com.br/ws/' + cep + '/json')
      const cidade = response.data.localidade
      setCidade(response.data.localidade)
        console.log(cidade)
    } catch (error) {
      console.log(error)
    }
    axios.get('https://viacep.com.br/ws/' + cep + '/json')
  }
  return (
    <>
      <CabecalhoLogado />
      <div className={style.ContainerGeral}>
        <div className={style.Container}>
          <h1>Cadastro de Colaboradores</h1>
          <div className={style.ContainerTudo}>
            <div className={style.FormDados}>
              <form action="">
                <label className={style.Titulos}>Dados pessoais</label>
                <div className={style.CentralizaDados}>
                  <div className={style.DadosPessoais}>
                    <label>Nome do colaborador:</label>
                    <input type="text" name="" id="" />
                    <label>RG:</label>
                    <input type="number" name="" id="" />
                    <label>CPF:</label>
                    <input type="text" name="" id="" />
                  </div>
                  <div className={style.DadosPessoais}>
                    <label>Setor:</label>
                    <input type="text" name="" id="" />
                    <label>Biometira:</label>
                    <input type="text" name="" id="" />
                  </div>
                </div>
              </form>
            </div>
            <div className={style.FormEndereco}>
              <form action="">
                <div className={style.Teste}>
                  <label className={style.Titulos}>Endereço</label>
                </div>
                <div className={style.CentralizaEndereco}>
                  <div className={style.DadosEndereco}>
                    <label>CEP:</label>
                    <input type="text" name="" id="" value={cep} onBlur={getEstado} onChange={({target}) => setCep(target.value)}/>
                            <label>Rua:</label>
                            <input type="text" name="" id="" />
                            <label>Estado:</label>
                            <input type="text" name="" id="" />
                    <label>Bairro:</label>
                    <input type="text" name="" id="" />
                  </div>
                  <div className={style.DadosEndereco}>
                    <label>Cidade:</label>
                    <input type="text" name="" id="" value={cidade} onChange={({target}) => setCidade(target.value)}/>
                    <label>Número:</label>
                    <input type="number" name="" id="" />
                    <label>Complemento:</label>
                    <input type="text" name="" id="" />
                  </div>
                </div>
              </form>
            </div>
            <div className={style.ContainerButton}>
              <button className={style.Button}>Concluir</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
