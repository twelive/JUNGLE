import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { supabase } from '@/client';
import { StackDiggingDTO } from '@/types/StackDiggingDTO';
import { useAuthStore } from '@store/useAuthStore';
import notbookmark from '@assets/common/bookmarkblack.svg';
import QueryBookMarkButton from './QueryBookMarkButton';

const getListData: () => Promise<StackDiggingDTO[] | null> = async () => {
  const { data } = await supabase
    .from('stack_digging')
    .select(
      `
      *
    `
    )
    .order('created_at', { ascending: false })
    .returns<StackDiggingDTO[] | null>();
  
  return data;
};

function StackDiggingItem({  comment = '0' }) {

  const { data: stackListData } = useQuery('stacklist', getListData);
  const  userId   = useAuthStore((state) => (state.user));


  return (
    <>
    
   {
  (stackListData ?? []).map((item) => (
    <StyledListBox to={`/study/stack/detail/${item.id}`} key={item.id}>
      <StyledBookMarkButtonDiv>

      <QueryBookMarkButton notBookmarkImg={notbookmark} itemId={item.id} userId={userId} itemType='stack' ></QueryBookMarkButton>

      </StyledBookMarkButtonDiv>
      <StyledTitleDiv>
        <StyledTitleSpan>{item.title}</StyledTitleSpan>
      </StyledTitleDiv>
      <StyledAuthorDiv>{item.user_email}</StyledAuthorDiv>
      <StyledTextDiv>
        <StyledContentSpan>{item.text}</StyledContentSpan>
      </StyledTextDiv>
      <StyledBottomDiv>
        <StyledCreatedDiv>{new Date(item.created_at).toISOString().split('T')[0]}</StyledCreatedDiv>
 {item.stack_comment_counter !== null ? (
              <StyledCommentCountP>
                {item.stack_comment_counter >= 99 ? '99+' : item.stack_comment_counter}
              </StyledCommentCountP>
            ) : (
              <StyledCommentCountP>{comment}</StyledCommentCountP>
            )}
      </StyledBottomDiv>
    </StyledListBox>
  ))
}
    </>
  );
}

export default StackDiggingItem;

const StyledListBox = styled(Link)`
  text-decoration-line: none;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  min-width: 16.25rem;
  height: 16.25rem;
  padding: 1.875rem;
  border: 2px black solid;
  border-radius: 0.9375rem;
  background: white;

  @media ${(props) => props.theme.device.tablet} {
    min-width: 15rem;
    height: 15rem;
    padding: 1.25rem
  }
`;

const StyledTitleDiv = styled.div`
width: 100%;
`;

const StyledTitleSpan = styled.span`
  display: block;
  color: var(--bs-black-300);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  display: inline-block;
  font-size: 2rem;
  font-weight: 600;
  padding-bottom: 0.125rem;
  @media ${(props) => props.theme.device.tablet} {
    font-size: 1.75rem;
  }
`;

const StyledAuthorDiv = styled.div`
width: 100%;
line-clamp: 1;
text-overflow: ellipsis;
white-space: nowrap;
overflow: hidden;
padding-top: 0.875rem;
padding-bottom: 0.875rem;
color: var(--bs-black-300);
`;

const StyledContentSpan = styled.span`
  color: var(--bs-black-300);
  text-align: right;
  font-size: 1.5rem;
  padding-top: 0.75rem;
  text-overflow: ellipsis;
  overflow: hidden;
  line-clamp: 5;
  width: 100%;
  height: 100%;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 1.25rem;
  }
`;

const StyledTextDiv = styled.div`

overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  height: 100%;
  -webkit-line-clamp: 4; 
  padding-bottom: 0.9375rem;
  -webkit-box-orient: vertical;
  padding-top: 0.3125rem;
  justify-content: center;
  align-items: center;
  text-align: center;





`;

const StyledCreatedDiv = styled.div`
  color: var(--bs-black-300);
  
`;

const StyledBottomDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  text-align: center;
  margin-top: 0.9375rem;
  
`;

const StyledCommentCountP = styled.p`
color: var(--bs-black-300);
font-size: 1rem;
border: 1px solid white;
border-radius: 0.3125rem;
padding-left: 0.3125rem;
padding-right: 0.3125rem;


`;

const StyledBookMarkButtonDiv = styled.div`
z-index: 999999;
position: absolute;
right: 0.3125rem;
top: 0.75rem;
`;