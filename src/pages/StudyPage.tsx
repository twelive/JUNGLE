import useDataStore from '@/store/useDataStore';
import useStorageStore from '@/store/useStorageStore';
import useTagStore from '@/store/useTagStore';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { getPbImageURL } from '@/store/getPbImageURL';
import StudyTitleGroup from '@/components/StudyPage/StudyTitleGroup';
import { Swiper } from 'swiper/react';
import TagButtonComponent from '@/components/StudyPage/TagButtonComponent';
import StackDiggingNameSection from '@/components/StudyPage/StackDiggingNameSection';
// import { useQuery } from 'react-query';


import { SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom'; 
// Import Swiper React components

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';




// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

import styled from 'styled-components';
import LikeButton from '@/components/StudyPage/LikeButton';
import { useAuthStore } from '@/store/useAuthStore';
import StackDiggingContentsSection from '@/components/StudyPage/StackDiggingContentsSection';

function StudyPage() {
const { data: bookData, getListData } = useDataStore();
  const { selectedTag, setSelectedTag } = useTagStore();
  const  userId   = useAuthStore((state) => (state.user));
  // const  userEmail   = useAuthStore((state) => (state.userEmail));
  // console.log(userEmail);
  
  const { getAllList } = useStorageStore();
  const itemType = `book`;
  
  const [tags, setTags] = useState<string[]>([]);
  
  useEffect(()=>{
  console.log(userId);
  setSelectedTag('etc');
getListData('book');
getAllList('book','');

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


      <StudyTitleGroup studyTitle='도서 추천' tagTitle='tag' studymobiletitle='도서추천' children2={tags.map(tag => (
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
          {/* 좋아요 버튼을 누르면 likes 스키마에 id는 자동생성되고 내 user_id가 들어가고 book_id에 해당 book.id가 들어간다. */}
            
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
/* display: grid;
 */

display: block;


@media ${(props) => props.theme.device.mobile} {
/* font-size: 1rem; */
}

@media ${(props) => props.theme.device.tablet} {

}

@media ${(props) => props.theme.device.laptop} {
/* font-size: 5rem;ㄴ */
}
`;

const BookGroup = styled.div` 
width: 100%; 
display: block; 
padding-top: 50px;
padding-bottom: 50px;
border-bottom: 0.0625rem solid var(--bs-black-300);




`;

/////////


 const SwiperOut = styled(Swiper)`
    width: 100%;
  height: 100%;
  padding: 50px;

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
  padding: 1px;
  border-radius: 20px;
  }
}
.swiper .swiper-pagination {
  position: absolute;
  bottom: 0; 
}
.swiper-pagination-bullet {
  background-color: var(--bs-black-100);
  margin: 0 10px;
}





@media ${(props) => props.theme.device.mobile} {
    /* font-size: 1rem; */
  }
  
  @media ${(props) => props.theme.device.tablet} {
    /* font-size: 2rem; */
  }
  
  @media ${(props) => props.theme.device.laptop} {

  }

  `;

const SwiperSlider = styled(SwiperSlide) `
    overflow: hidden;

  
.swiper-slide {

    text-align: center;
    font-size: 18px;
    background: #fff;
    display: flex;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    gap: 25px;
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
margin-bottom: 5px;
height: 100%;

@media ${(props) => props.theme.device.mobile} {
  /* font-size: 1rem; */
  
  
}

@media ${(props) => props.theme.device.tablet} {
  /* font-size: 2rem; */
}

@media ${(props) => props.theme.device.laptop} {
    /* height: 200px; */
    
  }
  `;
  const Img = styled.img`
   /* display: block; */
  width: auto;
  /* height: 100%; */
  object-fit: contain;
  max-width: 100%;
  height: 100%;
  display: block;
  
  `;
const Dd = styled.dd `
overflow: hidden;
-webkit-line-clamp: 1;
height: 15px;
text-align: center;
`;

const BookLinker = styled(Link)`
display: block;
height: 70%;

`;


const BookCover = styled.div `
  /* background-color: purple; */
  padding-left: 30px;
  padding-right: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
  height: 100%;
  width: auto;


@media ${(props) => props.theme.device.mobile} {
/* margin-top: 0px;
margin-bottom: 0px; */


}
`;

const StackDiggingSection = styled.section`
 display: flex;
 width: 100%;
  flex-direction: row;
 
border-top: 0.15rem solid var(--bs-black-400);
  border-bottom: 0.15rem solid var(--bs-black-400);
  @media ${(props) => props.theme.device.tablet} {
    flex-direction: column-reverse;
    /* align-items: start;
    padding: 2.5rem 0; */
  }

  @media ${(props) => props.theme.device.mobile} {
    flex-direction: column-reverse;
    /* align-items: start;
    gap: 1.875rem;
    padding: 1.875rem 0; */
  }
`;