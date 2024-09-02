import styles from '../cabecalho/page.module.css';
import Image from 'next/image';
import logo from '../assets/logo.png';

export default function Cabecalho(){
    return(
        <header className={styles.header}>
        <div className={styles.logo}>
            <h1 className={styles.logoTexto}>Trecap</h1>
            <Image src={logo} className={styles.logoImage}/>
        </div>
        <div className={styles.buttonContainer}>
            <button className={styles.loginButton}>Login</button>
            <button className={styles.registerButton}>Cadastrar</button>
        </div>
        </header>
    )
}