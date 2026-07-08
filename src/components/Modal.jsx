import { faClose } from "@fortawesome/free-solid-svg-icons/faClose";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPlayer from "react-player";
import styled from "styled-components";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  span {
    position: absolute;
    top: 3rem;
    right: 5rem;
    font-size: 2rem;

    &:hover {
      cursor: pointer;
      transform: scale(1.05);
    }
  }
`;

const PlayerContainer = styled.div`
  width: 80%;
  height: 80%;
`;

const Modal = (props) => {
  const handleClick = () => {
    props.setVideoKey(null);
  };

  return (
    <ModalContainer>
      <PlayerContainer>
        <ReactPlayer
          src={`https://www.youtube.com/watch?v=${props.videoKey}`}
          controls
          width="100%"
          height="100%"
        />
      </PlayerContainer>
      <span onClick={handleClick}>
        <FontAwesomeIcon icon={faClose} />
      </span>
    </ModalContainer>
  );
};

export default Modal;
