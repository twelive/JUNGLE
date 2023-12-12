import { Helmet } from 'react-helmet-async';
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
import { Link } from 'react-router-dom'; 
import useDataStore from '@/store/useDataStore';
import { useEffect, useState } from 'react';
import useStorageStore from '@/store/useStorageStore';
import { getPbImageURL } from '@/store/getPbImageURL';

function ComunityPage() {
  const { data: projectData, getListData: getProjectListData } = useDataStore();
  const { data: studyData, getListData: getStudyListData } = useDataStore();
  const [dataType, setDataType] = useState('project'); // Initial data type is 'project'
  const{getAllList} = useStorageStore();

  useEffect(() => {
    if (dataType === 'project') {
      getProjectListData('community_project');
    } else if (dataType === 'study') {
      getStudyListData('community_study');
    }
    getAllList('community_img','');
    
  }, [dataType, getProjectListData, getStudyListData, getAllList]);

  

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
        <button onClick={() => setDataType('project')}>프로젝트</button>
        <button onClick={() => setDataType('study')}>스터디</button>
        <Link to="communitycreate">모집하기</Link>
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
            {(dataType === 'project' ? projectData : studyData).map((item) => (
              <CustomSwiperSlide key={item.id}>
                <StyledLink to={`/detailPage/${item.id}`}>
                  <SecondSlide>
                    <Maincontents>
                      <H2>{item.title}</H2>
                      <P>마감일 : {item.deadline}</P>
                      <Contents>{item.contents}</Contents>
                      {/* Loop through tags */}
                      <Imgwrapper>
                      {[item.tag1, item.tag2, item.tag3].map(
                        (tag, index) =>
                        // Render image if tag exists
                        tag && (
                          <div key={index}>
                              <Img
                                src={getPbImageURL(
                                  'community_img',
                                  `${tag}.svg`
                                  )}
                                  />
                            </div>
                          )
                          )}
                          </Imgwrapper>
                    </Maincontents>
                    <div>{item.email}</div>
                  </SecondSlide>
                </StyledLink>
              </CustomSwiperSlide>
            ))}
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
  width: 100%;
  height: 100%;
  .swiper-wrapper {
    display: grid;
    grid-template-columns: repeat(6, 1fr); 
    grid-template-rows: repeat(2, 1fr); 
    gap: 40px; 
    justify-items: center;
    margin: 0 auto;
  }
  `;

const SecondSlide = styled.div`
  text-align: center;
  font-size: 18px;
  background: #fff;
  width: 100%;
  max-width: 100%;
  height: 300px;
  flex-direction: column;
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: normal;
  border-radius: 20px;
  .swiper-slide {
    margin: 0 !important;
  }
`;


const CustomSwiperSlide = styled(SwiperSlideDefault)`
  width: 50px;
  height: 50px;
  :hover{
    border: 3px solid #000;
  }
  `;

const Img = styled.img`
  width: 50px;
  height: auto;
  padding-right: 10px;
  `;

const H2 = styled.h2`
  padding-top: 20px;
  padding-bottom: 20px;
  white-space: nowrap; /* Prevent wrapping */
  overflow: hidden; /* Hide overflowing content */
  text-overflow: ellipsis; /* Show ellipsis for overflowed content */
`;

const P = styled.p`
  color: gray;
  text-align: left;
  padding-left: 10px;
`;

const Contents = styled.p`
  text-align: left;
  padding-left: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Limit to two lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-top: 20px;
  height: 35px; /* Set a fixed height */
`;

const Imgwrapper = styled.div`
  display: flex;
  padding-left: 10px;
  padding-top: 20px;
  padding-bottom: 10px;

  `;


const StyledLink = styled(Link)`
    text-decoration: none; /* Remove underline */
    color: black; /* Set default text color */
    &:visited {
      color: black; /* Set visited link color */
    }
    &:hover {
      text-decoration: none; /* Remove underline on hover */
      color: black; /* Change text color on hover */
    }
    `;

    const Maincontents = styled.div`
      height: 240px; /* Set a fixed height */
      overflow: hidden;
      text-overflow: ellipsis;
      border-bottom: 1px solid gray;
      `;
