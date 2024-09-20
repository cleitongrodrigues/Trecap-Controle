"use client";
import styles from './page.module.css';
import { useState } from 'react';
import CabecalhoLogado from '@/cabecalhoLogado/page';
import { useRouter } from 'next/navigation';
import MenuLateral from '@/components/menuLateral/page';  // Importa o componente de menu lateral

export default function CadastroP() {
  const router = useRouter();

  const [selectedSetores, setSelectedSetores] = useState({
    "Produção": false,
    "Carga e Descarga": false,
    "Encarregados": false,
    "Almoxarifado": false,
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSelectedSetores((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };
  
  const handleClick = () => {
    const setoresSelecionados = Object.keys(selectedSetores).filter(
      (setor) => selectedSetores[setor]
    );

    if (setoresSelecionados.length === 0) {
      alert("Nenhum setor selecionado.");
      return;
    }

    localStorage.setItem('setorSelecionado', setoresSelecionados.join(', '));
    router.push('/adicionar');
  };

  return (
    <>
      <CabecalhoLogado />

      <div className={styles.layout}>
        {/* Usa o componente MenuLateral */}
        <MenuLateral />

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
                  {Object.keys(selectedSetores).map((setor) => (
                    <div key={setor} className={styles.containerInput}>
                      <label className={styles.label} htmlFor={setor}>
                        {setor}
                      </label>
                      <input
                        type="checkbox"
                        name={setor}
                        id={setor}
                        checked={selectedSetores[setor]}
                        onChange={handleCheckboxChange}
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
