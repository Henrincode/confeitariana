import { nomeCategoria } from "../../utils";
import styles from "./Cardapio.module.scss";
import DBprodut from "../../data/produtos.json";
import DBcat from "../../data/categorias.json";

export default function Cardapio() {
  return (
    <div className={styles.body}>
      <div className={styles.titulo + " container"}>
        <div className={styles.lista + " box row"}>
          {DBprodut.map(({ id, categoria, img }) => {
            // Transforma ID da categoria em nome, relacionando com banco das categorias
            const nomeCat = nomeCategoria(categoria, DBcat);

            return (
              <div key={id} className={styles.produto}>
                <img src={"img/cardapio/" + img} />
                <div class={styles.idp}>#{id}</div>
                <div className={styles.categoria}>{nomeCat}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
