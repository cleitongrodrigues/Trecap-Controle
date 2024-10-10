"use client";

import { useState, useEffect } from 'react';
import styles from "./page.module.css";
import CabecalhoLogado from "@/CabecalhoLogado/page";

export default function Colaboradores() {
    const [colaboradores, setColaboradores] = useState([]);
    const [colaboradoresFiltrados, setColaboradoresFiltrados] = useState([]);
    const [filtro, setFiltro] = useState(""); // Valor da pesquisa
    const [setorSelecionado, setSetorSelecionado] = useState(""); 
    const [setores, setSetores] = useState([]); 

    // Simulando a busca dos participantes cadastrados
    useEffect(() => {
        const colaboradoresMock = [
            { nome: "Sebastião Maradona", setor: "Produção" },
            { nome: "Artur Fernandes Silva", setor: "Carga e Descarga" },
            { nome: "Bruno Alves Souza", setor: "Produção" },
            { nome: "Carlos Emanuel Santos", setor: "Encarregado" },
            { nome: "Douglas Bispo", setor: "Almoxarifado" },
            { nome: "Onofre Cleiton Mariano", setor: "Produção" },
            { nome: "Bezerra Cabral Secundo", setor: "Encarregados" },
        ];

        const setoresMock = ["Produção", "Carga e Descarga", "Encarregado", "Almoxarifado"];

        setSetores(setoresMock);
        setColaboradores(colaboradoresMock);
        setColaboradoresFiltrados(colaboradoresMock); // Exibe todos no início
    }, []);

    // Atualiza a lista filtrada conforme o usuário digita e seleciona o setor
    useEffect(() => {
        const resultadoFiltrado = colaboradores.filter((colaborador) => {
            const nomeMatch = colaborador.nome.toLowerCase().startsWith(filtro.toLowerCase());
            const setorMatch = setorSelecionado ? colaborador.setor === setorSelecionado : true;
            return nomeMatch && setorMatch;
        });

        setColaboradoresFiltrados(resultadoFiltrado);
    }, [filtro, setorSelecionado, colaboradores]);

    // Função para atualizar o filtro de pesquisa
    const handleInputChange = (e) => {
        setFiltro(e.target.value);
    };

    // Função para atualizar o setor selecionado
    const handleSetorChange = (e) => {
        setSetorSelecionado(e.target.value);
    };

    return (
        <>
            <CabecalhoLogado />
            <div className={styles.Header}>
                <div className={styles.checkin}>
                    <h1 className={styles.titulo}>Colaboradores Cadastrados</h1>

                    <div className={styles.cadastro}>
                        <h2>Lista de Colaboradores</h2>

                        {/* Barra de pesquisa */}
                        <div className={styles.pesquisaContainer}>
                            <input
                                type="text"
                                placeholder="Pesquise um colaborador"
                                value={filtro}
                                onChange={handleInputChange}  // Atualiza ao digitar
                                className={styles.barraPesquisa}
                            />
                            <button className={styles.botaoPesquisar}>
                                Pesquisar
                            </button>
                        </div>

                        {/* Seletor de setor */}
                        <div className={styles.filtroSetorContainer}>
                            <label htmlFor="setor">Filtrar por setor:</label>
                            <select
                                id="setor"
                                value={setorSelecionado}
                                onChange={handleSetorChange}
                                className={styles.seletorSetor}
                            >
                                <option value="">Todos os setores</option>
                                {setores.map((setor, index) => (
                                    <option key={index} value={setor}>
                                        {setor}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Exibição dos resultados */}
                        <div className={styles.listaParticipantes}>
                            {colaboradoresFiltrados.length > 0 ? (
                                <ul className={styles.participantes}>
                                    {colaboradoresFiltrados.map((colaborador, index) => (
                                        <li key={index} className={styles.participanteItem}>
                                            <p>{colaborador.nome}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className={styles.mensagemErro}>Nenhum colaborador encontrado.</p>
                            )}
                        </div>

                        {/* Botão para cadastrar novo colaborador */}
                        <button className={styles.botaoCadastroNovo}>
                            Cadastrar Novo Colaborador
                        </button>
                    </div>
                </div>
            </div>

            <footer className={styles.footer}>
                <p>&copy; 2024 TRECAP. Todos os direitos reservados.</p>
            </footer>
        </>
    );
}
