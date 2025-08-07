import styles from "./Home.module.scss";
import CardBlur from "../../components/CardBlur";

export default function Home() {
  return (
    <div className={styles.body}>
      <CardBlur className=' container'>
        <div className={styles.bemVindo + ' box row'}>aaa</div>
      </CardBlur>
    </div>
  );
}
