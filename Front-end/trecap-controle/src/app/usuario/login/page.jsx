'use client'

import style from "../login/page.module.css";
import Input from "@/components/Input";
import ButtonForm from "@/components/ButtonForm";
import Form from "@/components/Form";
import Link from "next/link";
import useForm from "@/hooks/useForm";
import { useAuth } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const { handleLogin, isLoading, error, isLogged } = useAuth()

  const email = useForm()
  const password = useForm()

  const router = useRouter()

  useEffect(() => {

    if(isLogged) {
      router.push('/usuario/cadastroColaborador') 
    }

  }, [isLogged, router])

  const handleClick = async event => {
    event.preventDefault()

    if(email.isValid() && password.isValid()){
      const loginInput = {
        email: email.value, 
        password: password.value
      }

      const isAuthenticated = await handleLogin(loginInput)  

      if(isAuthenticated) router.push('/usuario/cadastroColaborador')   
    }
  }

  return (
    <Form message={'Por favor, faça login!'}>
      <div className={style.formHeader}>
        <h2>Login</h2>
        <Link href="/usuario/cadastrar">Criar nova conta</Link>
      </div>
      <form className={style.form}>
        <Input
          labelText={'Email:'}
          inputPlaceholderText={'email@company.com'}
          typeInput={'text'}
          name={'email'}
          {...email}
        />
        <Input
          labelText={'Password:'}
          typeInput={'password'}
          name={'password'}
          inputPlaceholderText=''
          {...password}
        />
        <div className={style.containerFooter}>
          <div className={style.remember}>
            <input id="remember" type="checkbox" />
            <label htmlFor='remember'>Lembrar de mim</label>
          </div>
          <Link href="/esqueceusenha">Esqueceu a senha</Link>
        </div>
        {error && <p className={style.error}>{error}</p>}
        {
          !isLoading ?
          <ButtonForm onClick={handleClick}>Cadastrar</ButtonForm>
          : <ButtonForm disabled>Carrengado...</ButtonForm>
        }
        
      </form>
    </Form>
  );
}
