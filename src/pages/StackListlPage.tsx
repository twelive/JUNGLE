import { Helmet } from 'react-helmet-async';
// import useDataStore from '@/store/useDataStore';
import { useEffect } from 'react';
import { useState } from 'react';
import useTagStore from '@/store/useTagStore';
import { supabase } from '@/client';
// import useDataStore from '@/store/useDataStore';
import { StackDiggingDTO } from '@/types/StackDigging';
import { useQuery } from 'react-query';
// import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import notbookmark from '../assets/common/bookmarkwhite.svg';
import styled from 'styled-components';
import BookMarkButton from '@/components/StudyPage/BookMarkButton';
import TagButtonComponent from '@/components/StudyPage/TagButtonComponent';



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


const StackListPage = ({ comment = '0' }) => {
  const stackListData = useQuery('stacklist', getListData).data!;

  const  userId   = useAuthStore((state) => (state.user));
// const { data: stackListData, getListData } = useDataStore();
  const { selectedTag, setSelectedTag } = useTagStore();
  const [tags, setTags] = useState<string[]>([]);

  
  
  
  
  useEffect(()=>{
    
    setSelectedTag('etc');
    // getListData('stack_digging');
    
    
  }, []);
  
  useEffect(() => {
    const uniqueTags = Array.from(new Set(stackListData.map(item => String(item.tag))));
    setTags(uniqueTags);
  }, [stackListData]);
  
  const handleButtonClick = (tag: string) => {
    setSelectedTag(tag);
  };
  
  if (!stackListData) {
    // 값이 없을 때의 처리
    return <div>No data available</div>;
  }
  
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
          {
  (stackListData ?? []).filter(item => !selectedTag || item.tag === selectedTag).map((item) => (
    <Box to={`/detailPage/stack/${item.id}`} key={item.id}>
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
  padding: 50px;
  @media ${(props) => props.theme.device.mobile} {
    padding-top: 50px;
    padding-bottom: 50px;
  padding-left: 0px;
  padding-right: 0px;
  
  }
`;

const OutGrid = styled.section`

  display: grid;
  overflow: hidden;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  grid-auto-flow: row; 
  column-gap: 5px;
  row-gap: 5px;

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


// const FakeDiv = styled.div`
//   background-color: red;
//   height: 100px;
//   overflow: hidden;

// `;
const Box = styled(Link)`

  text-decoration-line: none;

  position: relative;

  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  /* min-width: 260px; */
  height: 260px;
  padding: 1.875rem;
  border-radius: 0.9375rem;
  background: var(--bs-black-300);

  /* @media ${(props) => props.theme.device.tablet} {
    min-width: 15rem;
    height: 15rem;
    padding: 1.25rem;
  } */
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

  color: white;
  
`;

const BottomBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
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

const TitleWrapper = styled.div `
display: flex;   
flex-direction: row;
gap: 10px;
padding-top: 50px;
padding-bottom: 50px;
border-bottom: 1px solid black;
@media ${(props) => props.theme.device.mobile} {
flex-direction: column;
  padding-top: 30px;
padding-bottom: 30px;
  
  }


`;  


const MainTitle = styled.h2`
font-size: 50px;
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
  padding-left: 15px;
  background-color: #666; 
  color: white;
  padding-right: 15px;
  height: 20px;
  border-radius: 10px;
  margin: 5px;
  border: 0.5px solid var(--bs-black-500);
  box-sizing: border-box;
  max-width: 200px; /* Set a maximum width */
  overflow: hidden; /* Hide content overflow */
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

/* justify-content: space-between; */

`;