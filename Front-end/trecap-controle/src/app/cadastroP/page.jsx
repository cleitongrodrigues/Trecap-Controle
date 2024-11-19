'use client'

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import MenuLateral from '@/components/menuLateral/page';
import styles from './page.module.css';

export default function CadastroP() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Estados
  const [eventoId, setEventoId] = useState('');
  const [eventoNome, setEventoNome] = useState('');
  const [selectedSetores, setSelectedSetores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nomeEventoError, setNomeEventoError] = useState(null)
  const [detalhesEventoError, setDetalhesEventoError] = useState(null)


  // useEffect para configurar o eventoId
  useEffect(() => {
    const idFromParams = searchParams.get('eventoId');
    const idFromLocalStorage = localStorage.getItem('eventoSelecionado');
    setEventoId(idFromParams || idFromLocalStorage || '');
  }, [searchParams]);

  // Função para buscar detalhes do evento
  const fetchEventoDetails = async (eventoId) => {
    try {
      const response = await axios.get(`http://localhost:3333/Eventos/${eventoId}`);
      const evento = response.data.dados[0];

      if (evento && evento.evento_nome) {
        setEventoNome(evento.evento_nome);  // Define o nome do evento
        console.log (eventoNome)
      } else {
        setNomeEventoError('Evento não encontrado.');
      }
    } catch (error) {
      setDetalhesEventoError('Erro ao buscar detalhes do evento.');
      console.error('Erro ao buscar detalhes do evento:', error);
    }
  };

  // useEffect para buscar os dados do evento e setores quando o eventoId mudar
  useEffect(() => {
    if (eventoId) {
      fetchEventoDetails(eventoId);
    }
  }, [eventoId]);


  // Função para buscar setores
  const getSetores = async () => {
    try {
      const response = await axios.get('http://localhost:3333/Setores/1');
      const setores = response.data.dados;
      const newSetores = setores.map((setor) => ({
        ...setor,
        checked: false,
      }));
      setSelectedSetores(newSetores);
    } catch (error) {
      setError('Erro ao buscar setores. Por favor, tente novamente.');
      console.error('Erro ao buscar setores:', error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect para buscar setores
  useEffect(() => {
    getSetores();
  }, []);

  // Manipulador para mudança no checkbox
  const handleCheckboxChange = (index) => {
    const newSelectedSetores = [...selectedSetores];
    newSelectedSetores[index].checked = !newSelectedSetores[index].checked;
    setSelectedSetores(newSelectedSetores);
  };

  // Manipulador para clique no botão
  const handleClick = () => {
    const setoresSelecionados = selectedSetores.filter((setor) => setor.checked);
    if (setoresSelecionados.length === 0) {
      alert('Nenhum setor selecionado.');
      return;
    }
    const setoresSelecionadosNome = setoresSelecionados.map((setor) => setor.setor_nome);
    localStorage.setItem('setorSelecionado', JSON.stringify(setoresSelecionadosNome));

    if (eventoId) {
      localStorage.setItem('eventoSelecionado', eventoId);
    }
    router.push('/adicionar');
  };

  return (
    <>
      <MenuLateral />
      <div className={styles.layout}>
        <div className={styles.container}>
          <div className={styles.header}>
            {/* Exibe o nome do evento ou um texto alternativo */}
            <h1>{eventoNome || 'Nome do evento não encontrado'}</h1>
          </div>
          <div className={styles.content}>
            <h2>Antes de iniciar, selecione os setores que irão participar do treinamento.</h2>
            <div className={styles.content2}>
              <div className={styles.setores}>
                <div className={styles.set}>
                  <h3>Selecione setores participantes</h3>
                </div>
                <div className={styles.checkbox}>
                  {loading ? (
                    <p>Carregando setores...</p>
                  ) : error ? (
                    <p style={{ color: 'red' }}>{error}</p>
                  ) : (
                    selectedSetores.map((setor, index) => (
                      <div key={setor.setor_id} className={styles.containerInput}>
                        <input
                          type="checkbox"
                          id={setor.setor_nome}
                          checked={setor.checked}
                          onChange={() => handleCheckboxChange(index)}
                          className={styles.input}
                        />
                        <label className={styles.label} htmlFor={setor.setor_nome}>
                          {setor.setor_nome}
                        </label>
                      </div>
                    ))
                  )}
                </div>
                <div className={styles.buttonContainer}>
                  <button className={styles.button} onClick={handleClick}>
                    Ir para a seleção de participantes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
