import styled from 'styled-components';

interface enterButtonProps {
  onClick?: () => void;
}

function EnterButton({ onClick }: enterButtonProps) {
  return (
    <ButtonDiv type="button" onClick={onClick}>
      <ButtonText>Join</ButtonText>
    </ButtonDiv>
  );
}

export default EnterButton;

const ButtonDiv = styled.button`
  width: 12.5rem;
  height: 3.125rem;
  border-radius: 0.938rem;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    box-shadow:
      rgba(255, 255, 255, 0.317) 0px 0.125rem 0.25rem 0px,
      rgba(255, 255, 255, 0.595) 0px 0.125rem 1rem 0px;
  }

  @media ${(props) => props.theme.device.tablet} {
    width: 9.375rem;
  }

  @media ${(props) => props.theme.device.mobile} {
    width: 6.25rem;
  }
`;

const ButtonText = styled.span`
  font-size: 1.5rem;
  color: white;
`;
