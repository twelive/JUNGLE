import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import JobCodingTestBookmark from '@components/JobPage/JobCodingTestBookmark';
import { useAuthStore } from '@store/useAuthStore';
import useDataStore from '@store/useDataStore';
import notbookmark from '@assets/common/bookmarkwhite.svg';

interface CodingTestType {
  id: number | string;
  [key: string]: number | string;
  title: string;
  created_at: string;
  name: string;
}

const hoverAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
  100% {
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.3);
  }
`;
function JobCodingTestBox() {
  const { data, getListData } = useDataStore();
  useEffect(() => {
    getListData('job_codingtest');
  }, [getListData]);

  const extractDate = (dateString: string) => {
    return (dateString || '').toString().slice(0, 10);
  };
  const userId = useAuthStore((state) => state.user);
  return (
    <>
      {data.map((item: CodingTestType) => (
        <StyledLink to={`/job/codingTest/${item.id}`} key={item.id}>
          <MainBox>
            <TitleBox>
              <Title>{item.title}</Title>
            </TitleBox>
            <SubBox>
              <DateBox>{extractDate(item.created_at)}</DateBox>
              <UserName>{item.name}</UserName>
            </SubBox>
            <JobCodingTestBookmark
              notBookmarkImg={notbookmark}
              itemId={item.id}
              userId={userId}
              itemType="stack"
            ></JobCodingTestBookmark>
          </MainBox>
        </StyledLink>
      ))}
    </>
  );
}

export default JobCodingTestBox;

const MainBox = styled.div`
  width: 25rem;
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
  height: 10.625rem;
  border-bottom: 0.063rem solid black;
`;

const Title = styled.p`
  font-size: 2.1875rem;
  font-weight: 700;
  padding: 3.125rem 0;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SubBox = styled.div`
  display: flex;
  padding: 1.25rem 0;
`;

const DateBox = styled.div`
  border-right: 0.063rem solid black;
  font-size: 1.4375rem;
  padding: 0 0.938rem;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 1.25rem;
  }
`;

const UserName = styled.div`
  font-size: 1.5625rem;
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
