import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import JobInterviewAddComment from '@components/JobPage/JobInterviewAddComment';
import JobInterviewCommentSaveBox from '@components/JobPage/JobInterviewCommentSaveBox';
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
            itemType="job_interview"
            redirectPath="/job/interview"
          />
          <StyledCommentContainer>
            <JobInterviewAddComment
              currentInterviewitemId={parseInt(item.id.toString())}
            />
          </StyledCommentContainer>
          <div>
            <JobInterviewCommentSaveBox
              currentInterviewId={parseInt(item.id.toString())}
            />
          </div>
        </StyledMainSection>
      ))}
    </>
  );
}

export default JobInterviewItemPage;

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
