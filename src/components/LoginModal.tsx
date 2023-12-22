import { useAuthStore } from '@/store/useAuthStore';
import styled from 'styled-components';
import gitlogo from '../assets/common/gitlogo.svg';
import { supabase } from '@/client';
// import { useNavigate } from 'react-router-dom';


interface propsType  {
  modalRef: React.ForwardedRef<HTMLDivElement>;
  modalOutSideClick:(e:React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}



function LoginModal({modalRef, modalOutSideClick}:propsType) {
  const { handleLogin, register } = useAuthStore();
  // const navigate = useNavigate();
    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
      await handleLogin();
      const {data : {session}} = await supabase.auth.getSession()
      await register(session)
      // navigate('/main');
  }

  
  
  return (
    <>
    <OutBox ref={modalRef} onClick={(e)=>modalOutSideClick(e)}>

      <Div>
        <LoginContainer>

      <p>정글 들어가기</p>
      <Button onClick={handleClick}><img src={gitlogo} alt='/'/><p>Login with Github</p></Button>
    

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
z-index: 9999;
top: 0;
left: 0;
position: fixed;
color: #777;

`;

const Div = styled.div `
  cursor: pointer;
  position: absolute; 
  top: 50%;  
  left: 50%;  
  transform: translate(-50%, -50%);
  background-color:  #F4F3EF;
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
color: #555;
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
border:0.0625rem solid #555;
box-sizing: border-box;

&:hover {
  border:0.3125rem solid #111;
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

