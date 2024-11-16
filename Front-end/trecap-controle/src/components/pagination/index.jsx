import style from './style.module.css'
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export default function Pagination({ currentPage, prev, next, length, setPaginaAtual }) {
    return (
        <div className={style.container}>
            {prev && <button className={style.buttonChangePage} onClick={prev}><MdChevronLeft /></button>}
            <div className={style.containerPages}>
                {Array.from({ length: length }, (_, i) => (
                    <button onClick={()=>setPaginaAtual(i + 1)} className={`${currentPage === i + 1 ? style.active : ''}`} key={i}>{i + 1}</button>
                ))}
            </div>
            {next && <button className={style.buttonChangePage} onClick={next}><MdChevronRight /></button>}
        </div>
    );
}