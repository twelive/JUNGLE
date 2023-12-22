import styled from 'styled-components';
import {
  Swiper as ReactSwiper,
  SwiperSlide as SwiperSlideDefault,
} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/grid';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

type ImageArray = Array<string>;

interface SwiperComponentProps {
  slides: ImageArray;
}

const SwiperComponent: React.FC<SwiperComponentProps> = ({ slides }) => {
  return (
    <SwiperContainer>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {slides.map((banner, index) => (
          <SwiperSlide key={index}>
            <img className="imgsize" src={banner} alt={`Banner ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperContainer>
  );
};
export default SwiperComponent;

const SwiperContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100%;
`;

const Swiper = styled(ReactSwiper)`
  width: 100%;
  height: 100%;
`;

const SwiperSlide = styled(SwiperSlideDefault)`
  width: 100%;
  height: auto;
`;
