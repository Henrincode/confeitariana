import styles from "./Home.module.scss";
import CardBlur from "../../components/CardBlur";
import Divider from "../../components/Divider";
import Categorias from "../../components/Categorias";

export default function Home() {
  return (
    <div className={styles.body}>
      <CardBlur className=" container">
        <div className={styles.bemVindo + " box row"}>
          <div className={styles.mensagem}>
            <h2>Bem-vindo ao Sabor Artesanal de Ana Marson!</h2>
            <p>
              Doces, bolos, pães e salgados preparados com carinho e dedicação.
            </p>
            <p>
              Cada receita é feita com ingredientes selecionados, criatividade e
              aquele toque caseiro que faz toda a diferença.
            </p>
            <p>Descubra o prazer de saborear momentos especiais!</p>
          </div>
          <div className={styles.confeiteira}>
            <img src="/img/misc/pessoa-01.png" alt="" aria-hidden="true" />
          </div>
        </div>
      </CardBlur>
      <Divider titulo="#Categorias" />
      <Categorias />
      <Divider titulo="#Depoimentos" />
    </div>
  );
}
