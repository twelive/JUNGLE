import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import AddComment from '@components/JobPage/AddComment';
import CommentSaveBox from '@components/JobPage/CommentSaveBox';
import NavButton from '@components/JobPage/NavButton';
import ItemDeleteButton from '@components/JobPage/ItemDeleteButton';
import useDataStore from '@store/useDataStore';

interface InterviewItemType {
  id: number | string;
  [key: string]: number | string;
  title: string;
  created_at: string;
  name: string;
}

function JobInterviewItemPage() {
  const { id } = useParams<{ id?: string }>();
  const { data, getListData } = useDataStore();
  useEffect(() => {
    getListData('job_interview');
  }, [getListData]);

  const filteredData = data.filter(
    (item: InterviewItemType) => item.id === (id ? parseInt(id) : NaN)
  );

  return (
    <>
      {filteredData.map((item: InterviewItemType) => (
        <MainBox key={item.id}>
          <NavButton />
          <FirstBox>
            <TitleBox>
              <Title>{item.title}</Title>
            </TitleBox>
            <SubBox>
              <SubText>{item.name}</SubText>
            </SubBox>
            <InfoBox>
              <Info>{item.info}</Info>
            </InfoBox>
          </FirstBox>
          <ItemDeleteButton itemId={parseInt(item.id.toString())} />
          <CommentBox>
            <AddComment currentInterviewitemId={parseInt(item.id.toString())} />
          </CommentBox>
          <UserBox>
            <CommentSaveBox currentInterviewId={parseInt(item.id.toString())} />
          </UserBox>
        </MainBox>
      ))}
    </>
  );
}

export default JobInterviewItemPage;

const MainBox = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
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
  margin-bottom: 100px;
  gap: 20px;
`;

const SubText = styled.p`
  font-size: 35px;
  font-weight: 500;
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

const UserBox = styled.div``;
