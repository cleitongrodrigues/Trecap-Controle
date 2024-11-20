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
                    <h1 className={styles.tittleSecContainer}>
                        Esqueci minha Senha
                    </h1>

                    <div className={styles.containerMensagem}>
                        {/* <h1 className={styles.bkTitleBold}>Atenção!</h1> */}
                        <h1 className={styles.bkSubTittle}>Um email de recuperação foi encaminhado para o email informado!</h1>
                    </div>

                    {/* <input className={styles.textBox}
                        placeholder="Digite Seu Email"
                    /> */}

                    <button className={styles.button}>ENVIAR!</button>

                </div>
            </div>
        </div>

    )
}
