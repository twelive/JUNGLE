import styled from 'styled-components';

function EnterButton() {
  return (
    <ButtonDiv type="button">
      <ButtonText>탐험하기</ButtonText>
    </ButtonDiv>
  );
}

export default EnterButton;

const ButtonDiv = styled.button`
  width: 105px;
  height: 43px;
  border-radius: 15px;
  background-color: #f7f7f7;
  cursor: pointer;
`;

const ButtonText = styled.span`
  font-size: 24px;
  color: #555555;
`;
