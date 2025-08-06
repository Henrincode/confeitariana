import style from "./Footer.module.scss";

export default function footer() {
  return (
    <div className={style.footer + " container"}>
      <div className={style.texto + " box"}>
        <iframe className={style.map}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.280687748841!2d-47.28393632390797!3d-22.717806331145933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c890bc9f8fc7eb%3A0x5f53aab3444f8f3e!2sAv.%20Comendador%20Thom%C3%A1z%20Fortunato%2C%202000%20-%20Riviera%20Tamborlim%2C%20Americana%20-%20SP%2C%2013475-010!5e0!3m2!1spt-BR!2sbr!4v1750657003343!5m2!1spt-BR!2sbr"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
