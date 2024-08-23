import { Poppins } from "next/font/google";
import styles from './page.module.css'
import Image from "next/image";
import logoBranca from "../../../assets/logoBranca.svg";


const poppins = Poppins({
    weight: ['400', '700'],
    subsets: ['latin']
});


export default function esqueceuSenha() {
    return (
        <div className={styles.container}>
            <div className={styles.divflexbox}>
                <div className={styles.containerRoxo}>
                    <div className={styles.row}>
                        <h1 className={styles.trecapTitlle}>
                            TreCap
                        </h1>
                        <Image
                        className={styles.image}
                            src={logoBranca}
                            width={83}
                            height={85}
                            alt="Logo"
                        />
                    </div>
                    <h1 className={styles.trecapSubTitlle}>Treinamento e capacitação para colaboradores</h1>
                </div>
                <div className={styles.containerClaro}>

                    <h3 className={styles.campos}>Email:</h3>
                    <input className={styles.textBox}
                        placeholder="Digiete Seu Email"
                    />
                    <h3 className={styles.campos}>Senha:</h3>
                    <input className={styles.textBox}
                    type='password'
                        placeholder="Digiete Sua senha"
                    />

                    <button className={styles.button}>ENVIAR!</button>

                </div>
            </div>
        </div>

    )
}
