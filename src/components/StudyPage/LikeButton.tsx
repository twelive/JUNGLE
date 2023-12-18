import styled from "styled-components";
import likes from './../../assets/common/inactivelike.svg';



function LikeButton () {

  return (
    <LikesWrapper>
    {/* onClick={Liked} */}
    <Button>
        <Img src={likes}></Img>
    </Button>
    <Likes>5</Likes>
    </LikesWrapper>

  )

}

export default LikeButton

const LikesWrapper = styled.div`
display: flex;
flex-direction: row;
gap: 5px;
text-align: center;
justify-content: center;
align-items: center;
`;


const Button = styled.button`
  width: auto;
  height: auto;
  border: none;
  background-color: transparent;

`;

const Img = styled.img`
  width: 15px;
  height: 15px;
`;

const Likes = styled.p`
  font-size: small;
`;