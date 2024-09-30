"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./page.module.css";
import axios from "axios";
import MenuLateral from "@/components/menuLateral/page";

export default function Perfil() {
  const [lista, setLista] = useState([]);
  const [usuario, setUsuario] = useState("");
  const pathName = usePathname();

  const getUsuario = async () => {
    try {
      const response = await axios.get("http://localhost:3333/usuario");
      const dadosUsuario = response.data.dados;
      setLista(dadosUsuario);
      setUsuario(dadosUsuario[0].usu_nome);
    } catch (error) {
      console.error("Erro ao buscar usuários", error);
    }
  };

  useEffect(() => {
    getUsuario();
  }, []);

  console.log(pathName);

  return (
    <>
    <MenuLateral/>
      <div className={styles.ContainerGeral}>
        <h1>Perfil do usuário</h1>
        <form action="">
          <div>
            <label htmlFor="">Nome</label>
            <input type="text" name="" id="" placeholder="Nome do usuário" />
          </div>
          <div>
            <label htmlFor="">CPF</label>
            <input type="text" name="" id="" placeholder="CPF" />
          </div>
          <div>
            <label htmlFor="">Email</label>
            <input type="text" name="" id="" placeholder="Email" />
          </div>
          <div>
            <label htmlFor="">Telefone</label>
            <input type="text" name="" id="" placeholder="Telefone" />
          </div>
        </form>
      </div>
    </>
  );
}
