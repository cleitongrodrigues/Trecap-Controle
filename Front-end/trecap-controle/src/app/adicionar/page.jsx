"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import MenuLateral from '@/components/menuLateral/page';

export default function CheckinEvento() {
  const [mostrarAlerta, setMostrarAlerta] = useState(true);
  const [participantes, setParticipantes] = useState([]); // Inicializado como array vazio
  const [participantesSelecionados, setParticipantesSelecionados] = useState([]);
  const [mensagemErro, setMensagemErro] = useState("");
  const [setores, setSetores] = useState([]); // Armazenar os setores selecionados
  const router = useRouter();

  useEffect(() => {
    // Recupera os setores selecionados do localStorage
    const setoresSelecionados = JSON.parse(localStorage.getItem('setorSelecionado'));
    if (setoresSelecionados && setoresSelecionados.length > 0) {
      setSetores(setoresSelecionados);

      // Faz a requisição para a API de colaboradores filtrada pelos setores
      const fetchParticipantes = async () => {
        try {
          const promises = setoresSelecionados.map((setor) =>
            fetch(`http://localhost:3333/colaboradores?setor=${setor}`).then((res) => res.json())
          );
          
          // Resolve todas as promessas
          const resultados = await Promise.all(promises);

          // Combina os dados de todos os setores
          const todosParticipantes = resultados.flatMap((res) => res.dados || []);
          
          setParticipantes(todosParticipantes);
          setParticipantesSelecionados(new Array(todosParticipantes.length).fill(false));

        } catch (error) {
          console.error("Erro ao buscar colaboradores:", error);
          setMensagemErro("Erro ao carregar participantes. Tente novamente.");
        }
      };

      fetchParticipantes();
    }
  }, []);

  const fecharAlerta = () => {
    setMostrarAlerta(false);
  };

  const handleCheckboxChange = (index) => {
    setMensagemErro("");
    setParticipantesSelecionados((prevSelecionados) => {
      const novosSelecionados = [...prevSelecionados];
      novosSelecionados[index] = !novosSelecionados[index];
      return novosSelecionados;
    });
  };

  const salvarParticipantes = async () => {
    const selecionados = participantes
      .filter((_, index) => participantesSelecionados[index])
      .map((participante) => participante.colaborador_nome);

    if (selecionados.length === 0) {
      setMensagemErro("Nenhum participante está selecionado.");
      return;
    }

    try {
      // Salvar os participantes selecionados no localStorage
      localStorage.setItem('participantesSelecionados', JSON.stringify(selecionados));

      console.log('Participantes selecionados salvos no localStorage:', selecionados);

      // Redirecionar para a página de confirmação
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
                  <h3>Setores Selecionados: {setores.length > 0 ? setores.join(", ") : "Nenhum setor selecionado"}</h3>
                  <div className={styles.containerContent}>
                    {mostrarAlerta && (
                      <div className={styles.alerta}>
                        <p>Selecione os participantes.</p>
                        <button onClick={fecharAlerta} className={styles.botaoFechar}>Ok</button>
                      </div>
                    )}

                    <div className={styles.listaParticipantes}>
                      <ul className={styles.participantes}>
                        {participantes.length > 0 ? (
                          participantes.map((participante, index) => (
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
                          ))
                        ) : (
                          <p>Nenhum participante encontrado</p>
                        )}
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
