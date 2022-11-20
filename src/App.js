import "./App.css";
import { getMoviesList, searchMovie } from "./api";
import { useEffect, useState } from "react";

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    getMoviesList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div key={1}>
          <div className="movie-wrapper" key={i}>
            <div className="movie-title">{movie.title}</div>
            <img className="movie-image" alt="gambar" src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`} />
            <div className="movie-date">Release : {movie.release_date}</div>
            <div className="movie-rate">{movie.vote_average}</div>
          </div>
        </div>
      );
    });
  };

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q);
      setPopularMovies(query.results);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Lebah Ganteng :v</h1>
        <input className="movie-search" placeholder="Cari film kesayangan" onChange={({ target }) => search(target.value)} />

        <div className="movie-container">
          <PopularMovieList />
        </div>
      </header>
    </div>
  );
};

export default App;
