import { faPlay, faStar } from "@fortawesome/free-solid-svg-icons";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons/faPlayCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Card = styled.div`
  /* padding: 5px; */
`;

const ImgContainer = styled.div`
  height: 350px;
  overflow: hidden;
  border-radius: 10px;
  position: relative;

  img {
    width: 100%;
    object-position: cover;
    transition: all 0.5s ease;
  }

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2.5rem;
    display: none;
    transition: all 0.5s ease;
  }

  &:hover > span {
    display: block;
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
    font-weight: 400;
    word-wrap: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & > * + * {
    margin-top: 0.5rem;
  }
`;

const StarContainer = styled.div`
  color: #ffd700;
  font-size: 0.8rem;
`;

const MovieCard = (props) => {
  return (
    <Card>
      <ImgContainer>
        <img
          src={
            props.movie.Poster !== "N/A"
              ? props.movie.Poster
              : `https://via.placeholder.com/400`
          }
          alt={props.movie.Title}
        />
        <span>
          <FontAwesomeIcon icon={faPlayCircle} />
        </span>
      </ImgContainer>
      <InfoContainer>
        <h3>{props.movie.Title}</h3>
        <StarContainer>
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
        </StarContainer>
      </InfoContainer>
    </Card>
  );
};

export default MovieCard;
