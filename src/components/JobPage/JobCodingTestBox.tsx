import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import CodingTestBookmark from '@components/JobPage/CodingTestBookmark';
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
            <CodingTestBookmark
              notBookmarkImg={notbookmark}
              itemId={item.id}
              userId={userId}
              itemType="stack"
            ></CodingTestBookmark>
          </MainBox>
        </StyledLink>
      ))}
    </>
  );
}

export default JobCodingTestBox;

const MainBox = styled.div`
  width: 400px;
  border: 1px solid black;
  border-radius: 10px;
  padding: 0 15px;
  cursor: pointer;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  transition: box-shadow 0.3s ease-in-out;
  position: relative;

  &:hover {
    animation: ${hoverAnimation} 0.3s ease-in-out forwards;
  }

  @media ${(props) => props.theme.device.tablet} {
    width: 300px;
  }
`;

const TitleBox = styled.div`
  display: block;
  height: 170px;
  border-bottom: 1px solid black;
`;

const Title = styled.p`
  font-size: 35px;
  font-weight: 700;
  padding: 50px 0;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 28px;
  }
`;

const SubBox = styled.div`
  display: flex;
  padding: 20px 0;
`;

const DateBox = styled.div`
  border-right: 1px solid black;
  font-size: 25px;
  padding: 0 15px;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 20px;
  }
`;

const UserName = styled.div`
  font-size: 25px;
  padding-left: 15px;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 20px;
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
