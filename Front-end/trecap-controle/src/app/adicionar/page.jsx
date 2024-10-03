"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import MenuLateral from '@/components/menuLateral/page';

export default function CheckinEvento() {
  const [mostrarAlerta, setMostrarAlerta] = useState(true);
  const [participantes, setParticipantes] = useState([]);
  const [participantesSelecionados, setParticipantesSelecionados] = useState([]);
  const [mensagemErro, setMensagemErro] = useState("");
  const [setor, setSetor] = useState(""); // Armazenar o setor selecionado
  const router = useRouter();

  useEffect(() => {
    // Recupera o setor selecionado do localStorage
    const setorSelecionado = JSON.parse(localStorage.getItem('setorSelecionado'))[0];
    if (setorSelecionado) {
      setSetor(setorSelecionado);

      // Faz a requisição para a API de colaboradores filtrada pelo setor
      const fetchParticipantes = async () => {
        try {
          const response = await fetch(`http://localhost:3333/colaboradores?setor=${setorSelecionado}`);
          const data = await response.json();
          console.log(data)

          setParticipantes(data.dados);

          // Inicia o array de participantesSelecionados com valores 'false' (nenhum selecionado inicialmente)
          setParticipantesSelecionados(new Array(data.length).fill(false));
        } catch (error) {
          console.error("Erro ao buscar colaboradores:", error);
        }
      };

      fetchParticipantes();
    }
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
      router.push('/participantes-selecionados');
    } catch (error) {
      console.error('Erro ao salvar participantes:', error);
      setMensagemErro("Ocorreu um erro ao salvar os participantes.");
    }
  };

  return (
    <>
    <MenuLateral />
    <div className={styles.body}>
      <div className={styles.layout}>
        <div className={styles.mainContent}>
          <div className={styles.Header}>
            <div className={styles.checkin}>
              <h1>TREINAMENTO SOBRE HIGIENE NO TRABALHO</h1>

              <div className={styles.cadastro}>
                <h2>Adicionar Participantes</h2>
                <h3>Setor Selecionado: {setor || "Nenhum setor selecionado"}</h3> {/* Correção aqui */}
                <div className={styles.containerContent}>
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
                            {participante.colaborador_nome}
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
        </div>
      </div>
    </div>
    </>
  );
}
