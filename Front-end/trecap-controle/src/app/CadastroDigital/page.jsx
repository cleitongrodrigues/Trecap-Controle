"use client";
import { useState } from 'react';
import styles from './page.module.css';
import MenuLateral from "@/components/menuLateral/page";
import Head from 'next/head'; // Importando Head para adicionar a fonte

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cpf: '',
    phone: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateCPF = (cpf) => {
    return cpf.length === 11; // Simples: verifica se tem 11 dígitos
  };

  const validatePhone = (phone) => {
    return phone.length >= 10; // Telefone deve ter ao menos 10 dígitos
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.cpf || !formData.phone) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    if (!validateCPF(formData.cpf)) {
      setError('CPF inválido. Deve ter 11 dígitos.');
      return;
    }

    if (!validatePhone(formData.phone)) {
      setError('Telefone inválido. Deve ter pelo menos 10 dígitos.');
      return;
    }

    console.log(formData);
  };

  return (
    <>
      <Head>
        {/* Adicionando a fonte Poppins diretamente no <Head> */}
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
      </Head>
      
      <MenuLateral />
   
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2 className={styles.title}>Cadastro para digital</h2>
        
          {error && <p className={styles.error}>{error}</p>}

          <div className={styles['form-group']}>
            <label>Nome:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className={styles['form-group']}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className={styles['form-group']}>
            <label>Senha:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className={styles['form-group']}>
            <label>CPF:</label>
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              placeholder="Somente números"
            />
          </div>

          <div className={styles['form-group']}>
            <label>Telefone:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Somente números"
            />
          </div>

          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </>
  );
}
