"use client";
import styles from './page.module.css'
import { useState } from 'react'
import CabecalhoLogado from '@/cabecalhoLogado/page';
import { useRouter } from 'next/navigation';

export default function CadastroP() {

  const router = useRouter()

  const [selectedSetores, selectedSetoresSetores] = useState({
    producao: true,
    cargaDescarga: true,
    encarregados: true,
    almoxarifado: true,

  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    selectedSetoresSetores((prev) => ({
      ...prev,
      [name]: checked,

    }));
  };

  const handleLIstar = () => {
    console.log('Setores selecionados:', selectedSetores);
  };

  const handleClick = () =>{
    router.push('/adicionar')
  }

  return (
    <>
      <CabecalhoLogado />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Treinamento sobre Higiene no Trabalho</h1>
        </div>
        <div className={styles.content}>
          <h2>Cadastro de Participantes</h2>
          <div className={styles.content2}>
            <div className={styles.setores}>
              <div className={styles.set} >
                <h3>Selecione setores participantes</h3>
              </div>
              <div className={styles.checkbox}>
                <div className={styles.containerInput}>
                  <label className={styles.label} htmlFor='producao'>
                    Produção
                  </label>
                  <input
                    type="checkbox"
                    name="producao"
                    id="producao"
                    checked={selectedSetores.producao}
                    onChange={handleCheckboxChange}
                  />
                </div>
                <div  className={styles.containerInput}>
                  <label className={styles.label} htmlFor='cargaDescarga'>
                    Carga e Descarga
                  </label>
                  <input
                    type='checkbox'
                    name='cargaDescarga'
                    id='cargaDescarga'
                    checked={selectedSetores.cargaDescarga}
                    onChange={handleCheckboxChange}
                  />
                </div>
                <div  className={styles.containerInput}>
                  <label className={styles.label} htmlFor='almoxarifado'>
                    Almoxarifado
                  </label>
                  <input
                    type='checkbox'
                    name='almoxarifado'
                    id='almoxarifado'
                    checked={selectedSetores.almoxarifado}
                    onChange={handleCheckboxChange}
                  />
                </div>
                <div  className={styles.containerInput}>
                  <label className={styles.label} htmlFor='encarregados'>
                    Encarregados
                  </label>
                  <input
                    type='checkbox'
                    name='encarregados'
                    id='encarregados'
                    checked={selectedSetores.encarregados}
                    onChange={handleCheckboxChange}
                  />
                </div>

                <button className={styles.button} onClick={handleClick}>Listar</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )

}







