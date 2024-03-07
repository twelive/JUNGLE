import { Link } from 'react-router-dom';
import styled from 'styled-components';
import BookMarkButton from '@components/StudyPage/BookMarkButton';
import ArrowScrollDown from '@components/ArrowScrollDown';
import { useAuthStore } from '@store/useAuthStore';
import notbookmark from '@assets/common/bookmarkwhite.svg';

function BookMarkItem({
  src = '/bookmark',
  ItemId = 0,
  title = '카테고리 제목',
  author = '저자',
  content = '내용',
  created = '#',
}) {
  const { user } = useAuthStore();

  return (
    <StyledBookMarkItemWrapper to={src}>
      <StyledButtonBox>
        <BookMarkButton
          notBookmarkImg={notbookmark}
          itemId={ItemId}
          userId={user}
          itemType="stack"
        />
      </StyledButtonBox>
      <div>
        <StyledTitleSpan>{title}</StyledTitleSpan>
      </div>
      <StyledAuthorBox>{author}</StyledAuthorBox>
      <StyledTextBox>
        <StyledContentSpan>{content}</StyledContentSpan>
      </StyledTextBox>
      <StyledBottomBox>
        <span>{new Date(created).toISOString().split('T')[0]}</span>
        <ArrowScrollDown width="1rem" height="1rem" color="white" />
      </StyledBottomBox>
    </StyledBookMarkItemWrapper>
  );
}

export default BookMarkItem;

const StyledBookMarkItemWrapper = styled(Link)`
  text-decoration-line: none;
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 16.25rem;
  min-width: 16.25rem;
  height: 16.25rem;
  padding: 1.875rem;
  border-radius: 0.9375rem;
  background: white;
  color: var(--bs-black-200);
  border: 2px black solid;

  @media ${(props) => props.theme.device.tablet} {
    width: 15rem;
    min-width: 15rem;
    height: 15rem;
    padding: 1.25rem;
  }

  @media ${(props) => props.theme.device.mobile} {
    width: 12.5rem;
    min-width: 12.5rem;
    height: 12.5rem;
    padding: 1.25rem;
  }
`;

const StyledButtonBox = styled.div`
  z-index: 1;
  position: absolute;
  right: 0.3125rem;
  top: 0.75rem;
`;

const StyledTitleSpan = styled.span`
  display: block;
  font-size: 1.6rem;
  font-weight: 600;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 1.375rem;
  }

  @media ${(props) => props.theme.device.mobile} {
    font-size: 1.25rem;
  }
`;

const StyledAuthorBox = styled.div`
  width: 100%;
  line-clamp: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding-top: 0.875rem;
  padding-bottom: 0.875rem;
`;

const StyledTextBox = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  padding-bottom: 0.9375rem;
  padding-top: 0.3125rem;
  justify-content: center;
  text-align: center;
  align-self: center;
`;

const StyledContentSpan = styled.span`
  display: block;
  font-size: 1.25rem;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 1.1rem;
  }

  @media ${(props) => props.theme.device.mobile} {
    font-size: 0.9rem;
  }
`;

const StyledBottomBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  margin-top: 0.9375rem;

  span {
    color: gray;

    @media ${(props) => props.theme.device.mobile} {
      font-size: 0.75rem;
    }
  }
`;
