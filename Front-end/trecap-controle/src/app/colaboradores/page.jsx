"use client";

import { useState, useEffect } from 'react';

export default function Colaboradores() {
    const [colaboradores, setColaboradores] = useState([]);

    // Simulando a busca dos colaboradores cadastrados
    useEffect(() => {
        // Normalmente, você faria uma requisição aqui para pegar os dados da API
        const colaboradoresCadastrados = [
            { id: 1, nome: 'João Silva' },
            { id: 2, nome: 'Maria Oliveira' },
            { id: 3, nome: 'Carlos Souza' },
        ];
        setColaboradores(colaboradoresCadastrados);
    }, []);

    return (
        <div>
            <h1>Colaboradores Cadastrados</h1>
            <ul>
                {colaboradores.map((colaborador) => (
                    <li key={colaborador.id}>{colaborador.nome}</li>
                ))}
            </ul>
        </div>
    );
}
