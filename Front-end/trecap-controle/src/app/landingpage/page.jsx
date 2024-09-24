import styles from './page.module.css'
import Image from 'next/image';
import logo from '../../assets/logo.png';

export default function LandingPage() {
    return (
        <>
            <header className={styles.header}>
                <div className={styles.Container}>

                    <div className={styles.flex}>
                        <div className={styles.logo}>
                            <h1 className={styles.logoTexto}>Trecap</h1>
                            <Image src={logo} className={styles.logoImage} />
                        </div>
                        <nav>
                            <ul>
                                <li><a href="">Home</a></li>
                                <li><a href="">Contato</a></li>
                                <li><a href="">Sobre</a></li>
                            </ul>
                        </nav>

                        <div className={styles.buttonContato}>
                            <button className={styles.botaoCadastrar}>Cadastrar</button>
                            <button className={styles.botaoLogin}>Login</button>
                        </div>
                    </div>

                </div>
            </header>

            <section className={styles.banner}>
                <h1>Teste <span>Teste</span></h1>
            </section>
        </>
    )
}