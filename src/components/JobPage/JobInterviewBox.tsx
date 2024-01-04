import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import JobInterviewBookmark from '@components/JobPage/JobInterviewBookmark';
import { useAuthStore } from '@store/useAuthStore';
import useDataStore from '@store/useDataStore';
import notbookmark from '@assets/common/bookmarkwhite.svg';

interface InterviewType {
  id: number | string;
  [key: string]: number | string;
  title: string;
  created_at: string;
  name: string;
}

function JobInterviewBox() {
  const { data, getListData } = useDataStore();
  useEffect(() => {
    getListData('job_interview');
  }, [getListData]);

  const extractDate = (dateString: string) => {
    return (dateString || '').toString().slice(0, 10);
  };
  const userId = useAuthStore((state) => state.user);

  return (
    <>
      {data.map((item: InterviewType) => (
        <StyledLink to={`/job/interview/${item.id}`} key={item.id}>
          <StyledMainSection>
            <StyledTitleContainer>
              <StyledTitle>{item.title}</StyledTitle>
            </StyledTitleContainer>
            <StyledSubContainer>
              <StyledDateWrapper>
                {extractDate(item.created_at)}
              </StyledDateWrapper>
              <StyledUserName>{item.name}</StyledUserName>
            </StyledSubContainer>
            <JobInterviewBookmark
              notBookmarkImg={notbookmark}
              itemId={item.id}
              userId={userId}
              itemType="stack"
            ></JobInterviewBookmark>
          </StyledMainSection>
        </StyledLink>
      ))}
    </>
  );
}

export default JobInterviewBox;

const StyledhoverAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
  100% {
    box-shadow: 0 0 0.625rem 0.313rem rgba(0, 0, 0, 0.3); 
  }
`;

const StyledMainSection = styled.div`
  border: 1px solid black;
  border-radius: 0.625rem;
  padding: 0 0.938rem;
  cursor: pointer;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  transition: box-shadow 0.3s ease-in-out;
  position: relative;

  &:hover {
    animation: ${StyledhoverAnimation} 0.3s ease-in-out forwards;
  }

  @media ${(props) => props.theme.device.tablet} {
    width: 18.75rem;
  }
`;

const StyledTitleContainer = styled.div`
  display: block;
  border-bottom: 0.063rem solid black;
  height: 6.625rem;
  position: relative;
  max-width: 20rem;
  min-width: 20rem;
  overflow: hidden;
`;

const StyledTitle = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  padding-top: 2.125rem;
  margin: 0;
  @media ${(props) => props.theme.device.tablet} {
    font-size: 1.5rem;
  }
`;

const StyledSubContainer = styled.div`
  display: flex;
  padding: 1.25rem 0;
  max-width: 20rem;
  overflow: hidden;
`;

const StyledDateWrapper = styled.div`
  border-right: 0.063rem solid black;
  font-size: 1.25rem;
  padding: 0 0.938rem;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 1.25rem;
  }
`;

const StyledUserName = styled.div`
  font-size: 1.25rem;
  padding-left: 0.938rem;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 1.25rem;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  cursor: pointer;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    outline: none;
  }
`;
