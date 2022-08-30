import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllGames, getAllGenres } from "../redux/actions";
import Pagination from "./Pagination";
import style from "./Home.module.css";

export class Home extends Component {
  componentDidMount() {
    this.props.getAllGames()
    this.props.getAllGenres()
  }
  constructor(props) {
    super(props);
    this.state = {
      filtered: [],
      genre: "",
      origin: "",
      order: "",
      type: "",
      search: "",
      page: 1
    }
  }
  changeHandler = e => {
    if (e.target.name === "reset") {
      this.setState({
        genre: "",
        origin: "",
        order: "",
        type: "Ascending",
        page: 1
      }, () => {
        this.applyFilter();
      });
    } else {
      this.setState({ [e.target.name]: e.target.value }, () => {
        this.applyFilter();
      });
    }
    if (e.target.name !== "search") this.changePage(1);
  }
  applyFilter() {
    let aux = [...this.props.games];
    if (this.state.genre) aux = aux.filter(ga => ga.genres.some(ge => ge.name === this.state.genre));
    if (this.state.origin === "Api") aux = aux.filter(ga => !isNaN(ga.id));
    if (this.state.origin === "Created") aux = aux.filter(ga => isNaN(ga.id));
    if (this.state.order === "Alphabet") aux = aux.sort(function (a, b) {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    });
    if (this.state.order === "Rating") aux = aux.sort(function (a, b) {
      if (a.rating > b.rating) return 1;
      if (a.rating < b.rating) return -1;
      return 0;
    });
    if (this.state.type === "Descending") aux = aux.reverse();
    this.setState({ filtered: aux });
  }
  changePage = index => {
    this.setState({ page: index });
  }
  searchHandler = () => {
    this.props.getAllGames(this.state.search);
    this.changePage(1);
  }
  render() {
    return (
      <div className={style.wrapper}>
        <div className={style.filter}>
          <select name="genre" value={this.state.genre} onChange={(e) => this.changeHandler(e)}>
            <option value="">All Genres</option>
            {
              this.props.genres.map((g) => {
                return (
                  <option value={g.name} key={g.id}>
                    {g.name}
                  </option>
                );
              })
            }
          </select>
          <select name="origin" value={this.state.origin} onChange={(e) => this.changeHandler(e)}>
            <option value="">Any Origin</option>
            <option value="Api">Api</option>
            <option value="Created">Created</option>
          </select>
          <select name="order" value={this.state.order} onChange={(e) => this.changeHandler(e)}>
            <option value="">Order By</option>
            <option value='Alphabet'>Alphabet</option>
            <option value='Rating'>Rating</option>
          </select>
          <select name="type" value={this.state.type} onChange={(e) => this.changeHandler(e)}>
            <option value='Ascending'>Ascending</option>
            <option value='Descending'>Descending</option>
          </select>
          <button name="reset" onClick={(e) => this.changeHandler(e)}>Reset Filter</button>
        </div>
        <div className={style.search}>
          <input name="search" value={this.state.search} onChange={(e) => this.changeHandler(e)} type="text" placeholder='Search Game...' />
          <button type="submit" onClick={this.searchHandler}> Search </button>
        </div>
        <Pagination className={style.pagination} games={this.state.genre || this.state.origin || this.state.order || this.state.type ? this.state.filtered : this.props.games} changePage={this.changePage} page={this.state.page} />
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    games: state.games,
    genres: state.genres
  }
}

export const mapDispatchToProps = { getAllGames, getAllGenres }

export default connect(mapStateToProps, mapDispatchToProps)(Home);