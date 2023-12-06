import { Helmet } from 'react-helmet-async';
// import React, { useRef, useState } from 'react';
// Import Swiper React components
import {
  Swiper as ReactSwiper,
  SwiperSlide as SwiperSlideDefault,
} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/grid';

// import required modules
import { Autoplay, Pagination, Navigation, Grid } from 'swiper/modules';
import banner1 from '../assets/community/community-banner1.svg';
import banner2 from '../assets/community/community-banner2.svg';
import banner3 from '../assets/community/community-banner3.svg';
import styled from 'styled-components';



function ComunityPage() {
  return (
    <>
      <Helmet>
        <title>Community - JUNGLE</title>
      </Helmet>
      <section>
        <h1>ComunityPage</h1>
        <FirstSwiperContainer>
          <FirstSwiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            <ReactSwiperSlide>
              <img
                className="imgsize"
                src={banner1}
                alt="여러분의 취업을 응원합니다 배너"
              />
            </ReactSwiperSlide>
            <ReactSwiperSlide>
              <img
                className="imgsize"
                src={banner2}
                alt="해피 뉴 이어 2024년 배너"
              />
            </ReactSwiperSlide>
            <ReactSwiperSlide>
              <img
                className="imgsize"
                src={banner3}
                alt="취업자료 정글과 함께하세요 배너"
              />
            </ReactSwiperSlide>
          </FirstSwiper>
        </FirstSwiperContainer>
      </section>

      <section>
        <button>프로젝트</button>
        <button>스터디</button>
        <button>글 작성하기</button>
        <SecondSwiperContainer>
          <SecondSwiper
            slidesPerView={3}
            grid={{
              rows: 2,
            }}
            // spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Grid, Pagination]}
          >
            {/* SwiperSlide */}
            <CustomSwiperSlide>
              <SecondSlide>Slide 1</SecondSlide>
            </CustomSwiperSlide>
            <CustomSwiperSlide>
              <SecondSlide>Slide 2</SecondSlide>
            </CustomSwiperSlide>
            <CustomSwiperSlide>
              <SecondSlide>Slide 3</SecondSlide>
            </CustomSwiperSlide>
            <CustomSwiperSlide>
              <SecondSlide>Slide 4</SecondSlide>
            </CustomSwiperSlide>
            <CustomSwiperSlide>
              <SecondSlide>Slide 5</SecondSlide>
            </CustomSwiperSlide>
            <CustomSwiperSlide>
              <SecondSlide>Slide 6</SecondSlide>
            </CustomSwiperSlide>
            <CustomSwiperSlide>
              <SecondSlide>Slide 7</SecondSlide>
            </CustomSwiperSlide>
            <CustomSwiperSlide>
              <SecondSlide>Slide 8</SecondSlide>
            </CustomSwiperSlide>
            <CustomSwiperSlide>
              <SecondSlide>Slide 9</SecondSlide>
            </CustomSwiperSlide>
            <CustomSwiperSlide>
              <SecondSlide>Slide 10</SecondSlide>
            </CustomSwiperSlide>
            <CustomSwiperSlide>
              <SecondSlide>Slide 11</SecondSlide>
            </CustomSwiperSlide>
            <CustomSwiperSlide>
              <SecondSlide>Slide 12</SecondSlide>
            </CustomSwiperSlide>
          </SecondSwiper>
        </SecondSwiperContainer>
      </section>
    </>
  );
}

export default ComunityPage;


const FirstSwiperContainer = styled.div`
  margin: 0 auto;
  width: 70%;
  height: 200px;
`;

const FirstSwiper = styled(ReactSwiper)`
  width: 100%;
  height: 100%;
  `;

  const ReactSwiperSlide = styled(SwiperSlideDefault)`
    width: 100%;
    height: auto;
  `;

const SecondSwiperContainer = styled.div`
  width: 80%;
  height: 80%;
  margin: 0 auto;
`;


const SecondSwiper = styled(ReactSwiper)`
  width: 80%;
  height: 100%;
  .swiper-wrapper {
    display: grid;
    grid-template-columns: repeat(6, 1fr); 
    grid-template-rows: repeat(2, 1fr); 
    gap: 20px; 
    justify-items: center;
    align-items: center;
    margin: 0 auto;
  }
`;

const SecondSlide = styled.div`
  text-align: center;
  font-size: 18px;
  background: #fff;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0;
  .swiper-slide {
    margin: 0 !important;
  }
`;


const CustomSwiperSlide = styled(SwiperSlideDefault)`
  width: 50px;
  height: 50px;
`;