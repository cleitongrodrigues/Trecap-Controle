import Image from "next/image";
import styles from "./page.module.css";
import Login from "@/app/usuario/login/page";
import CabecalhoLogado from "@/cabecalhoLogado/page";
import Gestor from "./home/gestor/page";
import Evento from "./eventos/page";

export default function Home() {
  return (
   <>
    <CabecalhoLogado/>
    {/* <Gestor/> */}
    <Evento/>
   </>
  );
}
