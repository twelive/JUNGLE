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
import { useState } from 'react';
import { getPbImageURL } from '@/store/getPbImageURL';
import { supabase } from '@/client';
import { useQuery } from 'react-query';
import { CommunityProject } from '@/types/CommunityProject';
import { Users } from '@/types/Users';
import { CommunityStudy } from '@/types/CommunityStudy';




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

   // 스터디 버튼 클릭 시
   const handleStudyClick = () => {
     setDataType('study');
   };


   const getUserEmail = (userId: string) => {
     // 'users' 데이터에서 해당 userId에 맞는 사용자의 이메일을 찾아 반환
     const foundUser = users?.find((user) => user.id === userId);
     return foundUser?.email || 'Unknown'; // 만약 사용자를 찾지 못하면 'Unknown' 반환
   };
  // Make sure users and projects are not null or undefined
   

  console.log(projects);
  // 12

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
        <button onClick={handleProjectClick}>프로젝트</button>
        <button onClick={handleStudyClick}>스터디</button>
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
            {/* SwiperSlide */}
            {projects && studys && (dataType === 'project' ? projects : studys).map((item) => (
            //  {projects &&
            //   projects.map((item) => (
                <CustomSwiperSlide key={item.id}>
                  <StyledLink to={`/detailPage/${dataType}/${item.id}`}>
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
    border: 1px solid #000;
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
      padding: 5px 15px;
      border-radius: 10px;
      margin: 5px;
      border: 0.5px solid var(--bs-black-500);
      box-sizing: border-box;
      font-weight: 700;
      box-shadow: 3px 3px 2px 1px rgba(137, 137, 138, 0.2);
      background-color: #000;
      `;

const CreateLink = styled(Link)`
  text-decoration: none; /* Remove underline */
  color: black; /* Set default text color */
  &:visited {
    color: white; /* Set visited link color */
  }
`;

    
// const TagButton = styled.button<{ isActive: boolean }>`
//   background-color: ${(props) => (props.isActive ? 'white' : 'black')};
//   color: ${(props) => (props.isActive ? 'black' : 'white')};
//   border: none;
//   padding: 5px 15px;
//   border-radius: 10px;
//   margin: 5px;
//   border: 0.5px solid var(--bs-black-500);
//   box-sizing: border-box;
//   font-weight: 700;
//   box-shadow: 3px 3px 2px 1px rgba(137, 137, 138, 0.2);

//   @media ${(props) => props.theme.device.mobile} {
//     font-size: 0.5rem;
//     padding: 1% 3%;
//   }
// `;

