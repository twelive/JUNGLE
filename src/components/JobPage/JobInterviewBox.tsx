import styled, { keyframes } from 'styled-components';
const hoverAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
  100% {
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.3);
  }
`;
function JobInterviewBox() {
  return (
    // map 돌릴 예정 h1 부분 , 날짜 , 작성자이름. title , createAt(slice 예정, 2023-12-10 까지), name
    // MainBox 에 클릭하면 해당 페이지로 이동 예정.
    <MainBox>
      <TitleBox>
        <Title>지금까지 받았던 신입 프론트엔드 면접 질문들</Title>
      </TitleBox>
      <SubBox>
        <DateBox>2023-12-10</DateBox>
        <UserName>서진만</UserName>
      </SubBox>
    </MainBox>
  );
}

export default JobInterviewBox;

const MainBox = styled.div`
  width: 100%;
  border: 1px solid black;
  border-radius: 10px;
  padding: 0 15px;
  cursor: pointer;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    animation: ${hoverAnimation} 0.3s ease-in-out forwards;
  }
`;

const TitleBox = styled.div`
  border-bottom: 1px solid black;
`;

const Title = styled.p`
  font-size: 35px;
  font-weight: 700;
  padding: 50px 0;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 28px;
  }
`;

const SubBox = styled.div`
  display: flex;
  padding: 20px 0;
`;

const DateBox = styled.div`
  border-right: 1px solid black;
  font-size: 25px;
  padding: 0 15px;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 20px;
  }
`;

const UserName = styled.div`
  font-size: 25px;
  padding-left: 15px;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 20px;
  }
`;
