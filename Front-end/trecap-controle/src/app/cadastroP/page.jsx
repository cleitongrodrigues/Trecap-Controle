"use client";
import style from './page.module.css'
import {useState} from 'react'

export default function CadastroP () {
    
  const [selectedSetores, selectedSetoresSetores] = useState({
    producao: true,
    cargaDescarga: true,
    encarregados: true,
    almoxarifado: true,

  });
  
  const handleCheckboxChange = (e) => {
    const {name, checked } = e.target;
    selectedSetores((prev) => ({
     ...prev,
     [name]: checked,       

    }));
  };

  const handleLIstar = () => {
    console.log('Setores selecionados:', selectedSetores);
  };
  
  return(
    <div className='container'>
        <div className='header'>
            <h1>Treinamento sobre Higiene no Trabalho</h1>
        </div>
        <div className='content'>
            <h2>Cadastro de Participantes</h2>
            <div className='setores'>
                <h3>Selecione setores participantes</h3>
                <div className='checkbox-group'>
                    <label>
                        <input
                        type="checkbox"
                        name="producao"
                        checked={selectedSetores.producao}
                        onChange={handleCheckboxChange}
                        />
                        Produção
                    </label>
                    <label>
                        <input
                        type='checkbox'
                        name='cargaDescarga'
                        checked={selectedSetores.cargaDescarga}
                        onChange={handleCheckboxChange}
                        />
                        Carga e Descarga
                    </label>
                    <label>
                        <input
                        type='checkbox'
                        name='almoxarifado'
                        checked={selectedSetores.almoxarifado}
                        onChange={handleCheckboxChange}
                        />
                        Almoxarifado
                    </label>
                </div>
            </div>
        </div>
        <button onClick={handleLIstar}>Listar</button> 
    </div> 

  )

}
    
    
    
    
    
 

