import styled from 'styled-components';
import useDataStore from '@/store/useDataStore';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface CodingItemType {
  id: number | string;
  [key: string]: number | string;
  title: string;
  created_at: string;
  name: string;
}

function JobCodingTestItemPage() {
  const { id } = useParams<{ id?: string }>();
  const { data, getListData } = useDataStore();
  useEffect(() => {
    getListData('job_codingTest');
  }, [getListData]);

  const extractDate = (dateString: string) => {
    return (dateString || '').toString().slice(0, 10);
  };

  const filteredData = data.filter(
    (item: CodingItemType) => item.id === (id ? parseInt(id) : NaN)
  );
  return (
    <>
      {filteredData.map((item: CodingItemType) => (
        <MainBox key={item.id}>
          <FirstBox>
            <TitleBox>
              <Title>{item.title}</Title>
            </TitleBox>
            <SubBox>
              <SubText>{item.name}</SubText>
              <SubText>{extractDate(item.created_at)}</SubText>
            </SubBox>
            <InfoBox>
              <Info>{item.info}</Info>
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
      ))}
    </>
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
  word-break: break-all;
  white-space: pre-wrap;
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
