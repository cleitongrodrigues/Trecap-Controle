'use client'

import style from "../login/page.module.css";
import Image from "next/image";
import logoBranca from "../../../assets/logoBranca.svg";
import Input from "@/components/Input";
import ButtonForm from "@/components/ButtonForm";
import { useRouter } from "next/navigation";
import Form from "@/components/Form";
import Link from "next/link";
import useForm from "@/hooks/useForm";
import { useContext } from "react";
import { useAuth, UserContext } from "@/context/userContext";

export default function Login() {
  const email = useForm('email');
  const password = useForm();

  const userContext = useAuth()

  const router = useRouter()

  const handleClick = async (e) => {
    e.preventDefault()

    if(email.isValid() && password.isValid())
    {
      await userContext.handleLogin({email: email.value, password: password.value})

      router.push('/usuario/cadastroColaborador')
    }
    
  }

  return (
    <Form message={'Por favor, faça login!'}>
      <div className={style.formHeader}>
        <h2>Login</h2>
        <Link href="/">Criar nova conta</Link>
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
          <Link className={style.forgotPassword} href="/esqueceusenha">Esqueceu a senha</Link>
        </div>
        <ButtonForm onClick={handleClick}>Entrar</ButtonForm>
        {userContext.error && <p className={style.error}>Login e/ou senha erradas</p>}
      </form>
    </Form>
  );
}
