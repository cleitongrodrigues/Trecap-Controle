'use client'
import Form from '@/components/Form'
import styles from './page.module.css'
import Link from 'next/link'
import Input from '@/components/Input'
import useForm from '@/hooks/useForm'
import ButtonForm from '@/components/ButtonForm'
import { useState } from 'react'
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import strengthPasswordVerify from '../../../../utils/strengthPassword'
import { useRouter } from 'next/navigation'


export default function Cadastrar() {

  const router = useRouter()

  const email = useForm('email')
  const nome = useForm()
  const CPF = useForm('CPF')
  const CNPJ = useForm('CNPJ')
  const token = useForm()
  const password = useForm()
  const confirmPassword = useForm('confirmPassword')

  const [showPassword, setShowPassword] = useState(false)

  function handleShowPassword() {
    setShowPassword(!showPassword)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('Submit!')
    router.push('./usuario/login')
  }

  const {messagestrengthPassword, strengthPassword} = strengthPasswordVerify(password.value)

  return (
    <Form message="Crie uma conta!">
      <div className={styles.formHeader}>
        <h2>Cadastrar-se</h2>
        <Link href="/login">Ja possui uma conta?</Link>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          inputPlaceholderText='Nome'
          name='nome'
          labelText='Nome:'
          typeInput='text'
          {...nome}
        />
        <Input
          inputPlaceholderText='CPF'
          name='CPF'
          labelText='CPF:'
          typeInput='text'
          {...CPF}
        />
        <Input
          inputPlaceholderText='Email'
          name='email'
          labelText='Email:'
          typeInput='text'
          {...email}
        />
        <div className={styles.containerInputs}>
          <Input
            inputPlaceholderText='CNPJ'
            name='CNPJ'
            labelText='CNPJ:'
            typeInput='text'
            {...CNPJ}
          />
          <Input
            inputPlaceholderText='Token'
            name='token'
            labelText='Token:'
            typeInput='text'
            {...token}
          />
        </div>
        <div className={styles.containerInputsPassword}>
          <Input
            inputPlaceholderText='Password'
            name='password'
            labelText='Password:'
            typeInput={showPassword ? 'text' : 'password'}
            {...password}
            children={
              <span onClick={handleShowPassword} className={styles.passwordEye}>
                {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
              </span>
            }
          />
          <Input
            inputPlaceholderText='Confirm Password'
            name='confirmPassword'
            labelText='Confirm Password:'
            typeInput='password'
            {...confirmPassword}
          />
          <div className={styles.passwordRequiremts}>
            <p>O nível da sua senha é: {messagestrengthPassword}</p>
            <div className={styles.containerLevelPassword}>
              <div data-strong="weak" className={`${styles.levelPassword} ${strengthPassword >= 1 ? styles.active : ''}`}></div>
              <div data-strong="medium" className={`${styles.levelPassword} ${strengthPassword >= 2 ? styles.active : ''}`}></div>
              <div data-strong="strong" className={`${styles.levelPassword} ${strengthPassword >= 3 ? styles.active : ''}`}></div>
              <div data-strong="very-strong" className={`${styles.levelPassword} ${strengthPassword >= 4 ? styles.active : ''}`}></div>
            </div>
          </div>

        </div>

        <ButtonForm>Cadastrar</ButtonForm>
      </form>
    </Form>
  )
}
