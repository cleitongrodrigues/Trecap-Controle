import { useState } from 'react';
import style from './styles.module.css'

import { IconContext } from "react-icons";
import { MdSearch, MdEdit, MdDelete } from "react-icons/md";
import axios from 'axios';
import Swal from "sweetalert2";
import useForm from '@/hooks/useForm';
import InputMask from "react-input-mask";

export default function ColaboradorItem({ index, colaborador, getColaboradores }) {
    const [showModal, setShowModal] = useState(false);  
    const nome = useForm("nome");
    const email = useForm("email");
    const CPF = useForm("CPF");
    const biometria = useForm("biometria");
    const telefone = useForm("telefone");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentColaboradorId, setCurrentColaboradorId] = useState(1)
    const onClickExcluir = async () =>
        {
          await axios.delete(`http://localhost:3333/colaboradores/${colaborador.colaborador_id}`)
          setShowDeleteModal(false);
            await getColaboradores()
            Swal.fire({
              title: "Deletado com sucesso!",
              icon: "success",
            });
        }

        const handleEdit = (colaborador) => {
            nome.setValue(colaborador.colaborador_nome);
            email.setValue(colaborador.colaborador_email);
            CPF.setValue(colaborador.colaborador_CPF);
            biometria.setValue(colaborador.colaborador_biometria);
            telefone.setValue(colaborador.colaborador_telefone);
            setCurrentColaboradorId(colaborador.colaborador_id)
            setShowModal(true);
          };

        const handleSalvar = async (e) => {
            e.preventDefault()
            try{
                const colaboradorData = {
                    colaborador_nome: nome.value,
                    colaborador_CPF: CPF.value,
                    colaborador_biometria: biometria.value,
                    colaborador_telefone: telefone.value,
                    colaborador_email: email.value,
                    colaborador_id: currentColaboradorId
                }

                await axios.patch("http://localhost:3333/colaboradores", colaboradorData)
                Swal.fire({
                    title: "Atualizado com sucesso!",
                    icon: "success",
                  });
                setShowModal(false)
                await getColaboradores();
            } catch(e){
                console.log(e)
                Swal.fire({
                    icon: "error",
                    text: "Ocorreu algum erro ao editar o colaborador",
                  });
                return
            }
            
        }

        const handleCancelar = () =>{
            setShowModal(false)
        }
        
    return (
        <>
        <div key={index} className={style.ContainerDivs}>
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
             {showModal && (
                <div className={style.modal}>
                  <div className={style.modalContent}>
                    <h2>Editar Colaborador</h2>
                    <form>
                      <label>Nome:</label>
                      <input
                        type="text"
                        value={nome.value}
                        onChange={nome.onChange}
                        placeholder="Digite o nome completo do colaborador"
                      />
                      <label>Email:</label>
                      <input
                        type="text"
                        value={email.value}
                        onChange={email.onChange}
                        placeholder="Digite o email do colaborador"
                      />
                      <label>CPF:</label>
                      <InputMask
                        mask="999.999.999-99"
                        type="text"
                        value={CPF.value}
                        onChange={CPF.onChange}
                        placeholder="Digite o CPF do colaborador"
                      />
                      <label>Biometria:</label>
                      <input
                        type="text"
                        value={biometria.value}
                        onChange={biometria.onChange}
                        placeholder="Digite a biometria"
                      />
                      <label>Telefone:</label>
                      <InputMask
                        mask="(99) 99999-9999"
                        type="text"
                        value={telefone.value}
                        onChange={telefone.onChange}
                        placeholder="Digite o telefone do colaborador"
                      />
                      <button onClick={handleSalvar} type="submit" >
                        Salvar
                      </button>
                      <button onClick={handleCancelar} type="button">
                        Cancelar
                      </button>
                    </form>
                  </div>
                </div>
              )}
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
                        onClick={async ()=> await handleEdit(colaborador)}
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