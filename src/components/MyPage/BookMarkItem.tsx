import { Link } from 'react-router-dom';
import styled from 'styled-components';
import BookMarkButton from '@components/StudyPage/BookMarkButton';
import notbookmark from '@assets/common/bookmarkwhite.svg';

function BookMarkItem({
  src = '/bookmark',
  title = '카테고리 제목',
  content = '내용',
}) {
  return (
    <Box to={src}>
      <BookMarkButton notBookmarkImg={notbookmark} itemId={'#'} userId={'#'} itemType='stack' ></BookMarkButton>
      <Title>{title}</Title>
      <Content>{content}</Content>
    </Box>
  );
}

export default BookMarkItem;

const Box = styled(Link)`
  /* Reset CSS */
  text-decoration-line: none;
  /* Style CSS */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  min-width: 260px;
  height: 260px;
  padding: 1.875rem;
  border-radius: 0.9375rem;
  background: var(--bs-black-300);

  @media ${(props) => props.theme.device.tablet} {
    min-width: 15rem;
    height: 15rem;
    padding: 1.25rem
  }
`;

const Title = styled.span`
  color: white;
  font-size: 2rem;
  font-weight: 600;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 1.75rem;
  }
`;

const Content = styled.span`
  color: white;
  text-align: right;
  font-size: 1.5rem;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 1.25rem;
  }
`;
