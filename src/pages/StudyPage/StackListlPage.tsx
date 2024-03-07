import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';

import { supabase } from '@/client';
import { StackDiggingDTO } from '@/types/StackDiggingDTO';
import BookMarkButton from '@components/StudyPage/BookMarkButton';
import TagButtonComponent from '@components/StudyPage/TagButtonComponent';
import { useAuthStore } from '@store/useAuthStore';
import useTagStore from '@store/useTagStore';
import notbookmark from '@assets/common/bookmarkblack.svg';



const getListData: () => Promise<StackDiggingDTO[] | null> = async () => {
  const { data, error } = await supabase
    .from('stack_digging')
    .select(
      `
      *
    `
    )
    .order('created_at', { ascending: false })
    .returns<StackDiggingDTO[] | null>();
  if (error) {
      console.error('Error fetching data:', error);
    } else {
    if (data) { 
      console.log('fetching data');

      }
    }
  
  return data;
};


const StackListPage = ({ comment = '0' }) => {

  const { data: stackListData, error } = useQuery('stacklist', getListData);

  
  const  userId   = useAuthStore((state) => (state.user));

  const { selectedTag, setSelectedTag } = useTagStore();
  const [tags, setTags] = useState<string[]>([]);

  
  
  
  
  useEffect(() => {

   
    setSelectedTag('etc');

  }, []);
  
 useEffect(() => {
    const uniqueTags = Array.from(new Set(stackListData?.map((tagItem: StackDiggingDTO) => String(tagItem.tag))));
    setTags(uniqueTags);
  }, [stackListData]);

  
  if (error) {
    console.error('Error fetching data:', error);
    return <div>Error fetching data</div>;
  }

  if (!stackListData) {
    return <div>Loading...</div>;
  }
  const handleButtonClick = (tag: string | null) => {
    setSelectedTag(tag || 'etc');
  };
  
  
  return (
    <>
      <Helmet>
        <title>StackList - JUNGLE</title>
      </Helmet>
      <TitleWrapper>
        <MainTitle>
        기술 디깅 
        </MainTitle>
        <ButtonSpaceContainer>
        <TagButtonWrapper>
        {tags.map(tag => (
  <TagButtonComponent key={tag} $isActive={selectedTag === tag} onClick={() => handleButtonClick(tag)} title={tag} >
    
  </TagButtonComponent>
 ))}

        </TagButtonWrapper>

        <CreateButton to='/study/stack/StackNewPage'>새글 작성</CreateButton>
        </ButtonSpaceContainer>
        
      </TitleWrapper>
      <GridOuter>

      <OutGrid>
          {stackListData
          .filter((item: StackDiggingDTO) => selectedTag == null || item.tag === selectedTag)
          .map((item: StackDiggingDTO)=> (
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


      </OutGrid>

      </GridOuter>

    </>
  );
};

export default StackListPage;

const GridOuter = styled.div`
  padding: 3.125rem;
  @media ${(props) => props.theme.device.mobile} {
    padding-top: 3.125rem;
    padding-bottom: 3.125rem;
  padding-left: 0rem;
  padding-right: 0rem;
  
  }
`;

const OutGrid = styled.section`

  display: grid;
  overflow: hidden;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  grid-auto-flow: row; 
  column-gap: 0.625rem;
  row-gap: 0.625rem;
  @media ${(props) => props.theme.device.tablet} {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-flow: row; 
    width: 100%;
  }
  @media ${(props) => props.theme.device.mobile} {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-flow: row; 
    width: 100%;
  }


`;

const Box = styled(Link)`

  text-decoration-line: none;

  position: relative;
  border: 2px black solid;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 16.25rem;
  padding: 1.875rem;
  border-radius: 0.9375rem;
  background: white;


`;

const TitleBox = styled.div`
width: 100%;
`;

const Title = styled.span`
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

const Author = styled.div`
width: 100%;
line-clamp: 1;
text-overflow: ellipsis;
white-space: nowrap;
overflow: hidden;
padding-top: 0.875rem;
padding-bottom: 0.875rem;
  color: var(--bs-black-300);

`;

const Content = styled.span`
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

  color: var(--bs-black-300);

  
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
  color: var(--bs-black-300);

font-size: 1rem;
border: 1px solid white;
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

const TitleWrapper = styled.div `
display: flex;   
flex-direction: row;
gap: 0.625rem;
padding-top: 3.125rem;
padding-bottom: 3.125rem;
border-bottom: 1px solid black;
@media ${(props) => props.theme.device.mobile} {
flex-direction: column;
  padding-top: 1.875rem;
padding-bottom: 1.875rem;
  
  }


`;  


const MainTitle = styled.h2`
font-size: 3.125rem;
font-weight: 600;

`;

const TagButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
 align-items: flex-end;
 flex-grow: 1;
 
`;

const CreateButton = styled(Link)`
text-align: center;
display: flex;
    flex-direction: row;
    align-items: center;
text-decoration: none;
  padding-left: 0.9375rem;
  background-color: #666; 
  color: var(--bs-black-300);
  color: white;
  padding-right: 0.9375rem;
  height: 1.25rem;
  border-radius: 0.625rem;
  margin: 0.3125rem;
  border: 0.5008px solid var(--bs-black-500);
  box-sizing: border-box;
  max-width: 12.5rem;
  overflow: hidden; 
  @media ${(props) => props.theme.device.mobile} { 
    font-size: 0.5rem;
    padding-left: 3%;
  padding-right: 3%;
  padding-top: 1%;
  padding-bottom: 1%;
  }
`;

const ButtonSpaceContainer = styled.div`
display: flex;
align-items: flex-end;



`;