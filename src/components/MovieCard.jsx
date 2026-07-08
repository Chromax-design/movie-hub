import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons/faPlayCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { api } from "../api/api";
import Modal from "./Modal";
import placeholder from "../assets/placeholder.jpg";

const Card = styled.div`
  /* position: relative; */
`;

const ImgContainer = styled.div`
  height: 350px;
  overflow: hidden;
  border-radius: 10px;
  position: relative;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);

  img {
    width: 100%;
    object-fit: cover;
    transition:
      transform 0.5s ease,
      filter 0.5s ease;
  }

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2.5rem;
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  &:hover > span {
    opacity: 1;
    cursor: pointer;
  }

  &:hover > img {
    transform: scale(1.1);
    cursor: pointer;
    filter: brightness(0.4);
  }
`;

const InfoContainer = styled.div`
  padding: 1rem 0;

  h3 {
    text-align: left;
    font-size: 1rem;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    font-size: 0.8rem;
    font-weight: 400;
    overflow: hidden;
  }

  & > * + * {
    margin-top: 0.5rem;
  }
`;

const StarContainer = styled.div`
  font-size: 0.8rem;
  color: #ffd700;
`;

const MovieCard = ({ movie }) => {
  const [videoKey, setVideoKey] = useState(null);

  const rating = Math.round(movie.vote_average / 2);

  const getVideo = async (movieId) => {
    try {
      const { data } = await api.get(`/movie/${movieId}/videos`, {
        params: {
          language: "en-US",
        },
      });

      const trailer = data.results.find(
        (video) => video.site === "YouTube" && video.type === "Trailer",
      );

      // console.log(data.results);

      if (!trailer) {
        alert("No trailer available for this movie.");
        return;
      }

      setVideoKey(trailer.key);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    getVideo(movie.id);
  };

  useEffect(() => {
    if (videoKey) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [videoKey]);

  return (
    <Card>
      <ImgContainer>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : placeholder
          }
          alt={movie.original_title}
          loading="lazy"
        />
        <span onClick={handleClick}>
          <FontAwesomeIcon icon={faPlayCircle} />
        </span>
      </ImgContainer>
      <InfoContainer>
        <h3>{movie.original_title}</h3>
        <p>{movie.overview}</p>
        <StarContainer>
          {Array.from({ length: rating }).map((_, i) => (
            <FontAwesomeIcon icon={faStar} key={i} />
          ))}
        </StarContainer>
      </InfoContainer>

      {videoKey && <Modal videoKey={videoKey} setVideoKey={setVideoKey} />}
    </Card>
  );
};

export default MovieCard;
