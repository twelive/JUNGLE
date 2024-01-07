import { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';

import {
  Swiper as ReactSwiper,
  SwiperSlide as SwiperSlideDefault,
} from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/grid';

import { supabase } from '@/client';
import { Autoplay, Pagination, Navigation, Grid } from 'swiper/modules';
import { CommunityProject } from '@/types/CommunityProject';
import { CommunityStudy } from '@/types/CommunityStudy';
import { Users } from '@/types/Users';
import { getPbImageURL } from '@store/getPbImageURL';
import banner1 from '@assets/community/community-banner1.svg';
import banner2 from '@assets/community/community-banner2.svg';
import banner3 from '@assets/community/community-banner3.svg';



const getUserData: () => Promise<Users[] | null> = async () => {
  const { data } = await supabase
    .from('users')
    .select(
      `
      id,
      email,
      community_project:community_project (id, title)
    `
    )
    .order('created_at', { ascending: false })
    .returns<Users[] | null>();
  
  return data;
};

const getProjects :()=> Promise<CommunityProject[] | null>= async () => {  
   const { data } = await supabase
     .from('community_project')
     .select('*')
     .order('created_at', { ascending: false }).returns<CommunityProject[] | null>();
      return data;
      
}

const getStudys :()=> Promise<CommunityStudy[] | null>= async () => {  
   const { data } = await supabase
     .from('community_study')
     .select('*')
     .order('created_at', { ascending: false }).returns<CommunityStudy[] | null>();
      return data;
      
}


function CommunityPage() {
  const { data: projects } = useQuery('projects', getProjects);
  const { data: studys } = useQuery('study', getStudys);
  const { data: users } = useQuery('users', getUserData);

  const [dataType, setDataType] = useState<'project' | 'study'>('project');
  
   const handleProjectClick = () => {
     setDataType('project');
     
   };

   
   const handleStudyClick = () => {
     setDataType('study');
   };


   const getUserEmail = (userId: string) => {

     const foundUser = users?.find((user) => user.id === userId);
     return foundUser?.email || 'Unknown'; 
   };
 
   


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
        <ButtonWrapper>
        <div>
        <ToggleButton onClick={handleProjectClick}>프로젝트</ToggleButton>
        <ToggleButton onClick={handleStudyClick}>스터디</ToggleButton>
        </div>
        <LinkWrapper>
        <CreateLink to="communitycreate">모집하기</CreateLink>
        </LinkWrapper>
        </ButtonWrapper>
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
        
            {projects && studys && (dataType === 'project' ? projects : studys).map((item) => (
                <CustomSwiperSlide key={item.id}>
                  <StyledLink to={`/detailPage/${dataType}/${item.id}`}>
                    <SecondSlide>
                      <Maincontents>
                        <H2>{item.title}</H2>
                        <P>모집 마감일 : {item.deadline}</P>
                        <Contents>{item.contents}</Contents>
                        <Imgwrapper>
                          {[item.tag1, item.tag2, item.tag3].map(
                            (tag, index) =>
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
                      <div>작성자: {getUserEmail(item.user_id || '')}</div>
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

export default CommunityPage;


const FirstSwiperContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100%;
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
    gap: 2.5rem;
    justify-items: center;
    margin: 0 auto;
  }
`;

const SecondSlide = styled.div`
  text-align: center;
  font-size: 1.125rem;
  background: #fff;
  width: 100%;
  max-width: 100%;
  height: 18.75rem;
  flex-direction: column;
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: normal;
  border-radius: 1.25rem;
 
  .swiper-slide {
    margin: 0 !important;
  }
`;


const CustomSwiperSlide = styled(SwiperSlideDefault)`
  width: 3.125rem;
  height: 3.125rem;
`;


const Img = styled.img`
  width: 3.125rem;
  height: auto;
  padding-right: 0.625rem;
`;

const H2 = styled.h2`
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis; 
`;

const P = styled.p`
  color: gray;
  text-align: left;
  padding-left: 0.625rem;
`;

const Contents = styled.p`
  text-align: left;
  padding-left: 0.625rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-top: 1.25rem;
  height: 2.1875rem; 
`;

const Imgwrapper = styled.div`
  display: flex;
  padding-left: 0.625rem;
  padding-top: 1.25rem;
  padding-bottom: 0.625rem;

  `;


const StyledLink = styled(Link)`
    text-decoration: none; 
    color: black; 
    &:visited {
      color: black; 
    }
    &:hover {
      text-decoration: none; 
      color: black; 
    }
    `;

    const Maincontents = styled.div`
      height: 15rem; 
      overflow: hidden;
      text-overflow: ellipsis;
      border-bottom: 0.0625rem solid gray;
      `;
    
    const ButtonWrapper = styled.div`
      display: flex;
      justify-content: space-between;
      margin-left: 10%;
      margin-right: 10%;
      `;


    const LinkWrapper = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      padding: 0.3125rem 0.9375rem;
      border-radius: 0.625rem;
      margin: 0.3125rem;
      border: 0.5px solid var(--bs-black-500);
      box-sizing: border-box;
      font-weight: 700;
      box-shadow: 0.1875rem 0.1875rem 0.125rem 0.0625rem rgba(137, 137, 138, 0.2);
      background-color: #000;
      `;

const CreateLink = styled(Link)`
  text-decoration: none; 
  color: black; 
  &:visited {
    color: white;
  }
  `;

  const ToggleButton = styled.button`
    background-color: white;
    border: none;
    padding: 0.3125rem 0.9375rem;
    border-radius: 0.625rem;
    margin: 0.3125rem;
    box-sizing: border-box;
    font-weight: 700;
    box-shadow: 0.1875rem 0.1875rem 0.125rem 0.0625rem rgba(137, 137, 138, 0.2);
  `;
    

