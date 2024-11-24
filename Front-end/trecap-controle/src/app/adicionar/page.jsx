"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import MenuLateral from '@/components/menuLateral/page';
import axios from "axios";
import Swal from "sweetalert2";

export default function CheckinEvento() {
  const [participantes, setParticipantes] = useState([]);
  const [participantesSelecionados, setParticipantesSelecionados] = useState([]);
  const [mensagemErro, setMensagemErro] = useState("");
  const [setores, setSetores] = useState([]);
  const [nomeEvento, setNomeEvento] = useState(""); // Variável para armazenar o nome do evento
  const [termoBusca, setTermoBusca] = useState('');
  const [participantesFiltrados, setParticipantesFiltrados] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 10;
  const router = useRouter();

  useEffect(() => {
    // Recupera os setores selecionados e o nome do evento do localStorage
    const setoresSelecionados = JSON.parse(localStorage.getItem('setorSelecionado'));
    const eventoSelecionado = localStorage.getItem('eventoSelecionado'); // Recupera o nome do evento

    console.log("Setores selecionados do localStorage:", setoresSelecionados);
    console.log("Evento selecionado do localStorage:", eventoSelecionado);

    if (setoresSelecionados && setoresSelecionados.length > 0) {
      setSetores(setoresSelecionados);

      // Faz a requisição para a API de colaboradores filtrada pelos setores
      const fetchParticipantes = async () => {
        try {
          const promises = setoresSelecionados.map((setor) =>
            fetch(`http://localhost:3333/all-colaboradores?setor=${setor}`).then((res) => res.json())
          );

          // Resolve todas as promessas
          const resultados = await Promise.all(promises);
          const todosParticipantes = resultados.flatMap((res) => res.dados || []);

          setParticipantes(todosParticipantes);
          setParticipantesFiltrados(todosParticipantes);
          setParticipantesSelecionados(new Array(todosParticipantes.length).fill(false));

        } catch (error) {
          console.error("Erro ao buscar colaboradores:", error);
          setMensagemErro("Erro ao carregar participantes. Tente novamente.");
        }
      };

      fetchParticipantes();
    }

    async function getEventoNome() {
      const response = await axios.get(`http://localhost:3333/Eventos/${eventoSelecionado}`);
      const evento = response.data.dados[0];
      setNomeEvento(evento.evento_nome);
    }

    // Define o nome do evento
    if (eventoSelecionado) {
      getEventoNome()
    }
  }, []);

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
      .map((participante) => ({
        id: participante.colaborador_id,
        nome: participante.colaborador_nome
      }));

    if (selecionados.length === 0) {
      Swal.fire({
        title: 'ATENÇÃO!',
        text: 'Selecione pelo menos um colaborador para continuar.',
        icon: 'warning',
        confirmButtonText: 'OK'
      })
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

  const handleVoltar = () => {
    router.back();
  };

  const handleBusca = () => {
    const filtrados = participantes.filter(participante =>
      participante.colaborador_nome.toLowerCase().includes(termoBusca.toLowerCase())
    );
    setParticipantesFiltrados(filtrados);
    setPaginaAtual(1); // Resetar para a primeira página após a busca
  };

  const limparBusca = () => {
    setTermoBusca('');
    setParticipantesFiltrados(participantes);
    setPaginaAtual(1); // Resetar para a primeira página após limpar a busca
  };

  const mudarPagina = (novaPagina) => {
    setPaginaAtual(novaPagina);
  };

  // Calcular os participantes a serem exibidos na página atual
  const indiceUltimoParticipante = paginaAtual * itensPorPagina;
  const indicePrimeiroParticipante = indiceUltimoParticipante - itensPorPagina;
  const participantesPaginaAtual = participantesFiltrados.slice(indicePrimeiroParticipante, indiceUltimoParticipante);

  return (
    <>
      <MenuLateral />
      <div className={styles.layout}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1>{nomeEvento || "Evento não encontrado"}</h1> {/* Adicione uma mensagem padrão se o nome do evento não estiver disponível */}
            <div className={styles.cadastro}>
              <h3>Setores Selecionados:</h3>
              <h3>{setores.length > 0 ? setores.join(", ") : "Nenhum setor selecionado"}</h3>
              <h2>Adicionar Participantes</h2>
              <div className={styles.containerContent}>
                <div className={styles.busca}>
                  <input
                    type="text"
                    value={termoBusca}
                    onChange={(e) => setTermoBusca(e.target.value)}
                    placeholder="Buscar participantes"
                    className={styles.inputBusca}
                  />
                  <button onClick={handleBusca} className={styles.botaoBusca}>Buscar</button>
                  <button onClick={limparBusca} className={styles.botaoLimpar}>Limpar</button>
                </div>
                <div className={styles.listaParticipantes}>
                  <ul className={styles.participantes}>
                    {participantesPaginaAtual.length > 0 ? (
                      participantesPaginaAtual.map((participante, index) => (
                        <label key={participante.colaborador_id} className={styles.containerInput}>
                          <input
                            type="checkbox"
                            checked={participantesSelecionados[participantes.indexOf(participante)]}
                            onChange={() => handleCheckboxChange(participantes.indexOf(participante))}
                            className={styles.input}
                          />
                          <span className={styles.label}>
                            {participante.colaborador_nome}
                          </span>
                        </label>
                      ))
                    ) : (
                      <p>Nenhum participante encontrado</p>
                    )}
                  </ul>
                </div>

                {mensagemErro && <div className={styles.mensagemErro}>{mensagemErro}</div>}
              </div>
            </div>
            <div className={styles.paginacao}>
              <div className={styles.numerosPagina}>
                {Array.from({ length: Math.ceil(participantesFiltrados.length / itensPorPagina) }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => mudarPagina(index + 1)}
                    className={paginaAtual === index + 1 ? styles.paginaAtiva : styles.pagina}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <div>
                <button className={styles.botaoSalvar} onClick={salvarParticipantes}>Salvar</button>
                <button className={styles.botaoVoltar} onClick={handleVoltar}>Voltar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
