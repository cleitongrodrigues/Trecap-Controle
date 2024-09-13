'use client';

import CabecalhoLogado from "@/cabecalhoLogado/page";
import style from "./page.module.css";
import { useState } from "react";
import axios from "axios";
import InputMask from 'react-input-mask';
import { useRouter } from "next/navigation";
import useForm from "@/hooks/useForm";

export default function CadastrarEvento() {
// passar as validações para op useForm
  const router = useRouter()

  const nome = useForm('nome');

  const email = useForm('email');

  const CPF = useForm('CPF');

  const biometria = useForm('biometria');

  const telefone = useForm('telefone');

  const CEP = useForm('CEP');

  const [cidade, setCidade] = useState('');
  const [erroCidade, setErroCidade] = useState('');

  const [bairro, setBairro] = useState('');
  const [erroBairro, setErroBairro] = useState('');

  const [estado, setEstado] = useState('');
  const [erroEstado, setErroEstado] = useState('');

  const [rua, setRua] = useState('');
  const [erroRua, setErroRua] = useState("");

  const [numero, setNumero] = useState('');

  const [complemento, setComplemento] = useState('');
  const [erroComplemento, setErroComplemento] = useState('');

  const campo = 'Este campo é obrigatório!';
  const mensagem = 'Este campo não deve conter menos que 4 caracteres';

  async function getEndereco() {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${CEP.value}/json`);
      if (response.data.erro) {
        setRua('');
        setEstado('');
        setBairro('');
        setCidade('');
      } else {
        setRua(response.data.logradouro);
        setEstado(response.data.uf);
        setBairro(response.data.bairro);
        setCidade(response.data.localidade);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // const validaTelefone = () => {
  //   console.log(telefone.length)
  //   if (telefone.length === 0) {
  //     setErroTelefone(campo);
  //     return false;
  //   }
  //   setErroTelefone('');
  //   return true;
  // };

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
      if (CEP.isValid() && nome.isValid() && biometria.isValid() && telefone.isValid() && 
          validaRua() && validaEstado() && validaBairro() && validaCidade() && validaNumero() && validaComplemento()) {
        // Realiza o envio do formulário se todos os campos forem válidos
        console.log('Formulário válido, enviar dados.');
      } else {
        console.log('Formulário inválido, exibir erros.');
      }
    };

  const validaTudo = () => {
    nome.isValid();
    biometria.isValid();
    telefone.isValid();
    validaRua();
    validaEstado();
    validaBairro();
    validaCidade();
    validaNumero();
    validaComplemento();
  }

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
                    {nome.error && <p style={{ color: "red", marginBottom: '1rem', fontStyle: 'italic', fontSize: '1rem' }}>{nome.error}</p>} {/* Exibe a mensagem de erro */}

                    <label>Email:</label>
                    <input
                      type="text"
                      value={email.value}
                      onChange={email.onChange}
                      onBlur={email.onBlur}
                      placeholder="Digite o email do colaborador"

                    />
                    {email.error && <p style={{ color: "red", marginBottom: '1rem', fontStyle: 'italic', fontSize: '1rem' }}>{email.error}</p>} {/* Exibe a mensagem de erro */}

                    <label>CPF:</label>
                    <InputMask
                      mask="999.999.999-99"
                      type="text"
                      value={CPF.value}
                      onChange={CPF.onChange}
                      onBlur={CPF.onBlur}
                      placeholder="Digite o CPF do colaborador"
                    />
                    {CPF.error && <p style={{ color: "red", marginBottom: '1rem', fontStyle: 'italic', fontSize: '1rem' }}>{CPF.error}</p>} {/* Exibe a mensagem de erro */}

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
                    {biometria.error && <p style={{ color: "red", marginBottom: '1rem', fontStyle: 'italic', fontSize: '1rem' }}>{biometria.error}</p>} {/* Exibe a mensagem de erro */}

                    <label>Telefone:</label>
                    <InputMask
                      mask="(99) 99999-9999"
                      type="text"
                      value={telefone.value}
                      onChange={telefone.onChange}
                      onBlur={ telefone.onBlur} 
                      placeholder="Digite o telefone do colaborador"
                    />
                    {telefone.error && <p style={{ color: "red", marginBottom: '1rem', fontStyle: 'italic', fontSize: '1rem' }}>{telefone.error}</p>}

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
                      onBlur={ async () => {
                        CEP.onBlur()
                        if (CEP.isValid()) {
                          await getEndereco(); 
                          validaTudo()
                        }
                      }}
                      placeholder="Digite o CEP"
                    />
                    {CEP.error && <p style={{ color: "red", marginBottom: '1rem', fontStyle: 'italic', fontSize: '1rem' }}>{CEP.error}</p>} {/* Exibe a mensagem de erro */}

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
                    value={numero}
                      onChange={({ target }) => setNumero(target.value)}
                      // onBlur={validaNumero}
                      placeholder="Ex: 01"
                    />
                    {/* {erroNumero && <p style={{ color: "red", marginBottom: '1rem', fontStyle: 'italic', fontSize: '1rem' }}>{erroNumero}</p>} Exibe a mensagem de erro */}

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
