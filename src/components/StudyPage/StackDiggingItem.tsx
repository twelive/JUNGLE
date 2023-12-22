import { supabase } from '@/client';
// import useDataStore from '@/store/useDataStore';
import { StackDiggingDTO } from '@/types/StackDiggingDTO';
import { useQuery } from 'react-query';
// import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import BookMarkButton from './BookMarkButton';
import { useAuthStore } from '@/store/useAuthStore';
import notbookmark from './../../assets/common/bookmarkwhite.svg';

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
  // const { getListData } = useDataStore();
  const { data: stackListData } = useQuery('stacklist', getListData);
  const  userId   = useAuthStore((state) => (state.user));
  // console.log(stackListData);

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
  /* Reset CSS */
  text-decoration-line: none;
  /* Style CSS */
  position: relative;

  overflow: hidden;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
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

const TitleBox = styled.div`
width: 100%;
/* height: 100%; */
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
  padding-bottom: 2px;
  /* padding-top: 2px; */
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
padding-bottom: 14px;
color: white;
`;

const Content = styled.span`
  color: white;
  text-align: right;
  font-size: 1.5rem;
  padding-top: 12px;
  /* white-space: nowrap; */
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
  padding-bottom: 15px;
  -webkit-box-orient: vertical;
  padding-top: 5px;
  justify-content: center;
  align-items: center;
  text-align: center;





`;

const Created = styled.div`
/* padding-top: 5px; */
  color: white;
  
`;

const BottomBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  /* justify-content: center; */
  align-items: center;
  text-align: center;
  margin-top: 15px;
  
`;

const CommentCounter = styled.p`
color: white;
font-size: 16px;
border: 1px solid white;
border-radius: 5px;
padding-left: 5px;
padding-right: 5px;


`;

const BookMarkButtonWrapper = styled.div`
z-index: 999999;
position: absolute;
right: 5px;
top: 12px;
`;