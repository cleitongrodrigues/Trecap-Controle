'use client'
import CabecalhoLogado from "@/cabecalhoLogado/page";
import style from "./page.module.css";
import { useState } from "react";
import axios from "axios";
import InputMask from 'react-input-mask';

export default function CadastrarEvento() {

  const [cep, setCep] = useState('');

  const [cidade, setCidade] = useState('');

  const [bairro, setBairro] = useState('');

  const [estado, setEstado] = useState('');

  const [rua, setRua] = useState('');


  const showAlert = () => {
    alert('Colaborador Cadastrado com sucesso!');
  };

  async function getEndereco() {

    try {
      const response = await axios.get('https://viacep.com.br/ws/' + cep + '/json')

      // const cidade = response.data.localidade

      // const bairro = response.data.bairro
      setRua(response.data.logradouro)
      setEstado(response.data.estado)
      setBairro(response.data.bairro)
      setCidade(response.data.localidade)
      console.log(cidade, rua)
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
                    <input type="text" name="" id="" placeholder="Digite o nome do colaborador"/>
                    <label>RG:</label>
                    <InputMask mask="99.999.999-9" id="rg">
                      {(inputProps) => <input {...inputProps} type="text" placeholder="Digite o RG do colaborador"/>}
                    </InputMask>
                    <label>CPF:</label>
                    <InputMask mask="999.999.999-99" id="cpf">
                      {(inputProps) => <input {...inputProps} type="text" placeholder="Digite o CPF do colaborador"/>}
                    </InputMask>
                  </div>
                  <div className={style.DadosPessoais}>
                    <label>Setor:</label>
                    <input type="text" name="" id="" placeholder="Digite o setor do colaborador"/>
                    <label>Biometria:</label>
                    <input type="text" id="" placeholder="Biometria do colaborador"/>
                    <label htmlFor="phone">Telefone:</label>
                    <InputMask 
                      mask="(99) 99999-9999" 
                      id="phone">
                        {(inputProps) => <input {...inputProps} 
                      type="tel" 
                      placeholder="Digite o telefone do colaborador"
                      />}
                    </InputMask>
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
                    <InputMask
                      mask="99999-999"
                      value={cep}
                      onChange={({ target }) => setCep(target.value)}
                      onBlur={getEndereco}
                      placeholder="Digite o CEP"
                    >
                    </InputMask>
                    <label>Rua:</label>
                    <input 
                      type="text" 
                      value={rua}
                      onChange={({target}) => setRua(target.value)}
                      placeholder="Digite o nome da Rua" 
                    />
                    <label>Estado:</label>
                    <input 
                      type="text" 
                      value={estado} onChange={({target}) => setEstado(target.value)} 
                      placeholder="Nome do Estado"
                    />
                    <label>Bairro:</label>
                    <input 
                      type="text" 
                      value={bairro} onChange={({target}) => setBairro(target.value)} 
                      placeholder="Digite o nome do Bairro" 
                    />
                  </div>
                  <div className={style.DadosEndereco}>
                    <label>Cidade:</label>
                    <input 
                      type="text" 
                      value={cidade} onChange={({ target }) => setCidade(target.value)}
                      placeholder="Nome da Cidade"
                    />
                    <label>Número:</label>
                    <input 
                      type="text" 
                      placeholder="Ex: 01" />
                    <label>Complemento:</label>
                    <input 
                      type="text"
                      placeholder="Ex: Casa, Apto" />
                  </div>
                </div>
              </form>
            </div>
            <div className={style.ContainerButton}>
              <button className={style.Button} onClick={showAlert}>Concluir</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
