'use client';

import CabecalhoLogado from "@/cabecalhoLogado/page";
import style from "./page.module.css";
import { useState } from "react";
import axios from "axios";
import InputMask from 'react-input-mask';

export default function CadastrarEvento() {

  const [cep, setCep] = useState('');
  const [erroCep, setErroCep] = useState('');

  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [estado, setEstado] = useState('');

  const [rua, setRua] = useState('');
  const [erroRua, setErroRua] = useState("");

  const showAlert = () => {
    alert('Colaborador Cadastrado com sucesso!');
  };

  async function getEndereco() {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json`);
      if (response.data.erro) {
        setErroCep('CEP não encontrado.');
        setRua('');
        setEstado('');
        setBairro('');
        setCidade('');
      } else {
        setRua(response.data.logradouro);
        setEstado(response.data.uf); 
        setBairro(response.data.bairro);
        setCidade(response.data.localidade);
        setErroCep(''); // Limpa o erro se encontrar o endereço
      }
      // setRua(response.data.logradouro);
      // setEstado(response.data.uf); // Corrigido o campo de estado (deveria ser "uf" na resposta da API)
      // setBairro(response.data.bairro);
      // setCidade(response.data.localidade);
    } catch (error) {
      console.log(error);
    }
  }

  // Validação do campo de rua
const validaCep = () => {
  
  console.log(cep.length)
    setErroCep('O número do Cep é obrigatório!')
    return false
  
  // setErroCep('');
  // return true;
}
const handleBlurCep = () => {
  validaCep()// Função de validação
  //getEndereco(); // Função para buscar o endereço

};

  const validaRua = () => {
    if (rua.trim() === '') {
      setErroRua('O nome da rua é obrigatório!');
      return false;
    }
    setErroRua(''); // Limpa o erro se a validação for bem-sucedida
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita o reload da página
    if (validaCep() && validaRua){
      showAlert();
    }
    if (validaRua()) {
      // Se for válido, você pode continuar o processo, como enviar o formulário
      showAlert();
    }
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
                    <input type="text" placeholder="Digite o nome do colaborador"/>
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
                    <input type="text" placeholder="Digite o setor do colaborador"/>
                    <label>Biometria:</label>
                    <input type="text" placeholder="Biometria do colaborador"/>
                    <label htmlFor="phone">Telefone:</label>
                    <InputMask 
                      mask="(99) 99999-9999" 
                      id="phone">
                      {(inputProps) => <input {...inputProps} type="tel" placeholder="Digite o telefone do colaborador"/>}
                    </InputMask>
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
                      value={cep}
                      onChange={({ target }) => setCep(target.value)}
                      onBlur={handleBlurCep}
                      placeholder="Digite o CEP"
                    />
                    {erroCep && <p style={{ color: "red" }}>{erroCep}</p>} {/* Exibe a mensagem de erro */}

                    <label>Rua:</label>
                    <input 
                      type="text" 
                      value={rua}
                      onChange={({ target }) => setRua(target.value)}
                      onBlur={validaRua} // Chama validação ao sair do campo
                      placeholder="Digite o nome da Rua"
                    />
                    {erroRua && <p style={{ color: "red" }}>{erroRua}</p>} {/* Exibe a mensagem de erro */}

                    <label>Estado:</label>
                    <input 
                      type="text" 
                      value={estado} 
                      placeholder="Nome do Estado"
                    />
                    <label>Bairro:</label>
                    <input 
                      type="text" 
                      value={bairro} 
                      placeholder="Digite o nome do Bairro"
                    />
                  </div>
                  <div className={style.DadosEndereco}>
                    <label>Cidade:</label>
                    <input 
                      type="text" 
                      value={cidade} 
                      placeholder="Nome da Cidade"
                    />
                    <label>Número:</label>
                    <input type="text" placeholder="Ex: 01" />
                    <label>Complemento:</label>
                    <input type="text" placeholder="Ex: Casa, Apto" />
                  </div>
                </div>
              </form>
            </div>
            <div className={style.ContainerButton}>
              <button type="submit" className={style.Button} onClick={handleSubmit}>Concluir</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
