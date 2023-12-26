import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Swiper } from 'swiper/react';
import { SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom'; 
import { getPbImageURL } from '@store/getPbImageURL';


import StudyTitleGroup from '@components/StudyPage/StudyTitleGroup';
import TagButtonComponent from '@components/StudyPage/TagButtonComponent';
import StackDiggingNameSection from '@components/StudyPage/StackDiggingNameSection';
import useDataStore from '@store/useDataStore';
import useStorageStore from '@store/useStorageStore';
import useTagStore from '@store/useTagStore';



import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';





import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

import styled from 'styled-components';
import LikeButton from '@components/StudyPage/LikeButton';
import { useAuthStore } from '@store/useAuthStore';
import StackDiggingContentsSection from '@components/StudyPage/StackDiggingContentsSection';






function StudyPage() {
const { data: bookData,  getListData } = useDataStore();


  const { selectedTag, setSelectedTag } = useTagStore();
  const  userId   = useAuthStore((state) => (state.user));

  
  const { getAllList } = useStorageStore();
  const itemType = `book`;
  
  const [tags, setTags] = useState<string[]>([]);
  
  useEffect(()=>{
  setSelectedTag('etc');
getListData('book','book_like_counter');
    getAllList('book', '');
   

},[]);

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
<OutGrid>

            <BookGroup>


      <StudyTitleGroup studyTitle='도서 추천' tagTitle={selectedTag as string} studymobiletitle='도서추천' children2={tags.map(tag => (
  <TagButtonComponent key={tag} $isActive={selectedTag === tag} onClick={() => handleButtonClick(tag)} title={tag} >
    
  </TagButtonComponent>
 ))}>


  
       <SwiperOut
        slidesPerView={3}
            spaceBetween={0}
            slidesPerGroup={3}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        cssMode={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 0,
            slidesPerGroup:2,
          },
          1010:{
            slidesPerView:3,


          },
          1920: {
            slidesPerView: 3,
          },
         
        }}
      >

      {bookData.filter(item => !selectedTag || item.tag === selectedTag).map((item)=> (
    
        <SwiperSlider key={item.anonymous_book_id}>
  <BookCover>

    <BookLinker to={`${item.URL}`}>
    <Dl>
      <Dt>
  <Img src={getPbImageURL('book',`${item.anonymous_book_id}.webp`)} alt="/" />
  
      </Dt>
      <Dd>
        {item.title}
      </Dd>

  
    </Dl>
  
            </BookLinker>

            
            <LikeButton itemId={item.id} userId={userId} itemType={itemType} likeCounter={item.book_like_counter}></LikeButton>
  </BookCover>
    </SwiperSlider>

      ))}
 
      
      </SwiperOut>


      
      </StudyTitleGroup>


      </BookGroup>
      
      <StackDiggingSection>
        <StackDiggingContentsSection></StackDiggingContentsSection>
        <StackDiggingNameSection></StackDiggingNameSection>

      </StackDiggingSection>




 
  </OutGrid>

  <section>
      <h2>로드맵</h2>

  </section>
</>
);
}

export default StudyPage;

const OutGrid = styled.section`


display: block;


`;

const BookGroup = styled.div` 
width: 100%; 
display: block; 
padding-top: 3.125rem;
padding-bottom: 3.125rem;
border-bottom: 0.0625rem solid var(--bs-black-300);




`;




 const SwiperOut = styled(Swiper)`
    width: 100%;
  height: 100%;
  padding: 3.125rem;

  position: relative;
  .swiper-wrapper {

    margin: 0 auto;
    overflow: hidden;
  }
  .swiper-button-prev:after,
.swiper-button-next:after {
  font-size: 1.1rem !important;
  font-weight: 600 !important;
}
.swiper-button-next {
  right: 0;
}
.swiper-button-prev {
  left: 0;
}
.swiper-button-next,
.swiper-button-prev {

  color: black !important;
  &:hover {
     background-color: #fff;
  opacity: 0.5;
  padding: 0.0625rem;
  border-radius: 1.25rem;
  }
}
.swiper .swiper-pagination {
  position: absolute;
  bottom: 0; 
}
.swiper-pagination-bullet {
  background-color: var(--bs-black-100);
  margin: 0 0.625rem;
}







  `;

const SwiperSlider = styled(SwiperSlide) `
    overflow: hidden;

  
.swiper-slide {

    text-align: center;
    font-size: 1.125rem;
    background: #fff;
    display: flex;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    gap: 1.5625rem;
} 



`;

const Dl = styled.dl `
height: 100%;
width: auto;
display: block;
`;
const Dt = styled.dt `
display: flex;
justify-content: center;
margin-bottom: 0.3125rem;
height: 100%;

  `;
  const Img = styled.img`

  width: auto;

  object-fit: contain;
  max-width: 100%;
  height: 100%;
  display: block;
  
  `;
const Dd = styled.dd `
overflow: hidden;
text-decoration: none;
border: none;
color: black;
-webkit-line-clamp: 1;
height: 0.9375rem;
text-align: center;
`;

const BookLinker = styled(Link)`
display: block;
height: 70%;

`;


const BookCover = styled.div `

  padding-left: 1.875rem;
  padding-right: 1.875rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5625rem;
  height: 100%;
  width: auto;



`;

const StackDiggingSection = styled.section`
 display: flex;
 width: 100%;
  flex-direction: row;
 
border-top: 0.15rem solid var(--bs-black-400);
  border-bottom: 0.15rem solid var(--bs-black-400);
  @media ${(props) => props.theme.device.tablet} {
    flex-direction: column-reverse;

  }

  @media ${(props) => props.theme.device.mobile} {
    flex-direction: column-reverse;
  
  }
`;