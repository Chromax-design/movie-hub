import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./components/MovieCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const apiKey = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [movies, setMovies] = useState([]);
  const [term, setTerm] = useState("");

  const getData = async (title) => {
    try {
      const { data } = await axios.get(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=${title}`
      );
      const newArr = data.Search;
      setMovies(newArr);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData("300");
  }, []);

  function handleClick() {
    getData(term);
  }

  return (
    <div className="container mx-auto min-h-screen h-full min-w-full bg-stone-800 py-11 px-3">
      {/* header */}
      <header>
        <h2 className="capitalize font-extrabold text-4xl text-slate-300 text-center py-3">
          Movie Hub
        </h2>
        <form
          className="flex justify-between items-center max-w-xl mx-auto px-5 py-3 mt-0 gap-4 shadow-md rounded-xl"
          onSubmit={(e) => {
            e.preventDefault();
            handleClick();
          }}
        >
          <input
            type="text"
            className="h-14 block bg-transparent text-slate-200 rounded-2xl flex-1 placeholder:capitalize placeholder:italic p-3 border-0 outline-0"
            placeholder="search for movies"
            value={term}
            onChange={(e) => {
              setTerm(e.target.value);
            }}
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-white text-2xl cursor-pointer p-2 hover:scale-105 flex-none"
            onClick={handleClick}
          />
        </form>
      </header>
      {/* main */}
      {movies?.length > 0 ? (
        <main className="mt-4">
          <section className="py-7 grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {movies.map((item) => {
              return <MovieCard movie={item} key={item.imdbID} />;
            })}
          </section>
        </main>
      ) : (
        <div>
          <h2 className="italic text-slate-300 text-center my-3">
            No match found
          </h2>
        </div>
      )}
    </div>
  );
}

export default App;
