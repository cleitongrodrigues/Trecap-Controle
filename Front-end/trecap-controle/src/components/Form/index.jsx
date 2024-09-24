'use client'
import Link from 'next/link'
import styles from './styles.module.css'
import { useEffect } from 'react';
import { BiSolidHome } from "react-icons/bi";





export default function Form({message, children}) {
    return (
        <div className={styles.container}>
            <div className={styles.containerLogin}>
                <div className={styles.containerLogo}>
                    <Link href="/" className={styles.logoHome}>
                        <BiSolidHome />
                    </Link>
                    <div>
                        <h2>TreCap</h2>
                        <p>{message}</p>
                    </div>
                </div>
                <div className={styles.containerForm}>
                    {children}
                </div>
            </div>
        </div>
    )
}