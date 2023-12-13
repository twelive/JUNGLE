import styled from 'styled-components';

function JobCodingTestItemPage() {
  return (
    <MainBox>
      <FirstBox>
        <TitleBox>
          <Title>카카오 코딩테스트 본 후기</Title>
        </TitleBox>
        <SubBox>
          <SubText>정소이</SubText>
          <SubText>2023-12-10</SubText>
        </SubBox>
        <InfoBox>
          <Info>
            필자는 그리디하게 풀었다. 2번 문제부터 생각을 좀 많이해야 했었다.
            출발지와 도착지는 결국에 고정되어 있으므로, (배송지 / 회수지 중 더
            먼 지역까지의 거리 * 2) 만큼 이동한다는 것을 알고, 가면서 끝에
            가까운 순서대로 물건을 다 주고, 오면서 끝에 가까운 순서대로 회수를
            하는 방식으로 풀이하면 풀렸다. 💡 3번 문제 (프로그래머스 lv3~4 예상,
            백준 골드 예상) 어.. 굉장히 내가 취약한 부분의 문제가 나왔다. 이전에
            LINE에서도 3번 문제로 비슷한 양상의 문제가 나온 적이 있는데, 이때도
            풀이하지 못했다. 해당 문제 풀이법은 이분탐색이라고 들었는데, 이
            문제도 그렇지 않을까 추측해본다. 문제 자체에 여러가지 고려해야 할
            요소가 많아서 문제 자체에 접근하기가 어려웠었다. 일치감치 포기하고
            다음 문제로 넘어간 문제다. + 혹시 풀이법을 알고 계시다면
            공유해주시면 감사하겠습니다 :) + 가능한 할인률이 4개이기 때문에
            완전탐색이 사용가능하다고 한다.. 💡 4번 문제 (프로그래머스 lv2~3
            예상, 백준 골드 하위 예상) 포화이진트리에 대한 이해가 있어야 풀이할
            수 있는 문제다. 필자는 2진법 변환 구현 + 포화이진트리 사이즈에 맞게
            변형 구현 + bfs로 탐색해서 정답 체크로 풀었다. 이진 트리이다보니,
            부모 자식간의 관계 정의를 잘 하고, 이것을 식으로 옮기는 것이
            중요하다. 처음에 n이 10의 15승까지 나온다길래, 2진법으로 변환하면
            bfs로 탐색하는데 오래걸리지 않을까? 했는데 막상 변환해보니 그렇게
            길지 않아서 쉽게 탐색할 수 있었다. 트리이다 보니, 꼭 탐색이 아니어도
            다른 트릭을 사용해서도 풀이할 수 있을 것으로 보인다. 💡 5번 문제
            (프로그래머스 lv3 예상, 백준 골드 예상) 구현 + 그래프 탐색 문제로
            해결했다. 우선, 문서 편집 기능 = 누가봐도 구현 문제로 보인다. 여기서
            병합이라는 개념이 나오는데, 각 셀끼리의 연관을 나타내야 하기 때문에
            각 셀은 노드로 생각하고, 그래프 문제로 볼 수 있었다. 해쉬와 BFS를
            이용해 구현했고, 주의해야 할 점은 문제를 잘 읽는 것이 가장 크게
            주의해야 할 점으로 보인다. (유니온파인드를 이용하는 것이 더욱
            좋아보이긴 한다) 병합된 셀 + 병합된 셀을 병합할 때 가장 주의해야
            한다. 병합된 셀 A의 값이 갱신되면, A와 연결된 나머지 셀들에 대해서도
            다 갱신해야 하는 로직을 빼먹으면 안 된다. 처음에 필자도 이 점을
            고려하지 못해서 테스트케이스 몇 개를 틀렸다. 자체 제작해도 계속
            통과되어서 어지러웠는데, 다른 문제를 보다가 돌아와서 다시 체크하니
            알아낼 수 있었다. 💡 6번 문제 (프로그래머스 lv3 예상, 백준 실버~골드
            예상) 우선 필자는 DFS로 접근했다. 하지만 가로 세로의 크기가 최대 50,
            최종적으로 탈출구에 도착했을 땐 k번 이동했어야 하는데, 이 k가 최대
            2500이라 탐색으로 하나씩 확인하면 시간 초과가 난다. 뒤늦게 생각난
            건데, 그리디하게 푸는 것이 좋아보인다. DLRU의 우선순위가 정해져
            있으므로, 시작 지점에서 끝 지점에 갈 수 있는지 우선 확인하고, 최대한
            갈 수 있는 양방향을 결정한 뒤, k 만큼 방향을 채워넣는 방식으로
            구현하면 어떨까 싶다. DDDDD..DUDUDU..L (이런 느낌..?) 💡 7번 문제
            (프로그래머스 lv4 예상, 백준 골드~플레티넘 예상) 트리와 관련된
            문제로 게임 구현 방식으로 출제되었다. 마지막 문제답게 시간이 부족해
            깊이 있게 읽지도 못 했다.
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
          같이 붙었으면 좋겠어요 ㅠㅡㅠ 너무 어려웠어서 걱정이에요 ㅠㅠ
        </Text>
        <UserInfo>
          <UserText>서진만</UserText>
          <UserText>2023-12-11</UserText>
        </UserInfo>
        <Text>
          저는 붙었을거같아요 .. 죄송해요 ... 제 계단이 되어주세요 ...
        </Text>
      </UserBox>
    </MainBox>
  );
}

export default JobCodingTestItemPage;

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
