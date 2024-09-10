// app/adicionar/page.jsx

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css"; 
import CabecalhoLogado from "@/CabecalhoLogado/page";

export default function CheckinEvento() {
  const [mostrarAlerta, setMostrarAlerta] = useState(true);
  const [participantes, setParticipantes] = useState([]);
  const [participantesSelecionados, setParticipantesSelecionados] = useState([]);
  const [mensagemErro, setMensagemErro] = useState("");
  const [setor, setSetor] = useState("");
  const router = useRouter();

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
      // Salvar os participantes selecionados no localStorage
      localStorage.setItem('participantesSelecionados', JSON.stringify(selecionados));

      // Verifique se os participantes estão sendo salvos corretamente
      console.log('Participantes selecionados salvos:', selecionados);

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
