import CabecalhoLogado from "@/cabecalhoLogado/page";
import style from "./page.module.css";
export default function CadastrarEvento() {
  return (
    <>
      <CabecalhoLogado />
      <div className={style.ContainerGeral}>
        <div className={style.Container}>
          <h1>Cadastro de Colaboradores</h1>
          <div className={style.ContainerTudo}>
            <div className={style.FormDados}>
              <form action="">
                <label>Dados pessoais</label>
                <div className={style.CentralizaDados}>
                  <div className={style.DadosPessoais}>
                    <label>Nome do colaborador:</label>
                    <input type="text" name="" id="" />
                    <label>RG:</label>
                    <input type="number" name="" id="" />
                    <label>CPF:</label>
                    <input type="text" name="" id="" />
                  </div>
                  <div className={style.DadosPessoais}>
                    <label>Setor:</label>
                    <input type="text" name="" id="" />
                    <label>Biometira:</label>
                    <input type="text" name="" id="" />
                  </div>
                </div>
              </form>
            </div>
            <div className={style.FormEndereco}>
              <form action="">
                <div className={style.Teste}>
                  <label>Endereço</label>
                </div>
                <div className={style.CentralizaEndereco}>
                  <div className={style.DadosEndereco}>
                    <label>CEP:</label>
                    <input type="text" name="" id="" />
                            <label>Rua:</label>
                            <input type="text" name="" id="" />
                            <label>Estado:</label>
                            <input type="text" name="" id="" />
                    <label>Bairro:</label>
                    <input type="text" name="" id="" />
                  </div>
                  <div className={style.DadosEndereco}>
                    <label>Cidade:</label>
                    <input type="text" name="" id="" />
                    <label>Número:</label>
                    <input type="number" name="" id="" />
                    <label>Complemento:</label>
                    <input type="text" name="" id="" />
                  </div>
                </div>
              </form>
            </div>
            <div className={style.ContainerButton}>
              <button className={style.Button}>Concluir</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
