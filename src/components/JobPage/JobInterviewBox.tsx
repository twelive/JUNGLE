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
          <MainBox>
            <TitleBox>
              <Title>{item.title}</Title>
            </TitleBox>
            <SubBox>
              <DateBox>{extractDate(item.created_at)}</DateBox>
              <UserName>{item.name}</UserName>
            </SubBox>
            <JobInterviewBookmark
              notBookmarkImg={notbookmark}
              itemId={item.id}
              userId={userId}
              itemType="stack"
            ></JobInterviewBookmark>
          </MainBox>
        </StyledLink>
      ))}
    </>
  );
}

export default JobInterviewBox;

const hoverAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
  100% {
    box-shadow: 0 0 0.625rem 0.313rem rgba(0, 0, 0, 0.3); 
  }
`;

const MainBox = styled.div`
  border: 0.063rem solid black;
  border-radius: 0.625rem;
  padding: 0 0.938rem;
  cursor: pointer;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  transition: box-shadow 0.3s ease-in-out;
  position: relative;

  &:hover {
    animation: ${hoverAnimation} 0.3s ease-in-out forwards;
  }

  @media ${(props) => props.theme.device.tablet} {
    width: 18.75rem;
  }
`;

const TitleBox = styled.div`
  display: block;
  border-bottom: 0.063rem solid black;
  height: 6.625rem;
  position: relative;
  max-width: 20rem;
  min-width: 20rem;
  overflow: hidden;
`;

const Title = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  padding-top: 2.125rem;
  margin: 0;
  @media ${(props) => props.theme.device.tablet} {
    font-size: 1.5rem;
  }
`;

const SubBox = styled.div`
  display: flex;
  padding: 1.25rem 0;
  max-width: 20rem;
  overflow: hidden;
`;

const DateBox = styled.div`
  border-right: 0.063rem solid black;
  font-size: 1.25rem;
  padding: 0 0.938rem;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 1.25rem;
  }
`;

const UserName = styled.div`
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
