import { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { api } from "./api/api";
import SkeletonLoader from "./components/SkeletonLoader";

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
    max-width: 85%;
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

  & > * + * {
    margin-top: 0.5rem;
  }
`;

function App() {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchTerm, setTerm] = useState("");

  const searchMovies = async (title) => {
    if (!title.trim()) return;

    setLoading(true);
    try {
      const { data } = await api.get("/search/movie", {
        params: {
          query: title,
          include_adult: false,
          language: "en-US",
          page: 1,
        },
      });

      setMovies(data.results);
    } catch (error) {
      console.log(error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const DEFAULT_SEARCH_TERM = "love";
    searchMovies(DEFAULT_SEARCH_TERM);
  }, []);

  const handleSearch = () => {
    const query = searchTerm.trim();
    if (!query) return;
    searchMovies(query);
  };

  return (
    <Container>
      <Header>
        <h2>Movie Hub</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <input
            type="text"
            placeholder="Search for movies"
            value={searchTerm}
            onChange={(e) => {
              setTerm(e.target.value);
            }}
            spellCheck="false"
            autoComplete="off"
          />
          <Icon onClick={handleSearch}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Icon>
        </form>
      </Header>

      <Main>
        {loading ? (
          <SkeletonLoader />
        ) : movies?.length > 0 ? (
          <section>
            {movies.map((item) => {
              return <MovieCard movie={item} key={item.id} />;
            })}
          </section>
        ) : (
          <h2>No results found</h2>
        )}
      </Main>

      <Footer>
        <p>copyright &copy; {new Date().getFullYear()} Movie Hub</p>
        <p>
          powered by{" "}
          <a href="https://www.themoviedb.org" target="_blank">
            TMDB
          </a>
        </p>
      </Footer>
    </Container>
  );
}

export default App;
