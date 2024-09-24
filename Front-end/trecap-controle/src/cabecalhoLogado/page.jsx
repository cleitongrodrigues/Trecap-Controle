'use client'
import styles from './page.module.css'
import Image from 'next/image';
import Link from 'next/link'
import logo from '../assets/logo.png';
export default function CabecalhoLogado(){
    return(
        <header className={styles.header}>
        <div className={styles.logo}>
            <Link href="/home/gestor">
                <h1 className={styles.logoTexto}>Trecap</h1>
                <Image src={logo} className={styles.logoImage}/>
            </Link>  
        </div>
        <div className={styles.buttonContainer}>
            <div>
            <button className={styles.SairButton}>Sair</button>
            </div>
        </div>
        </header>
    )
}
