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
  width: 200px;
  height: 50px;
  border-radius: 15px;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    box-shadow:
      rgba(255, 255, 255, 0.317) 0px 2px 4px 0px,
      rgba(255, 255, 255, 0.595) 0px 2px 16px 0px;
  }

  @media ${(props) => props.theme.device.tablet} {
    width: 150px;
  }

  @media ${(props) => props.theme.device.mobile} {
    width: 100px;
  }
`;

const ButtonText = styled.span`
  font-size: 24px;
  color: white;
`;
