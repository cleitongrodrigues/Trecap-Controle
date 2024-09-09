import style from "../login/page.module.css";
import Image from "next/image";
import logoBranca from "../../../assets/logoBranca.svg";
import Input from "@/components/Input";
import ButtonForm from "@/components/ButtonForm";

export default function Login() {
  return (
    <div className={style.ContainerGeral}>
      <main>
        <div className={style.containerImage}>
          <div className={style.containerTitulo}>
            <h1 className={style.titulo}>TreCap</h1>
            <h3 className={style.subtitulo}>Presence Controler</h3>
          </div>
          <Image className={style.Image} src={logoBranca} />
        </div>
        <form className={style.form}>
          <h1 className={style.login}>Login</h1>
          <div className={style.containerInput}>
            <Input
              labelText='Email:'
              inputPlaceholderText='Digite seu email...'
            />
          </div>
          <div className={style.containerInputPassword}>
            <Input
              labelText='Senha:'
              inputPlaceholderText='Digite seu email...'
              typeInput='password'
            />
          </div>
          <ButtonForm>Entrar</ButtonForm>
        </form>
      </main>
    </div>
  );
}
