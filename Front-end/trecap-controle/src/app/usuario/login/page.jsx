import style from "../login/page.module.css";
import Image from "next/image";
import logoBranca from "../../../assets/logoBranca.svg";

export default function Login() {
  return (
    <div className={style.ContainerGeral}>
      <div className={style.containerImage}>
        <div className={style.containerTitulo}>
          <h1 className={style.titulo}>TreCap</h1>
          <h3 className={style.subtitulo}>Presence Controler</h3>
        </div>
        <Image  className={style.Image} src={logoBranca} />
      </div>
      <h1 className={style.login}>Login</h1>
      <div className={style.containerInput}>
        <h3 className={style.campos}>Email:</h3>
        <input className={style.input}
        placeholder="Digite Seu Email"
        ></input>
      </div>
      <div>
        <h3 className={style.campos}>Senha:</h3>

        <div className={style.containerBotao}>
        <input className={style.input} placeholder="Digite Sua Senha" type='password'></input>
        <button className={style.botao}>asda</button>
        </div>
      </div>
    </div>
  );
}
