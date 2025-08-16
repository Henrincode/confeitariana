import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Navbar() {
  useEffect(() => {
    const handleClick = (e) => {
      const btnList = e.target.closest("." + styles.btnList);
      const collapse = document.querySelector("." + styles.collapse);
      if (btnList) {
        collapse.classList.toggle(styles.mostrarMenu)
      }
    };

    document.body.addEventListener("click", handleClick);

    // Cleanup: remove o listener quando o componente for desmontado
    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []); // <-- o array vazio garante que isso só roda uma vez

  return (
    <header className={styles.header + " container"}>
      <nav id="navbar" className={styles.navbar + " box row pad"}>
        <div className={styles.logo}>
          <Link to="/">
            Ana Marson<span className={styles.textoSup}>Confeiteira</span>
          </Link>
        </div>
        <div className={styles.btnList}>
          <i className="bi bi-list"></i>
        </div>
        <div className={styles.collapse}>
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
        </div>
      </nav>
    </header>
  );
}
