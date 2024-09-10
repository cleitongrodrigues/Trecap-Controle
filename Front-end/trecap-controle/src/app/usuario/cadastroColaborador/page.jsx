'use client';

import CabecalhoLogado from "@/cabecalhoLogado/page";
import style from "./page.module.css";
import { useState } from "react";
import axios from "axios";
import InputMask from 'react-input-mask';

export default function CadastrarEvento() {

  const [nomeColaborador, setNomeColaborador] = useState('');
  const [erroNomeColaborador, setErroNomeColaborador] = useState('');

  const [email, setEmail] = useState('');
  const [erroEmail, setErroEmail] = useState('');

  const [cpf, setCpf] = useState('');
  const [erroCpf, setErroCpf] = useState('');

  const [biometria, setBiometria] = useState('');
  const [erroBiometria, setErroBiometria] = useState('');

  const [telefone, setTelefone] = useState('');
  const [erroTelefone, setErroTelefone] = useState('');

  const [cep, setCep] = useState('');
  const [erroCep, setErroCep] = useState('');

  const [cidade, setCidade] = useState('');
  const [erroCidade, setErroCidade] = useState('');

  const [bairro, setBairro] = useState('');
  const [erroBairro, setErroBairro] = useState('');

  const [estado, setEstado] = useState('');
  const [erroEstado, setErroEstado] = useState('');

  const [rua, setRua] = useState('');
  const [erroRua, setErroRua] = useState("");

  const [numero, setNumero] = useState('');
  const [erroNumero, setErroNumero] = useState('');

  const campo = 'Este campo é obrigatório!';

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

  // Validação parte dados pessoais
  const validaNome = () => {
    console.log(nomeColaborador.length)
    if (nomeColaborador.length === 0 || nomeColaborador.length < 3) {
      setErroNomeColaborador(campo);
      return false;
    }
    setErroNomeColaborador(''); 
    return true;
  };
 
  const validaEmail = () => {
    console.log(email.length)
    if (email.length === 0) {
      setErroEmail(campo);
      return false;
    }
    setErroEmail(''); 
    return true;
  };
  
  const validaCpf = () => {
    console.log(cpf.length)
    if (cpf.length === 0) {
      setErroCpf(campo);
      return false;
    }
    setErroCpf(''); 
    return true;
  };
  
  const validaBiometria = () => {
    console.log(biometria.length)
    if (biometria.length === 0) {
      setErroBiometria(campo);
      return false;
    }
    setErroBiometria(''); 
    return true;
  };
  
  const validaTelefone = () => {
    console.log(telefone.length)
    if (telefone.length === 0) {
      setErroTelefone(campo);
      return false;
    }
    setErroTelefone(''); 
    return true;
  };

  // Validação parte do endereço
  const validaCep = () => {

    const cepSemMascara = cep.replace(/\D/g, '');

    console.log(cepSemMascara.length);

    if (cepSemMascara.length === 0) {
      setErroCep(campo);
      return false;
    }

    // Se o CEP estiver correto
    setErroCep('');
    return true;
  }
  const handleBlurCep = async () => {
    if (validaCep()) {// Função de validação
      await getEndereco(); // Função para buscar o endereço
    }
  };

  const validaRua = () => {
    console.log(rua.length)
    if (rua.length === 0) {
      setErroRua(campo);
      return false;
    }
    setErroRua(''); // Limpa o erro se a validação for bem-sucedida
    return true;
  };

  const validaEstado = () => {
    if (estado.length === 0) {
      setErroEstado(campo);
      return false;
    }
    setErroEstado('');
    return true;
  }

  const validaBairro = () => {
    if (bairro.length === 0) {
      setErroBairro(campo);
      return false;
    }
    setErroBairro('');
    return true;
  }

  const validaCidade = () => {
    if (cidade.length === 0) {
      setErroCidade(campo);
      return false;
    }
    setErroCidade('');
    return true;
  }

  const validaNumero = () => {
    if (numero.length === 0) {
      setErroNumero(campo);
      return false;
    }
    setErroNumero('');
    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita o reload da página
    if (validaCep()) {
      validaNome();
      validaEmail();
      validaCpf();
      validaBiometria();
      validaTelefone();
      validaRua();
    validaEstado();
    validaBairro();
    validaCidade();
    validaNumero();
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
                    <input type="text" placeholder="Digite o nome do colaborador" />
                    <input
                      type="text"
                      value={nomeColaborador}
                      onChange={({ target }) => setEstado(target.value)}
                      onBlur={validaNome}
                      placeholder="Digite o nome completo do colaborador"
                    />
                    {erroEstado && <p style={{ color: "red", marginBottom: '1rem', fontStyle: 'italic', fontSize: '1rem' }}>{erroEstado}</p>} {/* Exibe a mensagem de erro */}

                    <label>Email:</label>
                    <InputMask id="email">
                      {(inputProps) => <input {...inputProps} type="email" placeholder="Digite o email do colaborador" />}
                    </InputMask>
                    <label>CPF:</label>
                    <InputMask mask="999.999.999-99" id="cpf">
                      {(inputProps) => <input {...inputProps} type="text" placeholder="Digite o CPF do colaborador" />}
                    </InputMask>
                  </div>
                  <div className={style.DadosPessoais}>
                    <label>Biometria:</label>
                    <input type="text" placeholder="Biometria do colaborador" />
                    <label htmlFor="phone">Telefone:</label>
                    <InputMask
                      mask="(99) 99999-9999"
                      id="phone">
                      {(inputProps) => <input {...inputProps} type="tel" placeholder="Digite o telefone do colaborador" />}
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
                    {erroCep && <p style={{ color: "red", marginBottom: '1rem', fontStyle: 'italic', fontSize: '1rem' }}>{erroCep}</p>} {/* Exibe a mensagem de erro */}

                    <label>Rua:</label>
                    <input
                      type="text"
                      value={rua}
                      onChange={({ target }) => setRua(target.value)}
                      onBlur={validaRua} // Chama validação ao sair do campo
                      placeholder="Digite o nome da Rua"
                    />
                    {erroRua && <p style={{ color: "red", marginBottom: '1rem', fontStyle: 'italic', fontSize: '1rem' }}>{erroRua}</p>} {/* Exibe a mensagem de erro */}

                    <label>Estado:</label>
                    <input
                      type="text"
                      value={estado}
                      onChange={({ target }) => setEstado(target.value)}
                      onBlur={validaEstado}
                      placeholder="Nome do Estado"
                    />
                    {erroEstado && <p style={{ color: "red", marginBottom: '1rem', fontStyle: 'italic', fontSize: '1rem' }}>{erroEstado}</p>} {/* Exibe a mensagem de erro */}
                    <label>Bairro:</label>
                    <input
                      type="text"
                      value={bairro}
                      onChange={({ target }) => setBairro(target.value)}
                      onBlur={validaBairro}
                      placeholder="Digite o nome do Bairro"
                    />
                    {erroBairro && <p style={{ color: "red", marginBottom: '1rem', fontStyle: 'italic', fontSize: '1rem' }}>{erroBairro}</p>} {/* Exibe a mensagem de erro */}
                  </div>
                  <div className={style.DadosEndereco}>
                    <label>Cidade:</label>
                    <input
                      type="text"
                      value={cidade}
                      onChange={({ target }) => setBairro(target.value)}
                      onBlur={validaCidade}
                      placeholder="Nome da Cidade"
                    />
                    {erroCidade && <p style={{ color: "red", marginBottom: '1rem', fontStyle: 'italic', fontSize: '1rem' }}>{erroCidade}</p>} {/* Exibe a mensagem de erro */}

                    <label>Número:</label>
                    <input type="text"
                      onChange={({ target }) => setNumero(target.value)}
                      onBlur={validaNumero}
                      placeholder="Ex: 01"
                    />
                    {erroNumero && <p style={{ color: "red", marginBottom: '1rem', fontStyle: 'italic', fontSize: '1rem' }}>{erroNumero}</p>} {/* Exibe a mensagem de erro */}

                    <label>Complemento:</label>
                    <input type="text" placeholder="Ex: Casa, Apto" />
                  </div>
                </div>
              </form>
            </div>
            <div className={style.ContainerButton}>
              <button type="submit" className={style.Button} onClick={handleSubmit}>Cadastrar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
