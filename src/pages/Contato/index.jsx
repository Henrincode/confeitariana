import styles from "./Contato.module.scss";
import Divider from "../../components/Divider";

export default function Contato() {
  return (
    <div className={styles.body}>
      <div className={styles.titulo + " container"}>
        <div className="box">


          {/* Mensagem */}

          <section className={styles['msg-contato']}>
            <h2>Alô, Alô! Vamos adoçar essa conversa?</h2>
            <p>Se você deseja encomendar delícias artesanais ou tem alguma dúvida, fale comigo! Estou aqui para
              atender você com carinho e açúcar na medida certa.</p>
            <br />
            <p>Canais de atendimento:</p>
            <p><i className="bi bi-whatsapp"></i> 19 9 8852-1020</p>
            <p><i className="bi bi-envelope"></i> confeitariana@gmail.com</p>
            <p><i className="bi bi-geo-alt"></i> 2000, Av. Comendador Thomaz Fortunato, Americana SP</p>
          </section>

          <Divider titulo="#Contato" />
        </div>

        {/* Formulário de E-Mail */}

        <form action="" className={styles.form + " box pad"}>
          <div className={styles.linha + " box row"}>
            <div className={styles.campo + " box"}>
              <label htmlFor="f-nome">Seu nome*</label>
              <input type="text" id="f-nome" placeholder="Escreva seu nome" required />
            </div>
            <div className={styles.campo + " box"}>
              <label htmlFor="f-email">Seu E-Mail*</label>
              <input type="text" id="f-email" placeholder="email@provedor.com" required />
            </div>
            <div className={styles.campo + " box"}>
              <label htmlFor="f-cel">Seu celular / whatsapp*</label>
              <input type="text" id="f-cel" placeholder="19 98888-4444" required />
            </div>
          </div>
          <div className={styles.campo}>
            <label htmlFor="f-msg">Mensagem*</label>
            <textarea name="mensagem" id="f-msg" rows='6'
              placeholder="Escreva uma mensagem" required></textarea>
          </div>
          <button>Enviar</button>
        </form>
      </div>
    </div>
  );
}
