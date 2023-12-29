import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import NavButton from '@components/JobPage/NavButton';
import JobCodingAddComment from '@components/JobPage/JobCodingAddComment';
import JobCodingCommentSaveBox from '@components/JobPage/JobCodingCommentSaveBox';
import useDataStore from '@store/useDataStore';
import ItemDeleteButton from '@/components/JobPage/ItemDeleteButton';

interface CodingItemType {
  id: number | string;
  [key: string]: number | string;
  title: string;
  name: string;
}

function JobCodingTestItemPage() {
  const { id } = useParams<{ id?: string }>();
  const { data, getListData } = useDataStore();
  useEffect(() => {
    getListData('job_codingTest');
  }, [getListData]);

  const filteredData = data.filter(
    (item: CodingItemType) => item.id === (id ? parseInt(id) : NaN)
  );
  return (
    <>
      {filteredData.map((item: CodingItemType) => (
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
          <ItemDeleteButton
            itemId={parseInt(item.id.toString())}
            itemType="job_codingtest"
            redirectPath="/job/codingTest"
          />

          <CommentBox>
            <JobCodingAddComment
              currentCodingTestItemId={parseInt(item.id.toString())}
            />
          </CommentBox>
          <div>
            <JobCodingCommentSaveBox
              currentCodingTestId={parseInt(item.id.toString())}
            />
          </div>
        </MainBox>
      ))}
    </>
  );
}

export default JobCodingTestItemPage;

const MainBox = styled.div`
  padding: 3.125rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const FirstBox = styled.div`
  border: 0.125rem solid black;
  border-radius: 1.25rem;
  padding: 1.25rem;
`;

const TitleBox = styled.div`
  margin-bottom: 2.5rem;
`;

const Title = styled.div`
  font-size: 3.75rem;
`;

const SubBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.875rem;
  gap: 1.25rem;
`;

const SubText = styled.p`
  font-size: 30px;
`;

const InfoBox = styled.div``;

const Info = styled.div`
  font-size: 2.188rem;
  margin-bottom: 3.125rem;
  word-break: break-all;
  white-space: pre-wrap;
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1.25rem;
`;
