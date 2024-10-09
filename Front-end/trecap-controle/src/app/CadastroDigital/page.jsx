"use client";
import { useState } from 'react';
import InputMask from 'react-input-mask';
import styles from './page.module.css';
import MenuLateral from "@/components/menuLateral/page";
import Head from 'next/head'; // Importando Head para adicionar a fonte

export default function Register() {
  const [formData, setFormData] = useState({
    colaborador_nome: '',
    colaborador_CPF: '',
    colaborador_biometria: '',
    colaborador_ativo: '',
    colaborador_telefone: '',
    colaborador_email: '',
    empresa_id: '',
    setor_id: '',
    password: ''

  //   { 
  //     "colaborador_nome": "gabriel", 
  //     "colaborador_CPF": "55499433879", 
  //     "colaborador_biometria": "", 
  //     "colaborador_ativo": 1, 
  //     "colaborador_telefone": "14998339682", 
  //     "colaborador_email": "gabriel.sousa234@etec.sp.gov.br", 
  //     "empresa_id": "1", 
  //     "setor_id": "4"
  // }
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateCPF = (cpf) => {
    if (cpf.length !== 11 || !/^\d+$/.test(cpf)) return false; // Deve ter 11 dígitos e ser numérico

    // Cálculo dos dígitos verificadores
    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf[i - 1]) * (11 - i);
    }
    
    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf[9])) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf[i - 1]) * (12 - i);
    }
    
    remainder = (sum * 10) % 11;
    
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf[10])) return false;

    return true;
  };

  const validatePhone = (phone) => {
    return phone.length >= 10 && phone.length <= 11 && /^\d+$/.test(phone); // Deve ter entre 10 e 11 dígitos e ser numérico
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.cpf || !formData.phone) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    if (!validateCPF(formData.cpf.replace(/\D/g, ''))) {
      setError('CPF inválido. Deve ter 11 dígitos e ser um número válido.');
      return;
    }

    if (!validatePhone(formData.phone.replace(/\D/g, ''))) {
      setError('Telefone inválido. Deve ter entre 10 e 11 dígitos e ser um número válido.');
      return;
    }

    // Criar um objeto com os dados do formulário
    const userData = {
      colaborador_nome: formData.name,
      colaborador_CPF: formData.cpf.replace(/\D/g, ''), // Enviando apenas números
      colaborador_biometria: "",
      colaborador_ativo: 1,
      colaborador_telefone: formData.phone.replace(/\D/g, ''), // Enviando apenas números
      colaborador_email: formData.email,
      empresa_id: "1",
      setor_id: "4"
      // password: formData.password,
    };

  //   { 
  //     "colaborador_nome": "gabriel", 
  //     "colaborador_CPF": "55499433879", 
  //     "colaborador_biometria": "", 
  //     "colaborador_ativo": 1, 
  //     "colaborador_telefone": "14998339682", 
  //     "colaborador_email": "gabriel.sousa234@etec.sp.gov.br", 
  //     "empresa_id": "1", 
  //     "setor_id": "4"
  // }

    try {
      // Enviar dados para a API
      const response = await fetch('http://localhost:3333/colaboradores', { // Substitua pela URL da sua API
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      // Verificar se a requisição foi bem-sucedida
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao cadastrar usuário');
      }

      const result = await response.json();
      console.log('Usuário cadastrado com sucesso:', result);
      // Aqui você pode redirecionar o usuário ou exibir uma mensagem de sucesso
    } catch (error) {
      setError(error.message);
    }
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
              required
            />
          </div>

          <div className={styles['form-group']}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles['form-group']}>
            <label>Senha:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles['form-group']}>
            <label>CPF:</label>
            <InputMask
              mask="999.999.999-99"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              placeholder="Somente números"
              required
            />
          </div>

          <div className={styles['form-group']}>
            <label>Telefone:</label>
            <InputMask
              mask="(99) 99999-9999"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Somente números"
              required
            />
          </div>

          <button type="submit" className={styles.button}>Cadastrar</button>
        </form>
      </div>
    </>
  );
}
