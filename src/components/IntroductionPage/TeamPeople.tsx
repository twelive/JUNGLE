import { useState } from 'react';
import styled from 'styled-components';
import GithubLink from '@components/IntroductionPage/GithubLink';
import getGithubLink from '@utils/getGithubLink';
import debounce from '@utils/debounce';

function TeamPeople({
  src = '#',
  name = '조원소개',
  introduction = '조원소개글',
}) {
  const [isHoverd, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    if (!isHoverd) setIsHovered(true);
  };

  const handleMouseOut = () => {
    debounce(() => setIsHovered(false), 1000)();
  };

  return (
    <StyledMemberWrapper>
      <button
        type="button"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <StyledImg src={src} />
        <StyledStrong>{name}</StyledStrong>
        <StyledP>{introduction}</StyledP>
      </button>
      <GithubLink href={getGithubLink(src)} isVisibility={isHoverd} />
    </StyledMemberWrapper>
  );
}

export default TeamPeople;

const StyledMemberWrapper = styled.li`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  @media ${(props) => props.theme.device.laptop} {
    width: 20%;
  }
  @media ${(props) => props.theme.device.tablet} {
    min-height: 22.625rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    min-height: 15.375rem;
  }
`;

const StyledImg = styled.img`
  width: 100%;
  object-fit: contain;

  @media ${(props) => props.theme.device.tablet} {
    width: 80%;
  }
  @media ${(props) => props.theme.device.mobile} {
    width: 80%;
  }
`;

const StyledStrong = styled.strong`
  display: inline-block;
  padding: 0.6875rem 1.125rem;
  border-radius: 1.875rem;
  border: 0.0625rem solid var(--bs-black-200);
  color: var(--bs-black-200);
  text-align: center;
  font-size: 2rem;
  font-weight: bold;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 1.75rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    font-size: 1rem;
  }
`;

const StyledP = styled.p`
  margin-top: 1.875rem;
  color: var(--bs-black-200);
  text-align: center;
  font-size: 2rem;
  white-space: pre-wrap;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 1.75rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    margin-top: 0.625rem;
    font-size: 1rem;
  }
`;
