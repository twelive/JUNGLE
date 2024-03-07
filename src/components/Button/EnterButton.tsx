import styled from 'styled-components';

interface enterButtonProps {
  onClick?: () => void;
}

function EnterButton({ onClick }: enterButtonProps) {
  return (
    <StyledButtonBox type="button" onClick={onClick}>
      <StyledSpan>Join</StyledSpan>
    </StyledButtonBox>
  );
}

export default EnterButton;

const StyledButtonBox = styled.button`
  width: 12.5rem;
  height: 3.125rem;
  border-radius: 0.938rem;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    box-shadow:
      rgba(255, 255, 255, 0.317) 0px 2px 4px 0px,
      rgba(255, 255, 255, 0.595) 0px 2px 16px 0px;
  }

  @media ${(props) => props.theme.device.tablet} {
    width: 9.375rem;
  }

  @media ${(props) => props.theme.device.mobile} {
    width: 6.25rem;
  }
`;

const StyledSpan = styled.span`
  font-size: 1.5rem;
  color: white;
`;
