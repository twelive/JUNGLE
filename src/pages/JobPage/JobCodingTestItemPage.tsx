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
        <StyledMainSection key={item.id}>
          <NavButton />
          <StyledMainWrapper>
            <StyledTitleContainer>
              <StyledTitle>{item.title}</StyledTitle>
            </StyledTitleContainer>
            <StyledSubContainer>
              <StyledSubText>{item.name}</StyledSubText>
            </StyledSubContainer>
            <div>
              <StyledInfoContainer>{item.info}</StyledInfoContainer>
            </div>
          </StyledMainWrapper>
          <ItemDeleteButton
            itemId={parseInt(item.id.toString())}
            itemType="job_codingtest"
            redirectPath="/job/codingTest"
          />

          <StyledCommentContainer>
            <JobCodingAddComment
              currentCodingTestItemId={parseInt(item.id.toString())}
            />
          </StyledCommentContainer>
          <div>
            <JobCodingCommentSaveBox
              currentCodingTestId={parseInt(item.id.toString())}
            />
          </div>
        </StyledMainSection>
      ))}
    </>
  );
}

export default JobCodingTestItemPage;

const StyledMainSection = styled.div`
  padding: 3.125rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const StyledMainWrapper = styled.div`
  border: 2px solid black;
  border-radius: 1.25rem;
  padding: 1.25rem;
`;

const StyledTitleContainer = styled.div`
  margin-bottom: 2.5rem;
`;

const StyledTitle = styled.div`
  font-size: 3.75rem;
`;

const StyledSubContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.875rem;
  gap: 1.25rem;
`;

const StyledSubText = styled.p`
  font-size: 1.875rem;
`;

const StyledInfoContainer = styled.div`
  font-size: 2.188rem;
  margin-bottom: 3.125rem;
  word-break: break-all;
  white-space: pre-wrap;
`;

const StyledCommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1.25rem;
`;
