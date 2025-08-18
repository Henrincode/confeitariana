import { Link } from "react-router-dom";
import DBcat from "../../data/categorias.json";
import styles from "./Categorias.module.scss";
import { charMax } from "../../utils";

export default function Categorias() {
  return (
    <>
      <div className={styles.categorias + " box row pad"}>
        {DBcat.map(({ id, capa, nome, slug }) => (
          <Link to={"/cardapio/" + slug}>
            <div key={id} className={styles.categoria + " box"}>
              <img src={`/img${capa}`} alt="" />
              <h2 className="titulo">{charMax(nome, 15)}</h2>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
