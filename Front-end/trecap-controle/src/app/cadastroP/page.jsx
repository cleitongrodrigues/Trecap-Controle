"use client";
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import MenuLateral from '@/components/menuLateral/page';
import axios from 'axios';

export default function CadastroP() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const evento = searchParams.get('evento'); // Captura o nome do evento da URL
  const [selectedSetores, setSelectedSetores] = useState([]);
  const [loading, setLoading] = useState(true); // Para controlar o estado de carregamento
  const [error, setError] = useState(null); // Para armazenar erros

  useEffect(() => {
    getSetores();
  }, []);

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

  const handleCheckboxChange = (index) => {
    const newSelectedSetores = [...selectedSetores];
    newSelectedSetores[index].checked = !newSelectedSetores[index].checked;
    setSelectedSetores(newSelectedSetores);
  };

  const handleClick = () => {
    const setoresSelecionados = selectedSetores.filter((setor) => setor.checked);
    
    if (setoresSelecionados.length === 0) {
      alert("Nenhum setor selecionado.");
      return;
    }

    const setoresSelecionadosNome = setoresSelecionados.map(setor => setor.setor_nome);
    localStorage.setItem('setorSelecionado', JSON.stringify(setoresSelecionadosNome));
    
    // Salvar o nome do evento no localStorage
    if (evento) {
      localStorage.setItem('eventoSelecionado', evento);
    }

    router.push('/adicionar');
  };

  return (
    <>
      <MenuLateral />
      <div className={styles.layout}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1>{evento ? evento : 'Nome do Evento Não Encontrado'}</h1>
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
                    Ir para a seleção de participantes.
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
