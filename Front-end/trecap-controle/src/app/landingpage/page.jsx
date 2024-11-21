"use client";
import Image from "next/image";
import Link from "next/link";
import { IconContext } from "react-icons";
import { MdCalendarMonth, MdHourglassBottom, MdEventNote, MdPeople } from "react-icons/md";
import style from "./page.module.css";
import CabecalhoLogado from "@/cabecalhoLogado/page";

export default function LandingPage() {
    return (
        <>
            <CabecalhoLogado />

            {/* Hero Section */}
            <section className={style.hero}>
                <div className={style.heroContent}>
                    <h1>TRANSFORME A GESTÃO DE EVENTOS</h1>
                    <p>Organize, registre e acompanhe eventos e colaboradores de forma prática e eficiente.</p>
                    <Link href="/eventos" className={style.ctaButton}>Explore Eventos</Link>
                </div>
            </section>

                 <section className={style.features}>
                <h2>Principais Funcionalidades</h2>
                <div className={style.carouselWrapper}>
                    <div className={style.featuresCarousel}>
                        <div className={style.featureItem}>
                            <IconContext.Provider value={{ size: 60 }}>
                                <MdEventNote />
                            </IconContext.Provider>
                            <h3>Eventos</h3>
                            <p>Crie, gerencie e acompanhe eventos com facilidade.</p>
                        </div>
                        <div className={style.featureItem}>
                            <IconContext.Provider value={{ size: 60 }}>
                                <MdHourglassBottom />
                            </IconContext.Provider>
                            <h3>Histórico</h3>
                            <p>Acesse o histórico completo dos eventos e presenças.</p>
                        </div>
                        <div className={style.featureItem}>
                            <IconContext.Provider value={{ size: 60 }}>
                                <MdCalendarMonth />
                            </IconContext.Provider>
                            <h3>Calendário</h3>
                            <p>Visualize todos os eventos e datas importantes em um só lugar.</p>
                        </div>
                        <div className={style.featureItem}>
                            <IconContext.Provider value={{ size: 60 }}>
                                <MdPeople />
                            </IconContext.Provider>
                            <h3>Colaboradores</h3>
                            <p>Gerencie facilmente os colaboradores de cada evento.</p>
                                                        
                        </div>
                    </div>
                </div>
            </section>


            {/* Call to Action */}
            <section className={style.ctaSection}>
                <h2>PRONTO PARA GERIR SEUS EVENTOS?</h2>
                <p>Faça a gestão de maneira simples e eficaz.</p>
                <Link href="https://wa.me/5514998803635?text=Ol%C3%A1,%20bem%20vindo%20ao%20TRECAP%20Controle,%20como%20podemos%20ajudar%20?" className={style.ctaButtonLink} target="_blank" rel="noopener noreferrer">Entre em contato conosco.</Link>
            </section>

            {/* Footer */}
            <footer className={style.footer}>
                <p>&copy; {new Date().getFullYear()} Trecap. Todos os direitos reservados.</p>
                <div className={style.footerLinks}>
                    <Link href="/politica-privacidade">Política de Privacidade</Link>
                    <Link href="/termos-uso">Termos de Uso</Link>
                    <Link href="https://wa.me/5514998803635?text=Ol%C3%A1,%20bem%20vindo%20ao%20TRECAP%20Controle,%20como%20podemos%20ajudar%20?" target="_blank" rel="noopener noreferrer">Contato</Link>
                </div>
            </footer>
        </>
    );
}
