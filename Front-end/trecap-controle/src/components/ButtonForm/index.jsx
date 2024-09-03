import styles from './styles.module.css'

export default function ButtonForm({children, ...props}){
    return(
        <button {...props} className={styles.button}>{children}</button>
    )
}