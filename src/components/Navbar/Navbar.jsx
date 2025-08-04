import styles from './Navbar.module.scss'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <header className={styles.container}>
            <nav id='Navbar' className={styles.box}>
                <div className="logo">
                    Ana Marson<span>Confeiteira</span>
                </div>
                <div className="links">
                    <a href="#">Cardápio</a>
                    <a href="#">Depoimentos</a>
                    <a href="#">Contato</a>
                </div>
            </nav>
        </header>
    )
}