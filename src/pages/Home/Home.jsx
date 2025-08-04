import styles from './Home.module.scss'

export default function Home() {
    return (
        <div className={styles.container + ' container'}>
            <h1 className={styles.title}>Bem-vindo à Home</h1>
            <p className={styles.description}>Essa é a página inicial do site.</p>
        </div>
    )
}