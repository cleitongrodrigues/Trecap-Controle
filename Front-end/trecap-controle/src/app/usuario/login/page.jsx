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

export default function Login() {
  const email = useForm();
  const password = useForm();

  const router = useRouter()

  const handleClick = (e) => {
    e.preventDefault()
    router.push('/eventos')
  }

  return (
    <Form message={'Por favor, faça login!'}>
      <div className={style.formHeader}>
        <h2>Login</h2>
        <Link href="/cadastrar">Criar nova conta</Link>
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
        <ButtonForm onClick={handleClick}>Cadastrar</ButtonForm>
      </form>
    </Form>
  );
}
