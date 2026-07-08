import { faClose } from "@fortawesome/free-solid-svg-icons/faClose";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPlayer from "react-player";
import styled, { keyframes } from "styled-components";

const Pop = keyframes`
  0%{
    transform: scale(0.9);
    opacity: 0;
  }

  100%{
    transform: scale(1);
    opacity: 1;
  }
`;

const ModalContainer = styled.div`
  position: fixed;
  inset: 0;
  padding: 1rem;

  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  span {
    position: fixed;
    top: 1rem;
    right: 1rem;
    width: 42px;
    height: 42px;
    font-size: 2rem;

    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      cursor: pointer;
      transform: scale(1.05);
    }
  }
`;

const PlayerContainer = styled.div`
  width: min(900px, 92vw);
  aspect-ratio: 16/9;
  border-radius: 12px;
  overflow: hidden;

  animation: ${Pop} 0.3s ease-in-out;
`;

const Modal = (props) => {
  const handleClose = () => {
    props.setVideoKey(null);
  };

  return (
    <ModalContainer onClick={handleClose}>
      <PlayerContainer onClick={(e) => e.stopPropagation()}>
        <ReactPlayer
          src={`https://www.youtube.com/watch?v=${props.videoKey}`}
          controls
          width="100%"
          height="100%"
        />
      </PlayerContainer>
      <span onClick={handleClose}>
        <FontAwesomeIcon icon={faClose} />
      </span>
    </ModalContainer>
  );
};

export default Modal;
