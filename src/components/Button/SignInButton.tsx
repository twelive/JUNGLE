import styled from 'styled-components';

function SignInButton() {
  return (
    <ButtonDiv type="button">
      <ButtonText>로그인</ButtonText>
    </ButtonDiv>
  );
}

export default SignInButton;

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
