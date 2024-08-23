import styles from '../presenca/page.module.css';
import CabecalhoLogado from '@/CabecalhoLogado/page';

export default function CheckinEvento(){
    return(
        <>
        <CabecalhoLogado />
       
        
    <div>
        
            <div className={styles.checkin}>
                <h1>Treinamento Sobre Higiene No Trabalho</h1>
            </div>            
    </div>
        
    </>
        

    )     
}