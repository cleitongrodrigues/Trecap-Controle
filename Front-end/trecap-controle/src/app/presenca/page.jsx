import styles from '../presenca/page.module.css';
import CabecalhoLogado from '@/CabecalhoLogado/page';

export default function CheckinEvento(){
    return(
        <>
        <CabecalhoLogado />
       
        
    <div className={styles.Header} >
        
            <div className={styles.checkin}>
                <h1>Treinamento Sobre Higiene No Trabalho</h1>
               
               <div className={styles.cadastro} >
               <h2>Lista de Colaboradores</h2>
               </div>

                <button className={styles.botaoCadastro}>Cadastrar participantes</button>
               
            </div>

            <div>
                
            </div>

        
    </div>
        
    </>
        

    )     
}