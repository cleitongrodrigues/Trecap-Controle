import styles from './page.module.css'
import Image from 'next/image';
import logo from '../assets/logo.png';
export default function CabecalhoLogado(){
    return(
        <header className={styles.header}>
        <div className={styles.logo}>
            <h1 className={styles.logoTexto}>Trecap</h1>
            <Image src={logo} className={styles.logoImage}/>
        </div>
        <div className={styles.buttonContainer}>
            <div>
                <h2>Olá Gestor</h2>
            </div>
            <div>
            <button className={styles.loginButton}>Sair</button>
            </div>
        </div>
        </header>
    )
}
