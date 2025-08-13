// import { nomeCategoria } from "../../utils";
import styles from "./Cardapio.module.scss";
import DBprodut from "../../data/produtos.json";
import DBcat from "../../data/categorias.json";


// Pega a ID da categoria e retorna seu nome
function nomeCategoria(id) {
  return DBcat.find((categoria) => categoria.id === id).nome;
}

export default function Cardapio() {
  return (
    <div className={styles.body}>
      <div className={styles.titulo + " container"}>
        <div className={styles.lista + " box row"}>
          {/* Criar divisão por categorias e diminuir o tamanho das imagens */}
          {DBprodut.map(({ id, categoria, img }) => {
            // Transforma ID da categoria em nome, relacionando com banco das categorias
            const nomeCat = nomeCategoria(categoria);

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
