import styles from "./Divider.module.scss";

export default function Divider({ titulo }) {
  return (
    <div className={styles.divider + " box row"}>
      <div className={styles.linha}></div>
      <h2>{titulo}</h2>
      <div className={styles.linha}></div>
    </div>
  );
}
