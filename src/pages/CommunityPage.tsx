import { Helmet } from 'react-helmet-async';
// import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import banner1 from '../assets/comunity/comunity-banner1.svg';
import banner2 from '../assets/comunity/comunity-banner2.svg';
import banner3 from '../assets/comunity/comunity-banner3.svg';
import styled from 'styled-components';


function ComunityPage() {
  return (
    <>
      <Helmet>
        <title>Community - JUNGLE</title>
      </Helmet>
      <section>
        <h1>ComunityPage</h1>
          <StyledSwiper
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
            <ImageContainer>
              <SwiperSlide>
                <img
                  className="imgsize"
                  src={banner1}
                  alt="여러분의 취업을 응원합니다 배너"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="imgsize"
                  src={banner2}
                  alt="해피 뉴 이어 2024년 배너"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="imgsize"
                  src={banner3}
                  alt="취업자료 정글과 함께하세요 배너"
                />
              </SwiperSlide>
            </ImageContainer>
          </StyledSwiper>
      </section>
      
      <section>
            
      </section>
    </>
  );
}

export default ComunityPage;


const StyledSwiper = styled(Swiper)`
  margin: 0 auto;
  width: 100%; /* 스와이퍼의 너비를 원하는 크기로 조절하세요 */
  height: 200px; /* 세로 높이 조절 */
`;

const ImageContainer = styled.div`
  .imgsize {
    max-width: 100%; /* 이미지의 최대 너비를 부모 요소에 맞춤 */
    height: auto; /* 이미지의 세로 비율 유지 */
    margin: 0 auto; /* 추가적인 스타일 적용 가능 */
  }
`;

