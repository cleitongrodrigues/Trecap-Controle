// app/adicionar/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css"; // Ajuste o caminho se necessário
import CabecalhoLogado from "@/CabecalhoLogado/page";

export default function CheckinEvento() {
  const [mostrarAlerta, setMostrarAlerta] = useState(true);
  const [participantes, setParticipantes] = useState([]);
  const [participantesSelecionados, setParticipantesSelecionados] = useState([]);
  const [mensagemErro, setMensagemErro] = useState("");
  const [setor, setSetor] = useState("");
  const router = useRouter()

  useEffect(() => {
    // Dados mockados
    const participantesMock = [
      { nome: "Arlindo Goveia Santos" },
      { nome: "Artur Fernandes Silva" },
      { nome: "Bruno Alves Souza" },
      { nome: "Carlos Emanuel Santos" },
      { nome: "Douglas Bispo" },
      { nome: "Ronaldinho" },
      { nome: "Romarinhooooooooooo" },
    ];
    

    setParticipantes(participantesMock);
    setParticipantesSelecionados(new Array(participantesMock.length).fill(false));
  }, []);

  const fecharAlerta = () => {
    setMostrarAlerta(false);
  };

  const handleCheckboxChange = (index) => {
    setParticipantesSelecionados((prevSelecionados) => {
      const novosSelecionados = [...prevSelecionados];
      novosSelecionados[index] = !novosSelecionados[index];
      return novosSelecionados;
    });
  };

  const salvarParticipantes = async () => {
    const selecionados = participantes
      .filter((_, index) => participantesSelecionados[index])
      .map((participante) => participante.nome);

    if (selecionados.length === 0) {
      setMensagemErro("Nenhum participante está selecionado.");
      return;
    }

    try {
      // // Enviar dados para o backend (opcional)
      // const response = await fetch('/api/salvarParticipantes', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ participantes: selecionados }),
      // });

      // if (!response.ok) {
      //   throw new Error('Falha ao salvar participantes');
      // }

      // const result = await response.json();
      // console.log('Participantes salvos:', result);
      // setMensagemErro(""); // Limpar a mensagem de erro em caso de sucesso

      // Redirecionar para a página de confirmação com os participantes selecionados
      router.push('/confirmacao');
    } catch (error) {
      console.error('Erro ao salvar participantes:', error);
      setMensagemErro("Ocorreu um erro ao salvar os participantes.");
    }
  };

  return (
    <>
    <CabecalhoLogado />
    
    <div className={styles.Header}>
      <div className={styles.checkin}>
        <h1>TREINAMENTO SOBRE HIGIENE NO TRABALHO</h1>

        <div className={styles.cadastro}>
          <h2>Adicionar Participantes</h2>
          <h3>Setor Selecionado: {setor}</h3>
          <div>
            {mostrarAlerta && (
              <div className={styles.alerta}>
                <p>Selecione os participantes.</p>
                <button onClick={fecharAlerta} className={styles.botaoFechar}>
                  Ok
                </button>
              </div>
            )}

            <div className={styles.listaParticipantes}>
              <ul className={styles.participantes}>
                {participantes.map((participante, index) => (
                  <li key={index} className={styles.participanteItem}>
                    <label>
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        checked={participantesSelecionados[index]}
                        onChange={() => handleCheckboxChange(index)}
                      />
                      {participante.nome}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {mensagemErro && <div className={styles.mensagemErro}>{mensagemErro}</div>}
          </div>
        </div>

        <button className={styles.botaoCadastro} onClick={salvarParticipantes}>Salvar</button>
      </div>
    </div>
    <footer className={styles.footer}>
      <p>&copy; 2024 TRECAP. Todos os direitos reservados.</p>
    </footer>
    </>
  );
}
