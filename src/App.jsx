import { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./components/MovieCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const apiKey = import.meta.env.VITE_APP_API_KEY;

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: #292524;
  color: #fff;
  padding: 0;
  margin: 0;
`;

const Header = styled.header`
  padding: 2rem 1rem;

  h2 {
    font-size: 2rem;
    text-align: center;
  }

  form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    max-width: 36rem;
    height: auto;
    background-color: #1c1917;
    margin: 1rem auto 0;
    padding: 0.8rem;
    border-radius: 1rem;
    box-shadow:
      0 4px 6px -1px rgb(0 0 0 / 0.1),
      0 2px 4px -2px rgb(0 0 0 / 0.1);

    input {
      border-radius: 1rem;
      background-color: transparent;
      outline: 0;
      border: 0;
      height: 2rem;
      flex: 1;

      &::placeholder {
        font-style: italic;
        text-transform: capitalize;
        letter-spacing: 1px;
      }
    }
  }
`;

const Icon = styled.span`
  color: #cbd5e1;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: none;

  &:hover {
    transform: scale(1.2);
  }
`;

const Main = styled.main`
  min-height: 100vh;
  padding: 0rem 1rem 1rem;

  section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    max-width: 75rem;
    margin: 1rem auto;
  }

  h2 {
    color: #cbd5e1;
    font-size: 1.3rem;
    text-align: center;
  }
`;

const Footer = styled.footer`
  font-size: 0.8rem;
  text-align: center;
  text-transform: capitalize;
  padding: 1rem;
`;

function App() {
  const [movies, setMovies] = useState([]);
  const [term, setTerm] = useState("");

  const getData = async (title) => {
    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=${title}`,
      );
      const movies = res?.data?.Search.filter((movie) => movie.Poster !== null);
      console.log(movies);
      setMovies(movies);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData("love");
  }, []);

  function handleClick() {
    getData(term);
  }

  return (
    <Container>
      <Header>
        <h2>Movie Hub</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleClick();
          }}
        >
          <input
            type="text"
            placeholder="Search for movies"
            value={term}
            onChange={(e) => {
              setTerm(e.target.value);
            }}
          />
          <Icon>
            <FontAwesomeIcon icon={faMagnifyingGlass} onClick={handleClick} />
          </Icon>
        </form>
      </Header>

      <Main>
        {movies?.length > 0 ? (
          <section>
            {movies.map((item) => {
              return <MovieCard movie={item} key={item.imdbID} />;
            })}
          </section>
        ) : (
          <h2>No results found</h2>
        )}
      </Main>

      <Footer>copyright &copy; {new Date().getFullYear()}</Footer>
    </Container>
  );
}

export default App;
