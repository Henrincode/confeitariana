import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className={styles.header + " container"}>
      <nav id="Navbar" className="box row">
        <div className={styles.logo}>
          Ana Marson<span>Confeiteira</span>
        </div>
        <ul className="links">
          <li>
            <a href="#">Cardápio</a>
          </li>
          <li>
            <a href="#">Depoimentos</a>
          </li>
          <li>
            <a href="#">Contato</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
