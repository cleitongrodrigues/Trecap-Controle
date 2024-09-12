'use client';

import CabecalhoLogado from "@/cabecalhoLogado/page";
import style from "./page.module.css";
import { useState } from "react";
import axios from "axios";
import InputMask from 'react-input-mask';
import { useRouter } from "next/navigation";

export default function CadastrarEvento() {

  const router = useRouter()

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

  const [complemento, setComplemento] = useState('');
  const [erroComplemento, setErroComplemento] = useState('');

  const campo = 'Este campo é obrigatório!';
  const mensagem = 'Este campo não deve conter menos que 4 caracteres';

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
    const cpfSemMascara = cpf.replace(/\D/g, '');
    console.log(cpfSemMascara.length);

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
    setErroRua(''); 
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
      setErroNumero(`${campo} e deve ser maior que zero`);
      return false;
    }
    setErroNumero('');
    return true;
  }

  const validaComplemento = () =>{
    if (complemento.length == 0) {
      setErroComplemento(campo);
      return false;
    }
    if (complemento.length < 4){
      setErroComplemento(mensagem);
      return false
    }
    setErroComplemento('');
    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita o reload da página
    // router.push('/usuario/login')
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
      validaComplemento();
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
                    <input
                      type="text"
                      value={nomeColaborador}
                      onChange={({ target }) => setNomeColaborador(target.value)}
                      // onBlur={validaNome}
                      placeholder="Digite o nome completo do colaborador"
                    />
                    {erroNomeColaborador && <p style={{ color: "red", marginBottom: '1rem', fontStyle: 'italic', fontSize: '1rem' }}>{erroNomeColaborador}</p>} {/* Exibe a mensagem de erro */}

                    <label>Email:</label>
                    <input
                      type="text"
                      value={email}
                      onChange={({ target }) => setEmail(target.value)}
                      // onBlur={validaEmail}
                      placeholder="Digite o email do colaborador"
                    />
                    {erroEmail && <p style={{ color: "red", marginBottom: '1rem', fontStyle: 'italic', fontSize: '1rem' }}>{erroEmail}</p>} {/* Exibe a mensagem de erro */}

                    <label>CPF:</label>
                    <InputMask
                      mask="999.999.999-99"
                      type="text"
                      value={cpf}
                      onChange={({ target }) => setCpf(target.value)}
                      // onBlur={validaCpf}
                      placeholder="Digite o CPF do colaborador"
                    />
                    {erroCpf && <p style={{ color: "red", marginBottom: '1rem', fontStyle: 'italic', fontSize: '1rem' }}>{erroCpf}</p>} {/* Exibe a mensagem de erro */}

                  </div>
                  <div className={style.DadosPessoais}>
                    <label>Biometria:</label>
                    <input
                      type="text"
                      value={biometria}
                      onChange={({ target }) => setBiometria(target.value)}
                      // onBlur={validaBiometria} 
                      placeholder="Digite o nome da Rua"
                    />
                    {erroBiometria && <p style={{ color: "red", marginBottom: '1rem', fontStyle: 'italic', fontSize: '1rem' }}>{erroBiometria}</p>} {/* Exibe a mensagem de erro */}

                    <label htmlFor="phone">Telefone:</label>
                    <InputMask
                      mask="(99) 99999-9999"
                      type="text"
                      value={telefone}
                      onChange={({ target }) => setTelefone(target.value)}
                      // onBlur={validaTelefone} 
                      placeholder="Digite o telefone do colaborador"
                    />
                    {erroTelefone && <p style={{ color: "red", marginBottom: '1rem', fontStyle: 'italic', fontSize: '1rem' }}>{erroTelefone}</p>}
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
                      // onBlur={validaRua} 
                      placeholder="Digite o nome da Rua"
                    />
                    {erroRua && <p style={{ color: "red", marginBottom: '1rem', fontStyle: 'italic', fontSize: '1rem' }}>{erroRua}</p>} {/* Exibe a mensagem de erro */}

                    <label>Estado:</label>
                    <input
                      type="text"
                      value={estado}
                      onChange={({ target }) => setEstado(target.value)}
                      // onBlur={validaEstado}
                      placeholder="Nome do Estado"
                    />
                    {erroEstado && <p style={{ color: "red", marginBottom: '1rem', fontStyle: 'italic', fontSize: '1rem' }}>{erroEstado}</p>} {/* Exibe a mensagem de erro */}
                    <label>Bairro:</label>
                    <input
                      type="text"
                      value={bairro}
                      onChange={({ target }) => setBairro(target.value)}
                      // onBlur={validaBairro}
                      placeholder="Digite o nome do Bairro"
                    />
                    {erroBairro && <p style={{ color: "red", marginBottom: '1rem', fontStyle: 'italic', fontSize: '1rem' }}>{erroBairro}</p>} {/* Exibe a mensagem de erro */}
                  </div>
                  <div className={style.DadosEndereco}>
                    <label>Cidade:</label>
                    <input
                      type="text"
                      value={cidade}
                      onChange={({ target }) => setCidade(target.value)}
                      // onBlur={validaCidade}
                      placeholder="Nome da Cidade"
                    />
                    {erroCidade && <p style={{ color: "red", marginBottom: '1rem', fontStyle: 'italic', fontSize: '1rem' }}>{erroCidade}</p>} {/* Exibe a mensagem de erro */}

                    <label>Número:</label>
                    <input type="text"
                      onChange={({ target }) => setNumero(target.value)}
                      // onBlur={validaNumero}
                      placeholder="Ex: 01"
                    />
                    {erroNumero && <p style={{ color: "red", marginBottom: '1rem', fontStyle: 'italic', fontSize: '1rem' }}>{erroNumero}</p>} {/* Exibe a mensagem de erro */}

                    <label>Complemento:</label>
                    <input
                      type="text"
                      value={complemento}
                      onChange={({target}) => setComplemento(target.value)}
                      // onBlur={validaComplemento}
                      placeholder="Ex: Casa, Apto"
                    />
                    {erroComplemento && <p style={{color: "red", marginBottom: '1rem', fontStyle: 'italic', fontSize: '1rem'}}>{erroComplemento}</p>}
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
