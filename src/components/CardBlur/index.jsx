import styles from "./CardBlur.module.scss";
import imgPadrao from "./img.jpeg";

export default function CardBlur({ className = "", children, img = imgPadrao }) {
  return (
    <div className={styles.cardBlur}>
      <img
        className={styles.imagemFundo}
        style={{ objectPosition: "50% 85%" }}
        src={img}
        aria-hidden="true"
      />
      <div className={styles.filtroBlur + " " + className}>{children}......................</div>
    </div>
  );
}
