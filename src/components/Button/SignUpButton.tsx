import styled from 'styled-components';

export default function SignUpButton() {
  return (
    <ButtonDiv type="button">
      <ButtonText>회원가입</ButtonText>
    </ButtonDiv>
  );
}

const ButtonDiv = styled.button`
  width: 127px;
  height: 43px;
  border-radius: 15px;
  background-color: #f7f7f7;
  cursor: pointer;
`;

const ButtonText = styled.span`
  font-size: 24px;
  color: #555555;
`;
