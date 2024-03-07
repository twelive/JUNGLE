import { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import {
  Swiper as ReactSwiper,
  SwiperSlide as SwiperSlideDefault,
} from 'swiper/react';
import SwiperComponent from '@components/SwiperComponet';
import {  Pagination, Grid } from 'swiper/modules';
import { useGetProjects, useGetStudys, useGetUsers } from '@hooks/useDataFetching';
import banner1 from '@assets/community/community-jungle.svg';
import banner2 from '@assets/community/community-happynewyear.svg';
import banner3 from '@assets/community/community-jobdata.svg';
import ItemCard from '@/components/CommunityPage/CommunityItemCard';

type ImageArray = Array<string>;
function CommunityPage() {
  const { data: projects } = useGetProjects();
  const { data: studys } = useGetStudys();
  const { data: users } = useGetUsers();
  const [dataType, setDataType] = useState<'project' | 'study'>('project');
  const slides: ImageArray = [banner1, banner2, banner3];
  
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
        <StyledFirstSwiperContainer>
          <SwiperComponent slides={slides} />
        </StyledFirstSwiperContainer>
      </section>
      <section>
        <StyledButtonContainer>
          <div>
            <StyledToggleButton onClick={handleProjectClick}>프로젝트</StyledToggleButton>
            <StyledToggleButton onClick={handleStudyClick}>스터디</StyledToggleButton>
          </div>
          <StyledLinkWrapper>
            <StyledCreateLink to="communitycreate">모집하기</StyledCreateLink>
          </StyledLinkWrapper>
        </StyledButtonContainer>
        <StyledSecondSwiperContainer>
          <StyledSecondSwiperWrapper 
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
            {projects &&
              studys &&
              (dataType === 'project' ? projects : studys).map((item) => (
                <StyledCustomSwiperSlideBox key={item.id}>
                <ItemCard
                  key={item.id}
                  item={item}
                  dataType={dataType}
                  getUserEmail={getUserEmail}
                  />
                  </StyledCustomSwiperSlideBox>
              ))}
          </StyledSecondSwiperWrapper>
        </StyledSecondSwiperContainer>
      </section>
    </>
  );
}

export default CommunityPage;

const StyledFirstSwiperContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100%;
`;

const StyledSecondSwiperContainer = styled.div`
  width: 80%;
  height: 80%;
  margin: 0 auto;
`;

const StyledCustomSwiperSlideBox = styled(SwiperSlideDefault)`
  width: 3.125rem;
  height: 3.125rem;
`;

const StyledSecondSwiperWrapper = styled(ReactSwiper)`
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

  const StyledButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-left: 10%;
    margin-right: 10%;
  `;

  const StyledLinkWrapper = styled.div`
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
    box-shadow: 3px 3px 2px 1px rgba(137, 137, 138, 0.2);
    background-color: #000;
  `;

  const StyledCreateLink = styled(Link)`
    text-decoration: none;
    color: white;
    &:visited {
      color: white;
    }
  `;

  const StyledToggleButton = styled.button`
    background-color: white;
    border: none;
    padding: 0.3125rem 0.9375rem;
    border-radius: 0.625rem;
    margin: 0.3125rem;
    box-sizing: border-box;
    font-weight: 700;
    box-shadow: 3px 3px 2px 1px rgba(137, 137, 138, 0.2);
  `;
    

