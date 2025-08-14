import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className={styles.header + " container"}>
      <nav id="navbar" className={styles.navbar + " box row pad"}>
        <div className={styles.logo}>
          <Link to='/'>Ana Marson<span className={styles.textoSup}>Confeiteira</span></Link>
        </div>
        <ul className="links">
          <li>
            <Link to="/cardapio">Cardápio</Link>
          </li>
          <li>
            <Link to="/depoimentos">Depoimentos</Link>
          </li>
          <li>
            <Link to="/contato">Contato</Link>
          </li>
          <li>
            <a
              href="https://www.instagram.com/anamarsonconfeitaria"
              target="_blank"
              aria-label="Instagram"
            >
              <i className="bi bi-instagram"></i>
            </a>
          </li>
          <li>
            <a
              href="https://wa.me/5519988521020?text=Olá, eu vim pelo site!"
              target="_blank"
              aria-label="Whatsapp"
            >
              <i className="bi bi-whatsapp"></i>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
