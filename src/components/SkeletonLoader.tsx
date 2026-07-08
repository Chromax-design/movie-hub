import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: 200px 0;
  }
`;

const Skeleton = styled.div`
  background: linear-gradient(90deg, #2d2d2d 25%, #3b3b3b 50%, #2d2d2d 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.3s linear infinite;
`;

const SkeletonContainer = styled.div`
  max-width: 80%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

const SkeletonBox = styled.div`
  & > * + * {
    margin-top: 0.5rem;
  }
`;

const SkeletonImg = styled(Skeleton)`
  width: 100%;
  height: 350px;
  border-radius: 10px;
`;

const SkeletonHeader = styled(Skeleton)`
  width: 80%;
  height: 1rem;
  border-radius: 4px;
`;

const SkeletonParagraph = styled(Skeleton)`
  width: 90%;
  height: 0.8rem;
  border-radius: 4px;
`;

const SkeletonLoader = () => {
  return (
    <SkeletonContainer>
      {Array.from({ length: 5 }).map((_, i) => {
        return (
          <SkeletonBox key={i}>
            <SkeletonImg />
            <SkeletonHeader />
            <SkeletonParagraph />
          </SkeletonBox>
        );
      })}
    </SkeletonContainer>
  );
};

export default SkeletonLoader;
