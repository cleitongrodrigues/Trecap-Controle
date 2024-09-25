
import Link from "next/link";
import { IconContext } from "react-icons";
import { MdCalendarMonth, MdHourglassBottom, MdEventNote, MdPeople, MdSettings, MdAccountCircle } from "react-icons/md";
import styles from './page.module.css'; // CSS para o menu lateral

const MenuLateral = () => {
  return (
    <div className={styles.menuLateral}>
      <IconContext.Provider value={{ size: "2rem" }}>
        <div className={styles.menuItems}>
          <Link href="/eventos">
            <MdEventNote /> Eventos
          </Link>
          <Link href="/historico">
            <MdHourglassBottom /> Histórico
          </Link>
          <Link href="/calendario">
            <MdCalendarMonth /> Calendário
          </Link>
          <Link href="/colaboradores">
            <MdPeople /> Colaboradores
          </Link>
        </div>

        <div className={styles.menuFooter}>
          <Link href="/configuracoes">
            <MdSettings /> Configurações
          </Link>
          <Link href="/perfil">
            <MdAccountCircle /> Perfil
          </Link>
        </div>
      </IconContext.Provider>
    </div>
  );
};

export default MenuLateral;
