'use client'
import styles from './page.module.css'
import Image from "next/image";
import Form from '@/components/Form';
import Input from '@/components/Input';
import ButtonForm from '@/components/ButtonForm';
import useForm from '@/hooks/useForm';

export default function esqueceuSenha() {
    const email = useForm('email')
    return (
        <Form message={'Treinamento e capacitação para colaboradores'}>
            <h2>Esqueci minha senha</h2>
            <div className={styles.messageBox}>
                <h3>Atenção!</h3>
                <p>Insira um email para recurepar sua senha!</p>
            </div>
            <Input 
                labelText='Email'
                inputPlaceholderText='email@company.com'
                typeInput='text'
                name='email'
                {...email}
            />
            <ButtonForm>Enviar</ButtonForm>
        </Form>
    )
}
