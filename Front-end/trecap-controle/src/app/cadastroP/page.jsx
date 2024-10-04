"use client";
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import MenuLateral from '@/components/menuLateral/page';  // Importa o componente de menu lateral
import axios from 'axios';

export default function CadastroP() {
  const router = useRouter();
  const [selectedSetores, setSelectedSetores] = useState([]);

  useEffect(() => {
    getSetores();
  }, []);

  const getSetores = async () => {
    try {
      const response = await axios.get('http://localhost:3333/Setores/1');
      const setores = response.data.dados;

      // Adiciona uma propriedade 'checked' para cada setor
      const newSetores = setores.map((setor) => ({
        ...setor,
        checked: false,
      }));

      setSelectedSetores(newSetores);
    } catch (error) {
      console.error('Erro ao buscar setores:', error);
    }
  };

  const handleCheckboxChange = (index) => {
    const newSelectedSetores = [...selectedSetores];
    newSelectedSetores[index].checked = !newSelectedSetores[index].checked;

    setSelectedSetores(newSelectedSetores);
  };

  const handleClick = () => {
    // Filtra os setores selecionados
    const setoresSelecionados = selectedSetores.filter((setor) => setor.checked);
    
    if (setoresSelecionados.length === 0) {
      alert("Nenhum setor selecionado.");
      return;
    }

    // Armazena os setores selecionados no localStorage
    const setoresSelecionadosNome = setoresSelecionados.map(setor => setor.setor_nome);
    localStorage.setItem('setorSelecionado', JSON.stringify(setoresSelecionadosNome));

    // Redireciona para a página de adicionar participantes
    router.push('/adicionar');
  };

  return (
    <>
      <MenuLateral />
      <div className={styles.layout}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1>Treinamento sobre Higiene no Trabalho</h1>
          </div>
          <div className={styles.content}>
            <h2>Cadastro de Participantes</h2>
            <div className={styles.content2}>
              <div className={styles.setores}>
                <div className={styles.set}>
                  <h3>Selecione setores participantes</h3>
                </div>
                <div className={styles.checkbox}>
                  {selectedSetores.map((setor, index) => (
                    <div key={setor.setor_id} className={styles.containerInput}>
                      <label className={styles.label} htmlFor={setor.setor_nome}>
                        {setor.setor_nome}
                      </label>
                      <input
                        type="checkbox"
                        name={setor.setor_nome}
                        id={setor.setor_nome}
                        checked={setor.checked}
                        onChange={() => handleCheckboxChange(index)}
                      />
                    </div>
                  ))}

                  <button className={styles.button} onClick={handleClick}>
                    Listar e Adicionar Participantes
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
