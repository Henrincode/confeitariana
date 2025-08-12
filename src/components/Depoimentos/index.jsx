import styles from "./Depoimentos.module.scss";
import DBdep from "../../data/depoimentos.json";

export default function Depoimentos({ max = Infinity }) {
  return (
    <div className={styles.depoimentos + ' box row'}>
      {DBdep.slice(0, max).map(({ id, img, nome, texto }) => (
        <div key={id} className={styles.depoimento}>
          <img src={"img/depoimentos/" + img} alt="" />
          <h3>{nome}</h3>
          <p>{texto}</p>
        </div>
      ))}
    </div>
  );
}
