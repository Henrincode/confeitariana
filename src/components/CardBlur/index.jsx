import styles from "./CardBlur.module.scss";

export default function CardBlur({
  className = "",
  children,
  img = "/src/components/CardBlur/img.jpeg",
}) {
  return (
    <div className={styles.cardBlur}>
      <img
        className={styles.imagemFundo}
        style={{ objectPosition: "50% 85%" }}
        src={img}
        aria-hidden="true"
      />
      <div className={styles.filtroBlur + ' ' + className}>{children}</div>
    </div>
  );
}
