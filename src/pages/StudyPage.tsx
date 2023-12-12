import useDataStore from '@/store/useDataStore';
import useStorageStore from '@/store/useStorageStore';
import useTagStore from '@/store/useTagStore';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { getPbImageURL } from '@/store/getPbImageURL';
import StudyTitleGroup from '@/components/StudyPage/StudyTitleGroup';
import TagButtonComponent from '@/components/StudyPage/TagButton';
import { Link } from 'react-router-dom';



function StudyPage() {
  const { data: bookData, getListData } = useDataStore();
  const { selectedTag, setSelectedTag } = useTagStore();
  const { updateData } = useDataStore(); 
  const { getAllList } = useStorageStore();
  const [like, setLike] = useState<Record<string, number>>(() => {
    const initialLike: Record<string, number> = {};
    bookData.forEach(item => {
      initialLike[String(item.anonymous_book_id)] = 0;
    });
    return initialLike;
  });
  
  

  const [tags, setTags] = useState<string[]>([]);

 
  useEffect(()=>{
    getListData('book');
    setSelectedTag('etc');
    getAllList('book','');
    
  },[getListData,getAllList,setSelectedTag]);
  

  useEffect(() => {
    const uniqueTags = Array.from(new Set(bookData.map(item => String(item.tag))));
    setTags(uniqueTags);
  }, [bookData]);
  
  const handleButtonClick = (tag: string) => {
    setSelectedTag(tag);
  };
  
  return (
    <>
      <Helmet>
        <title>Study - JUNGLE</title>
      </Helmet>
      <section>
        
          <StudyTitleGroup studyTitle='도서'>
        

     {tags.map(tag => (
      <TagButtonComponent key={tag} active={selectedTag === tag} onClick={() => handleButtonClick(tag)} title={tag} >
        
      </TagButtonComponent>
     ))}

          
          </StudyTitleGroup>
        <article>
         
          {bookData.filter(item => !selectedTag || item.tag === selectedTag).map((item)=> (
          <>
          <div>
            <div>

          <Img src={getPbImageURL('book',`${item.anonymous_book_id}.jpg`)}/>
            </div>
            {item.title}
            {item.anonymous_book_id}
            <StyledLink to={`${item.URL}`}></StyledLink>
           
  
            <span onClick={async () => {
  const newLike = (like[String(item.anonymous_book_id)] || 0) + 1;
  setLike(prevLike => ({
    ...prevLike,
    [String(item.anonymous_book_id)]: newLike
  }));

  const updatedItem = {
    ...item,
    like: newLike
  };
  await updateData('book', Number(item.anonymous_book_id), updatedItem);
}}> 👍 </span> {like[String(item.anonymous_book_id)] || 0}
          </div>
          </>
          ))}
        </article>
      </section>
      <section>
          <h2>로드맵</h2>

      </section>
    </>
  );
}

export default StudyPage;


const Img = styled.img `
width: 100px;

`;



const StyledLink = styled(Link)`
	box-sizing: border-box;
	display: block;
	padding: 4px 8px;
	margin: 0 auto;
	text-align: center;
`;
