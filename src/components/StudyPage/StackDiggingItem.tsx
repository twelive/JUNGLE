import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { supabase } from '@/client';
import { StackDiggingDTO } from '@/types/StackDiggingDTO';
import BookMarkButton from '@components/StudyPage/BookMarkButton';
import { useAuthStore } from '@store/useAuthStore';
import notbookmark from '@assets/common/bookmarkwhite.svg';

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
    <Box to={`/study/stack/detail/${item.id}`} key={item.id}>
      <BookMarkButtonWrapper>

      <BookMarkButton notBookmarkImg={notbookmark} itemId={item.id} userId={userId} itemType='stack' ></BookMarkButton>

      </BookMarkButtonWrapper>
      <TitleBox>
        <Title>{item.title}</Title>
      </TitleBox>
      <Author>{item.user_email}</Author>
      <TextBox>
        <Content>{item.text}</Content>
      </TextBox>
      <BottomBox>
        <Created>{new Date(item.created_at).toISOString().split('T')[0]}</Created>
 {item.stack_comment_counter !== null ? (
              <CommentCounter>
                {item.stack_comment_counter >= 99 ? '99+' : item.stack_comment_counter}
              </CommentCounter>
            ) : (
              <CommentCounter>{comment}</CommentCounter>
            )}
      </BottomBox>
    </Box>
  ))
}
    </>
  );
}

export default StackDiggingItem;

const Box = styled(Link)`
  text-decoration-line: none;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  min-width: 16.25rem;
  height: 16.25rem;
  padding: 1.875rem;
  border-radius: 0.9375rem;
  background: var(--bs-black-300);

  @media ${(props) => props.theme.device.tablet} {
    min-width: 15rem;
    height: 15rem;
    padding: 1.25rem
  }
`;

const TitleBox = styled.div`
width: 100%;
`;

const Title = styled.span`
  display: block;
  color: white;
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

const Author = styled.div`
width: 100%;
line-clamp: 1;
text-overflow: ellipsis;
white-space: nowrap;
overflow: hidden;
padding-top: 0.875rem;
padding-bottom: 0.875rem;
color: white;
`;

const Content = styled.span`
  color: white;
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

const TextBox = styled.div`

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

const Created = styled.div`
  color: white;
  
`;

const BottomBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  text-align: center;
  margin-top: 0.9375rem;
  
`;

const CommentCounter = styled.p`
color: white;
font-size: 1rem;
border: 0.0625rem solid white;
border-radius: 0.3125rem;
padding-left: 0.3125rem;
padding-right: 0.3125rem;


`;

const BookMarkButtonWrapper = styled.div`
z-index: 999999;
position: absolute;
right: 0.3125rem;
top: 0.75rem;
`;