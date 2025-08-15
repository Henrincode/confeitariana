import { charMax } from "../../utils";
import styles from "./Cardapio.module.scss";
import DBprodut from "../../data/produtos.json";
import DBcat from "../../data/categorias.json";

// Pega a ID da categoria e retorna seu nome

export default function Cardapio() {
  const nomeCategoria = (id) => {
    return DBcat.find((categoria) => categoria.id === id).nome;
  };

  return (
    <div className={styles.body}>
      <div className={styles.titulo + " container"}>
        {/* Lista de categorias */}
        {DBcat.map((categoria) => {
          // Se categoria não tiver produto pula para a próxima categoria (loop)
          if (!DBprodut.some((produto) => produto.categoria === categoria.id))
            return;

          return (
            <div>
              {categoria.nome} <br />
              {/* Lista de produtos */}
              <div className={styles.lista + " box row"}>
                {DBprodut.filter(
                  (produto) => produto.categoria === categoria.id
                ).map((produto) => {
                  // Transforma ID da categoria em nome, relacionando com banco das categorias
                  const nomeCat = charMax(nomeCategoria(produto.categoria), 15);

                  return (
                    <div key={produto.id} className={styles.produto}>
                      <img src={"img/cardapio/" + produto.img} />
                      <div class={styles.idp}>#{produto.id}</div>
                      {/* <div className={styles.categoria}>{nomeCat}</div> */}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
