"use client";
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import CabecalhoLogado from '@/cabecalhoLogado/page';
import { useRouter } from 'next/navigation';
import MenuLateral from '@/components/menuLateral/page';  // Importa o componente de menu lateral
import axios from 'axios';

export default function CadastroP() {
  const router = useRouter();

  const [selectedSetores, setSelectedSetores] = useState([]);

  useEffect(()=>{
    getSetores()
  },[])

  const getSetores = async ()=>{
    const response = await axios.get('http://localhost:3333/Setores/1')
    const setores = response.data.dados
    const newSetores = setores.map((setor)=>{
        return {
          ...setor,
          checked:false
        }
      })

      console.log(newSetores)


    setSelectedSetores(newSetores)
  }

  const handleCheckboxChange = (index) => {

    const newSelectedSetores = [...selectedSetores]
    if(newSelectedSetores[index].checked){
      newSelectedSetores[index].checked = false
    } else {
      newSelectedSetores[index].checked = true
    }

    
    setSelectedSetores(newSelectedSetores);
  };

  const handleClick = ({target}) => {
    const newSelectedSetores = [...selectedSetores]
    const hasSelectedSetor = newSelectedSetores.filter(setor => setor.checked === true).length !== 0

    if(!hasSelectedSetor){
      alert("Nenhum setor selecionado.");
      return;
    }


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
                    <div key={setor} className={styles.containerInput}>
                      <label className={styles.label} htmlFor={setor}>
                        {setor.setor_nome}
                      </label>
                      <input
                        type="checkbox"
                        name={setor.setor_nome}
                        id={setor}
                        checked={setor.checked}
                        onChange={()=>handleCheckboxChange(index)}
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
