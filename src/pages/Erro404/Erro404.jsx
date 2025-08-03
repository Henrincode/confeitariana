import styles from './Erro404.module.scss'
import { Link } from 'react-router-dom'

export default function Erro404() {
    return (
        <div className={styles.container}>
            <h1 className={styles.code}>404</h1>
            <p className={styles.message}>Oops! Página não encontrada.</p>
            <Link to="/" className={styles.button}>
                Voltar para a Home
            </Link>
        </div>
    )
}
