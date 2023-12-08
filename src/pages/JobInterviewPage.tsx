import { Helmet } from 'react-helmet-async';
import Banner from '@/assets/job/job-banner.svg';
import styled from 'styled-components';
function JobInterviewPage() {
  return (
    <>
      <Helmet>
        <title>Introduction - JUNGLE</title>
      </Helmet>
      <MainSection>
        <BannerImg src={Banner} alt="배너사진" />
        <MenuBox>
          <button>취업</button> {/* 컴포넌트 들어갈자리 */}
          <button>면접</button>
        </MenuBox>
        <MainBox>
          <MainItemBox>
            <ItemLogo>로고</ItemLogo>
            <ItemName>회사명</ItemName>
          </MainItemBox>
          <MainItemBox>
            <ItemLogo>로고</ItemLogo>
            <ItemName>회사명</ItemName>
          </MainItemBox>
          <MainItemBox>
            <ItemLogo>로고</ItemLogo>
            <ItemName>회사명</ItemName>
          </MainItemBox>
          <MainItemBox>
            <ItemLogo>로고</ItemLogo>
            <ItemName>회사명</ItemName>
          </MainItemBox>
          <MainItemBox>
            <ItemLogo>로고</ItemLogo>
            <ItemName>회사명</ItemName>
          </MainItemBox>
          <MainItemBox>
            <ItemLogo>로고</ItemLogo>
            <ItemName>회사명</ItemName>
          </MainItemBox>
          <MainItemBox>
            <ItemLogo>로고</ItemLogo>
            <ItemName>회사명</ItemName>
          </MainItemBox>
          <MainItemBox>
            <ItemLogo>로고</ItemLogo>
            <ItemName>회사명</ItemName>
          </MainItemBox>
          <MainItemBox>
            <ItemLogo>로고</ItemLogo>
            <ItemName>회사명</ItemName>
          </MainItemBox>
          <MainItemBox>
            <ItemLogo>로고</ItemLogo>
            <ItemName>회사명</ItemName>
          </MainItemBox>
          <MainItemBox>
            <ItemLogo>로고</ItemLogo>
            <ItemName>회사명</ItemName>
          </MainItemBox>
          <MainItemBox>
            <ItemLogo>로고</ItemLogo>
            <ItemName>회사명</ItemName>
          </MainItemBox>
        </MainBox>
      </MainSection>
    </>
  );
}

export default JobInterviewPage;

const MainSection = styled.section`
  width: 100%;
  height: 100%;
`;

const BannerImg = styled.img`
  width: 100%;
  height: 500px;
`;

const MenuBox = styled.div`
  display: flex;
  justify-content: start;
  gap: 50px; //변경예정
  padding: 50px;
  font-size: 40px;
  border: 1px solid black;
`;

const MainBox = styled.div`
  border: 1px solid black;
  padding-top: 50px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 100px;
  place-items: center;
`;

const MainItemBox = styled.div`
  width: 850px;
  height: 150px;
  border: 1px solid black;
  display: flex;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  font-size: 60px;
`;

const ItemLogo = styled.div`
  width: 340px;
  border: 5px solid black;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
`;

const ItemName = styled.div``;
