import useDataStore from '@/store/useDataStore';
import useStorageStore from '@/store/useStorageStore';
import useTagStore from '@/store/useTagStore';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { getPbImageURL } from '@/store/getPbImageURL';

interface ButtonProps {
  active?: boolean;
}


function StudyPage() {
  const { data: bookData, getListData } = useDataStore();
  const { selectedTag, setSelectedTag } = useTagStore();
  const { getAllList } = useStorageStore();


  const [tags, setTags] = useState<string[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=>{
    getListData('book');
    setSelectedTag('html/css');
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
        <h2>도서</h2>
        
        <article>
          <div>

                {tags.map(tag => (
              <Button key={tag} active={selectedTag === tag} onClick={() => handleButtonClick(tag)}>
                {tag}
              </Button>
            ))}

          </div>
          {bookData.filter(item => !selectedTag || item.tag === selectedTag).map((item)=> (
          <>
          <div>
            <div>

          <Img src={getPbImageURL('book',`${item.anonymous_book_id}.jpg`)}/>
            </div>
            {item.title}
            {item.anonymous_book_id}
            {item.URL}
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


const Button = styled.button<ButtonProps> `
    background-color: red;
  ${props => props.active && 'background-color: yellow;'}
  &[disabled] {
    cursor: default;
    opacity: 0.5;
    background: #dc3545 #025ce2;
  }
`;

const Img = styled.img `
width: 100px;

`;