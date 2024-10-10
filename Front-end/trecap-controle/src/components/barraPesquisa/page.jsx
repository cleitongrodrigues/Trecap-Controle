import React from "react";
import { FaSearch } from "react-icons/fa"; // Importando o ícone da lupa
import styles from "./page.module.css"; // Importa o CSS do componente


const BarraPesquisa = ({ filtro, onFiltroChange, onPesquisar }) => {
    return (
        <div className={styles.pesquisaContainer}>
            <div className={styles.inputContainer}>
                <input
                    type="text"
                    placeholder="Pesquise um colaborador"
                    value={filtro}
                    onChange={onFiltroChange}
                    className={styles.barraPesquisa}
                />
                <FaSearch className={styles.lupaIcon} />
            </div>
            <button className={styles.botaoPesquisar} onClick={onPesquisar}>
                Pesquisar
            </button>
        </div>
    );
};

export default BarraPesquisa;
