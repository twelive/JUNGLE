import { useAuthStore } from '@/store/useAuthStore';
import styled from 'styled-components';
import gitlogo from '../assets/common/gitlogo.svg';


interface propsType  {
  modalRef: React.ForwardedRef<HTMLDivElement>;
  modalOutSideClick:(e:React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}



function LoginModal({modalRef, modalOutSideClick}:propsType) {
  const { handleLogin } = useAuthStore();
  
  
  return (
    <>
    <OutBox ref={modalRef} onClick={(e)=>modalOutSideClick(e)}>

      <Div>
        <LoginContainer>

      <p>정글 들어가기</p>
      <Button onClick={handleLogin}><img src={gitlogo} alt='/'/><p>Login with Github</p></Button>
    

        </LoginContainer>


      </Div>

    </OutBox>
    </>
  );
}

export default LoginModal


const OutBox = styled.div `
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.52);

top: 0;
left: 0;
position: fixed;

`;

const Div = styled.div `
  cursor: pointer;
  position: absolute; 
  top: 50%;  
  left: 50%;  
  transform: translate(-50%, -50%);
  background-color: var(--main-bgColor);
  text-align: center;
  width: 18.75rem;
  height: 9.375rem;
  margin: 0 auto;
  border: 0.125rem solid;
  border-radius: 0.9375rem;
  p {
    font-size: 1.25rem;
  }

`;

const LoginContainer = styled.div `
display: flex;
flex-direction: column;
width: 250px;
margin: 0 auto;
height: 100%;
justify-items: center;
justify-content: center;
align-items: center;
gap: 2.1875rem;

`;

const Button = styled.button `
background-color: red;
width: 250px;
height: 50px;
border-radius: 15px;
background-color: var(--main-bgColor);
display: flex;
justify-items: center;
justify-content: center;
align-items: center;
gap: 0.3125rem;
border:0.0625rem solid var(--bs-black-100);
box-sizing: border-box;

&:hover {
  border:0.3125rem solid var(--bs-black-100);
box-sizing: border-box;

}
p {
  font-size: 0.9375rem;
}
img {
  width: 32px;
  height: 32px;
}


`;

