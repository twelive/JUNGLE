import styled from 'styled-components';

function JobInterviewItemPage() {
  return (
    <MainBox>
      <FirstBox>
        <TitleBox>
          <Title>지금까지 받았던 신입 프론트엔드 면접 질문들</Title>
        </TitleBox>
        <SubBox>
          <SubText>서진만</SubText>
          <SubText>2023-12-10</SubText>
        </SubBox>
        <InfoBox>
          <Info>
            사설 새로운 회사에서 최종 합격 결과를 받게 되었다. 그동안 면접에서
            받았던 질문들을 공유해보려고 한다. 짧게 돌아보자면... 나는
            경영정보학과 출신 비전공자이고, 22년 1월 즈음 항해 99 부트캠프를
            수료했다. 그리고 약 7 ~ 8개월 정도 혼자서 더 공부했다. 22년 8월에
            학교를 최종 졸업하면서 동시에 본격적인 입사 지원을 시작했다. 10월에
            작은 스타트업에 합류했지만 재정난과 여러 이유로 인해 11월까지
            근무하고 퇴사했다. 그 후 개인 프로젝트를 하나 더 만들고 11월
            중후반부터 다시 지원을 시작했고 최종 합격 결과를 받았다. 8월 ~ 10월
            지원 기간에는 총 154곳에 지원해서 17개의 서류 합격을 받았고, 11월 ~
            12월 지원 기간에는 설명해주세요. ⭐ Promise와 Callback를 비교
            설명해주세요. ⭐ Async, Await이 뭔지 그리고 사용 방법을
            설명해주세요. ⭐ Promise와 Async, Await의 차이를 설명해주세요.
            AJAX에 대해 설명해주세요. ⭐ var, let, const 차이를 설명해주세요.
            TDZ에 대해 설명해주세요. 함수 선언형과 함수 표현식의 차이에 대해
            설명해주세요. ⭐ 이벤트 버블링과 캡처링에 대해 설명해주세요. ⭐
            이벤트 위임에 대해서 설명해주세요. 이벤트 위임의 동작 방식에 대해서
            설명해주세요. ⭐ 호이스팅과 발생하는 이유에 대해 설명해주세요.
            스코프 (Scope)에 대해 설명해주세요. 스코프 체인에 대해 와 컴포넌트의
            차이에 대해 설명해주세요. 리액트에서 컴포넌트를 어떻게 생성하나요?
            클래스형 컴포넌트를 사용해보셨나요? 클래스형 컴포넌트와 함수형
            컴포넌트의 차이에 대해 설명해주세요. ⭐ 라이프사이클에 대해
            설명해주세요. ⭐ 라이프 사이클 메소드에 대해 설명해주세요. 함수형
            컴포넌트의 장점에 대해 설명해주세요. ⭐ React Hooks에 대해 설 희망
            연봉은 얼마나 되시나요? ⭐ 저희 회사에 대해 궁금하신 점
            질문해주세요.
          </Info>
        </InfoBox>
      </FirstBox>
      <ModifyButton>수정</ModifyButton>
      <CommentBox>
        <Comment name="" id="" placeholder="댓글을 적어보삼~"></Comment>
        <CommentButton>댓글작성</CommentButton>
      </CommentBox>
      <UserBox>
        <UserDivBox>댓글박스</UserDivBox>
        <UserInfo>
          <UserText>전선용</UserText>
          <UserText>2023-12-11</UserText>
        </UserInfo>
        <Text>
          이거보고 면접보러갔더니 회사 붙었습니다 !! 여러분들 이거 꼭 보고
          외우고 연습 많이해보고 가보세요 !!!
        </Text>
        <UserInfo>
          <UserText>전선용</UserText>
          <UserText>2023-12-11</UserText>
        </UserInfo>
        <Text>
          이거보고 면접보러갔더니 회사 붙었습니다 !! 여러분들 이거 꼭 보고
          외우고 연습 많이해보고 가보세요 !!!
        </Text>
      </UserBox>
    </MainBox>
  );
}

export default JobInterviewItemPage;

const MainBox = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FirstBox = styled.div`
  border: 2px solid black;
  border-radius: 20px;
  padding: 20px;
`;

const TitleBox = styled.div`
  margin-bottom: 40px;
`;

const Title = styled.div`
  font-size: 60px;
`;

const SubBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  gap: 20px;
`;

const ModifyButton = styled.button`
  align-self: end;
`;

const SubText = styled.p`
  font-size: 30px;
`;

const InfoBox = styled.div``;

const Info = styled.div`
  font-size: 35px;
  margin-bottom: 50px;
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
`;

const Comment = styled.textarea`
  width: 100%;
  height: 100px;
`;

const CommentButton = styled.button``;

const UserBox = styled.div``;

const UserDivBox = styled.div`
  margin-bottom: 40px;
  font-size: 40px;
`;

const UserInfo = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const UserText = styled.p`
  font-size: 20px;
`;

const Text = styled.div`
  font-size: 20px;
  margin-bottom: 100px;
  border-bottom: 2px solid black;
  padding-bottom: 50px;
`;
