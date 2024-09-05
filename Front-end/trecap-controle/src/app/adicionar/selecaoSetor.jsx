// app/adicionar/selecaoSetor.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import styles from "./page.module.css"; // Ajuste o caminho se necessário

export default function SelecaoSetor() {
  const [setorSelecionado, setSetorSelecionado] = useState("");
  const router = useRouter();

  const setores = [
    "Produção",
    "Logística",
    "Marketing",
    "Financeiro",
  ];

  const handleSetorChange = (event) => {
    setSetorSelecionado(event.target.value);
  };

  const handleSubmit = () => {
    if (setorSelecionado) {
      router.push({
        pathname: '/adicionar/page',
        query: { setor: setorSelecionado },
      });
    } else {
      alert("Selecione um setor.");
    }
  };

  return (
    <div className={styles.Header}>
      <div className={styles.selecaoSetor}>
        <h1>Selecione um Setor</h1>
        <select onChange={handleSetorChange} value={setorSelecionado}>
          <option value="">Selecione...</option>
          {setores.map((setor, index) => (
            <option key={index} value={setor}>{setor}</option>
          ))}
        </select>
        <button onClick={handleSubmit}>Confirmar</button>
      </div>
    </div>
  );
}
