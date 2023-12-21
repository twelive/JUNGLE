import { Link } from 'react-router-dom';
import styled from 'styled-components';
import BookMarkButton from '@components/StudyPage/BookMarkButton';
import { useAuthStore } from '@store/useAuthStore';
import notbookmark from '@assets/common/bookmarkwhite.svg';
import ArrowScrollDown from '@components/ArrowScrollDown';

function BookMarkItem({
  src = '/bookmark',
  ItemId = 0,
  title = '카테고리 제목',
  author = '저자',
  content = '내용',
  created = '#',
}) {
  const {user} = useAuthStore();

  return (
    <Box to={src}>
      <BookMarkButtonWrapper>
        <BookMarkButton notBookmarkImg={notbookmark} itemId={ItemId} userId={user} itemType='stack' />
      </BookMarkButtonWrapper>
      <div>
        <Title>{title}</Title>
      </div>
      <Author>{author}</Author>
      <TextBox>
        <Content>{content}</Content>
      </TextBox>
      <BottomBox>
        <span>{new Date(created).toISOString().split('T')[0]}</span>
        <ArrowScrollDown color="white" />
      </BottomBox>
    </Box>
  );
}

export default BookMarkItem;

const Box = styled(Link)`
  /* Reset CSS */
  text-decoration-line: none;
  /* Style CSS */
  position: relative;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  box-sizing: border-box;
  width: 16.25rem;
  min-width: 16.25rem;
  height: 16.25rem;
  padding: 1.875rem;
  border-radius: 0.9375rem;
  background: var(--bs-black-300);
  color: white;

  @media ${(props) => props.theme.device.tablet} {
    width: 15rem;
    min-width: 15rem;
    height: 15rem;
    padding: 1.25rem
  }
`;

const BookMarkButtonWrapper = styled.div`
  z-index: 1;
  position: absolute;
  right: 0.3125rem;
  top: 0.75rem;
`;

const Title = styled.span`
  display: block;
  font-size: 2rem;
  font-weight: 600;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 1.75rem;
  }
`;

const Author = styled.div`
width: 100%;
line-clamp: 1;
text-overflow: ellipsis;
white-space: nowrap;
overflow: hidden;
padding-top: 14px;
padding-bottom: 14px
`;

const TextBox = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  padding-bottom: 0.9375rem;
  padding-top: 0.3125rem;
  justify-content: center;
  text-align: center;
  align-self: center;
`;

const Content = styled.span`
  display: block;
  font-size: 1.5rem;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 1.25rem;
  }
`;

const BottomBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  margin-top: 0.9375rem;
`;