import React from "react";
import GameCard from "./GameCard";
import Img from '../assets/none.png'
import style from "./Pagination.module.css";

function topFunction() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

const Pagination = (props) => {
  const itemsPerPage = 15;
  const pages = [];
  for (let i = 1; i <= Math.ceil(props.games.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = props.page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = props.games.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextbtn = () => {
    topFunction();
    props.changePage(props.page + 1);
  };

  const handlePrevbtn = () => {
    topFunction();
    props.changePage(props.page - 1);
  };

  return (
    <>
      {
        props.games.length ? currentItems.map((g, i) => {
          return (
            <GameCard id={g.id} name={g.name} image={g.image ? g.image : Img} genres={g.genres} rating={g.rating} key={i} />
          )
        }) : <h1>No Videogames Were Found</h1>
      }
      <div className={style.pagination} style={{display: props.games.length ? 'block' : 'none' }}>
        <div className={props.page === 1 ? style.first : style.prev} onClick={props.page > 1 ? handlePrevbtn : null}>
            Prev
        </div>
        <div className={style.actualPage}>
          {`${props.page} / ${pages.length}`}
        </div>
        <div className={props.page === pages.length ? style.last : style.next} onClick={props.page < pages.length ? handleNextbtn : null}>
            Next
        </div>
      </div>
    </>
  );
}

export default Pagination;