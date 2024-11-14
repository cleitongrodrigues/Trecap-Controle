import { useState } from 'react';
import style from './styles.module.css'

import { IconContext } from "react-icons";
import { MdSearch, MdEdit, MdDelete } from "react-icons/md";
import axios from 'axios';
import Swal from "sweetalert2";

export default function ColaboradorItem({ key, colaborador, getColaboradores }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false); // Estado para o modal de exclusão
    const onClickExcluir = async () =>
        {
          await axios.delete(`http://localhost:3333/colaboradores/${colaborador.colaborador_id}`)
        //   await getColaboradores();
          setShowDeleteModal(false);
           getColaboradores()
            Swal.fire({
              title: "Deletado com sucesso!",
              icon: "success",
            });
        }
    return (
        <>
            {showDeleteModal && (
                <div className={style.modal}>
                    <div className={style.modalContent}>
                        <h2>Confirmar Exclusão</h2>
                        <p>
                            Tem certeza de que deseja excluir o(a) colaborador(a){" "}
                            {colaborador.colaborador_nome}?
                        </p>
                        <button onClick={onClickExcluir}>Excluir</button>
                        <button onClick={() => setShowDeleteModal(false)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
            <div key={key} className={style.ContainerDivs}>
                <div className={style.ContainerId}>
                    {colaborador.colaborador_id}
                </div>
                <div className={style.ContainerNome}>
                    {colaborador.colaborador_nome}
                </div>
                <div className={style.ContainerEmail}>
                    {colaborador.colaborador_email}
                </div>
                <div className={style.ContainerSetor}>
                    {colaborador?.setor_nome}
                </div>
                <div className={style.ContainerBotaoEditar}>
                    <button
                        type="button"
                        className={style.ButtonEditar}
                        
                    >
                        <IconContext.Provider value={{ size: 20 }}>
                            <MdEdit />
                        </IconContext.Provider>
                    </button>
                    <button
                        type="button"
                        className={style.ButtonExcluir}
                        onClick={() => setShowDeleteModal(true)}
                    >
                        <IconContext.Provider value={{ size: 20 }}>
                            <MdDelete />
                        </IconContext.Provider>
                    </button>
                </div>
            </div>
        </>
    )
}