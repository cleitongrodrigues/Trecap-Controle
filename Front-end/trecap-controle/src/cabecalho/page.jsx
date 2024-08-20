import styles from '../cabecalho/page.module.css';
// import logo from '@logo.png';

export default function Cabecalho(){
    return(
        <header className={styles.header}>
        <div className={styles.logo}>
            <h1 className={styles.logoTexto}>Trecap</h1>
            {/* <Image src={logo} className={styles.logoImage}/> */}
        </div>
        </header>
    )
}