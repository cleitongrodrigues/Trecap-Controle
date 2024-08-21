
import CabecalhoLogado from '@/cabecalhoLogado/page'
import style from '../login/page.module.css'
import Gestor from '@/home/gestor/page'
import Evento from '@/eventos/page'
import CadastrarEvento from '@/eventos/cadastro/page'

export default function Login(){
    return(
      <>
        <CabecalhoLogado/>
        {/* <Gestor/> */}
        {/* <Evento/> */}
        <CadastrarEvento/>
      </>
    )
}