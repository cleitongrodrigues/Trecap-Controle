import styles from './styles.module.css'

export default function Input({ labelText, inputPlaceholderText, typeInput, name, value, error, onChange, onBlur, children}) {
    return (
        <div className={styles.containerInput}>
            <input className={styles.input} name={name} onBlur={onBlur} value={value} onChange={onChange}  id={name} type={typeInput}  placeholder={inputPlaceholderText} />
            <label className={styles.label} htmlFor={name}>{labelText}</label>
            {error && <p className={styles.error}>{error}</p>}
            {children}
        </div>
    )
}