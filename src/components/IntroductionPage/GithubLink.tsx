import { Link } from 'react-router-dom';
import styled from 'styled-components';

function GithubLink({ href = '#', isVisibility = false }) {
  return (
    <StyledLink
      to={href}
      target="_blank"
      rel="noopener noreferrer"
      $isVisibility={isVisibility}
    >
      GithubLink
    </StyledLink>
  );
}

export default GithubLink;

const StyledLink = styled(Link)<{ $isVisibility: boolean }>`
  /* reset CSS */
  text-decoration: none;
  /* position */
  position: absolute;
  visibility: ${(props) => (props.$isVisibility ? 'visible' : 'hidden')};
  top: 40%;
  left: 50%;
  z-index: 1;
  /* Style CSS */
  padding: 0.625rem 0.9375rem;
  background-color: var(--bs-black-200);
  border-radius: 10px;
  color: white;
  font-size: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;

  @media ${(props) => props.theme.device.mobile} {
    font-size: 1rem;
  }
`;
