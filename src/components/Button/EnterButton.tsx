import styled from 'styled-components';

function EnterButton() {
  return (
    <ButtonDiv type="button">
      <ButtonText>Join</ButtonText>
    </ButtonDiv>
  );
}

export default EnterButton;

const ButtonDiv = styled.button`
  width: 105px;
  height: 43px;
  border-radius: 15px;
  background-color: transparent;
  cursor: pointer;
`;

const ButtonText = styled.span`
  font-size: 24px;
  color: white;
`;
