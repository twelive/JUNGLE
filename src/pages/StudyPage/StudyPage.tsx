import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Swiper } from 'swiper/react';
import { SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom'; 
import { getPbImageURL } from '@store/getPbImageURL';


import StudyTitleGroup from '@components/StudyPage/StudyTitleGroup';
import TagButtonComponent from '@components/StudyPage/TagButtonComponent';
import StackDiggingNameContainer from '@/components/StudyPage/StackDiggingNameContainer';
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
import StackDiggingContentsContainer from '@components/StudyPage/StackDiggingContentsContainer';






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
  
  const moveAlertClick = () => {
    alert('구매 링크로 이동됩니다');
  }; 
  

return (
<>
<Helmet>
<title>Study - JUNGLE</title>
</Helmet>


            <StyledBookSection>


      <StudyTitleGroup studyTitle='도서 추천' tagTitle={selectedTag as string} studymobiletitle='도서추천' children2={tags.map(tag => (
  <TagButtonComponent key={tag} $isActive={selectedTag === tag} onClick={() => handleButtonClick(tag)} title={tag} >
    
  </TagButtonComponent>
 ))}>


  
       <StyledSwiper
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
    
        <StyledSwiperSlider key={item.anonymous_book_id}>
  <StyledBookDiv>

            <StyledBookLink to={`${item.URL}`} onClick={moveAlertClick}>
    <StyledBookDl>
      <StyledBookDt>
  <StyledBookImg src={getPbImageURL('book',`${item.anonymous_book_id}.webp`)} alt="/" />
  
      </StyledBookDt>
      <StyledBookDd>
        {item.title}
      </StyledBookDd>

  
    </StyledBookDl>
  
            </StyledBookLink>

            
            <LikeButton itemId={item.id} userId={userId} itemType={itemType} likeCounter={item.book_like_counter}></LikeButton>
  </StyledBookDiv>
    </StyledSwiperSlider>

      ))}
 
      
      </StyledSwiper>


      
      </StudyTitleGroup>


      </StyledBookSection>
      
      <StyledStackDiggingSection>
        <StackDiggingContentsContainer></StackDiggingContentsContainer>
        <StackDiggingNameContainer></StackDiggingNameContainer>

      </StyledStackDiggingSection>






  <section>
      <h2>로드맵</h2>

  </section>
</>
);
}

export default StudyPage;



const StyledBookSection = styled.section` 
width: 100%; 
display: block; 
padding-top: 3.125rem;
padding-bottom: 3.125rem;
border-bottom: 1px solid var(--bs-black-300);




`;




 const StyledSwiper = styled(Swiper)`
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
.swiper-pagination-fraction, .swiper-pagination-custom, .swiper-horizontal > .swiper-pagination-bullets, .swiper-pagination-bullets.swiper-pagination-horizontal {
  bottom: var(--swiper-pagination-bottom, -2px);

}






  `;

const StyledSwiperSlider = styled(SwiperSlide) `
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

const StyledBookDl = styled.dl `
height: 100%;
width: auto;
display: block;
`;
const StyledBookDt = styled.dt `
display: flex;
justify-content: center;
margin-bottom: 0.3125rem;
height: 100%;

  `;
  const StyledBookImg = styled.img`

  width: auto;

  object-fit: contain;
  max-width: 100%;
  height: 100%;
  display: block;
  
  `;
const StyledBookDd = styled.dd `
overflow: hidden;
text-decoration: none;
border: none;
color: black;
-webkit-line-clamp: 1;
height: 0.9375rem;
text-align: center;
`;

const StyledBookLink = styled(Link)`
display: block;
height: 70%;

`;


const StyledBookDiv = styled.div `

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

const StyledStackDiggingSection = styled.section`
 display: flex;
 width: 100%;
  flex-direction: row;
 
border-top: 2.4px solid var(--bs-black-400);
  border-bottom: 2.4px solid var(--bs-black-400);
  @media ${(props) => props.theme.device.tablet} {
    flex-direction: column-reverse;

  }

  @media ${(props) => props.theme.device.mobile} {
    flex-direction: column-reverse;
  
  }
`;