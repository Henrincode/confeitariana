import styles from "./Depoimentos.module.scss";
import Divider from "../../components/Divider";
import CardDepoimentos from "../../components/Depoimentos";

export default function Depoimentos() {
  return (
    <div className={styles.body}>
      <div className={styles.titulo + " container"}>
        <div className="box row">
          <Divider titulo="#Depoimentos" />

          <CardDepoimentos />
        </div>
      </div>
    </div>
  );
}
