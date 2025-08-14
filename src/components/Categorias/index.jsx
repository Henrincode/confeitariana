import DBcat from "../../data/categorias.json";
import styles from "./Categorias.module.scss";
import { charMax } from "../../utils";

export default function Categorias() {
  return (
    <>
      <div className={styles.categorias + " box row pad"}>
        {DBcat.map(({ id, capa, nome }) => (
          <div key={id} className={styles.categoria}>
            <div className="imagem">
              <img src={`/img${capa}`} alt="" />
            </div>
            <h2 className="titulo">{charMax(nome, 15)}</h2>
          </div>
        ))}
      </div>
    </>
  );
}
