import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { charMax } from "../../utils";
import styles from "./Cardapio.module.scss";
import DBprodut from "../../data/produtos.json";
import DBcatt from "../../data/categorias.json";
import Divider from "../../components/Divider";

// Pega a ID da categoria e retorna seu nome
const nomeCategoria = id => {
  return DBcatt.find(categoria => categoria.id === id).nome;
};

export default function Cardapio() {

  const { linkcat } = useParams();
  const navigate = useNavigate();

  const DBcat = linkcat ? DBcatt.filter(cat => cat.slug === linkcat) : DBcatt


  return (
    <div className={styles.body}>

      {/* Título */}
      <div className={styles.titulo + " container"}></div>

      {/* Filtro de categorais */}

      <div className={styles.filtroCat + ' box row'}>

        <label htmlFor="cat">Filtrar: </label>
        <select
          defaultValue={window.location.pathname}
          onChange={e => {
            const slug = e.target.value;
            navigate(slug); // navega como <Link to="..."/>
          }}
        >
          <option value="/cardapio/">Mostrar tudo!</option>
          {DBcatt.map(cat => {
            return (
              <option key={cat.id} value={"/cardapio/" + cat.slug}>{cat.nome}</option>
            )
          })}

        </select>


      </div>

      {/* Lista de categorias */}
      <div className="container">
        {DBcat.map(categoria => {
          // Se categoria não tiver produto pula para a próxima categoria (loop)
          if (!DBprodut.some(produto => produto.categoria === categoria.id))
            return;

          return (
            <div key={categoria.id} className="box">
              <Divider titulo={categoria.nome} />
              {/* Lista de produtos */}
              <div className={styles.lista + " box row"}>
                {DBprodut.filter(
                  produto => produto.categoria === categoria.id
                ).map(produto => {
                  // Transforma ID da categoria em nome, relacionando com banco das categorias
                  const nomeCat = charMax(nomeCategoria(produto.categoria), 15);

                  return (
                    <div key={produto.id} className={styles.produto + " box"}>
                      <img src={"/img/cardapio/" + produto.img} />
                      <div className={styles.idp}>cod {produto.id}</div>
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
