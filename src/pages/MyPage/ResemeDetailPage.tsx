import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { supabase } from '@/client';
import { ResumeNewDTO } from '@/types/ResumeNew';
import ResumeSubheading from '@/components/MyPage/ResumeSubheading';
import { useAuthStore } from '@store/useAuthStore';
import { getPbImageURL } from '@/store/getPbImageURL';

import phone from '@assets/mypage/resume-phone.svg';
import mail from '@assets/mypage/resume-mail.svg';
import github from '@assets/mypage/resume-github.svg';
import blog from '@assets/mypage/resume-blog.svg';
import plus from '@assets/mypage/resume-plus.svg';

function ResemeDetailPage() {
  const { itemId } = useParams();
  const { user } = useAuthStore();
  const [profileImageUrl, setProfileImageUrl] = useState('');

  useEffect(() => {
    setProfileImageUrl(getPbImageURL('profile_resume', user));
  }, []);

  const getResumeData: () => Promise<ResumeNewDTO[] | null> = async () => {
    const { data, error } = await supabase
      .from('resume')
      .select('*')
      .eq('user_id', user)
      .eq('id', Number(itemId))
      .returns<ResumeNewDTO[] | null>();
    if (error) {
      console.error('Error fetching data:', error);
    } else {
      if (data) {
        console.log('fetching data');
      }
    }

    return data;
  };

  const { data: resumeData, error } = useQuery('resume', getResumeData);

  if (error) {
    console.error('Error fetching data:', error);
    return <div>죄송합니다. 잠시 후에 시도해주세요.</div>;
  }

  if (resumeData) {
    return (
      <>
        <Helmet>
          <title>createNew ResumePage</title>
        </Helmet>
        <h1 className="sr-only">새 이력서 작성</h1>
        <StyledArea>
          <StyledTitle>{resumeData[0].title}</StyledTitle>
          <StyledFlexLayout>
            <StyledProfileWrapper>
              <Image src={profileImageUrl} alt="profile" />
            </StyledProfileWrapper>
            <StyledSection>
              <StyledInfo>{resumeData[0].info_name}</StyledInfo>
              <p>{resumeData[0].info_job}</p>
              <InfoIconNav>
                {resumeData[0].info_phone && (
                  <StyledImg src={phone} alt="전화번호" />
                )}
                {resumeData[0].info_mail && (
                  <StyledImg src={mail} alt="이메일" />
                )}
                {resumeData[0].info_github && (
                  <StyledImg src={github} alt="깃헙" />
                )}
                {resumeData[0].info_blog && (
                  <StyledImg src={blog} alt="블로그" />
                )}
                {resumeData[0].info_link && <StyledImg src={plus} alt="링크" />}
              </InfoIconNav>
            </StyledSection>
          </StyledFlexLayout>

          <ResumeSubheading>기술 스택</ResumeSubheading>
          <StyledSection>
            <p>작성한 내용이 없습니다.</p>
          </StyledSection>
          <ResumeSubheading>경험/활동/교육</ResumeSubheading>
          <StyledSection>
            <StyledText>활동명: {resumeData[0].activity[0]}</StyledText>
            <p>기관/장소명: {resumeData[0].activity[1]}</p>
            <p>기간: {resumeData[0].activity[2]}</p>
            <p>{resumeData[0].activity[3]}</p>
          </StyledSection>

          <ResumeSubheading>프로젝트</ResumeSubheading>
          <StyledSection>
            <StyledText>프로젝트명: {resumeData[0].project[0]}</StyledText>
            <p>소속/기타: {resumeData[0].project[1]}</p>
            <p>기간: {resumeData[0].project[2]}</p>
            <p>{resumeData[0].project[3]}</p>
          </StyledSection>

          <ResumeSubheading>자기소개</ResumeSubheading>
          <StyledSection>
            <StyledText>{resumeData[0].introduce[0]}</StyledText>
            <p>{resumeData[0].introduce[1]}</p>
          </StyledSection>

          <ResumeSubheading>포트폴리오</ResumeSubheading>
          <StyledSection>
            <p>첨부한 링크가 없습니다.</p>
          </StyledSection>
          <ButtonArea>
            <Button type="button" onClick={() => {}}>
              수정
            </Button>
            <Button type="button" onClick={() => {}}>
              삭제
            </Button>
          </ButtonArea>
        </StyledArea>
      </>
    );
  }
}

export default ResemeDetailPage;

const StyledArea = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin: 5% 0;
  padding: 5%;
  border: 3px solid gray;
  border-radius: 1.25rem;
  background: #efeee9;
`;

const StyledSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0 1rem 1rem;

  @media ${(props) => props.theme.device.tablet} {
    margin: 0.75rem 0 0.75rem 0.75rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    margin: 0.5rem 0 0.5rem 0.5rem;
  }
`;

const StyledFlexLayout = styled.section`
  display: flex;
  gap: 2rem;
  margin: 1rem 0 1rem 1rem;

  @media ${(props) => props.theme.device.tablet} {
    margin: 0.75rem 0 0.75rem 0.75rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    margin: 0.5rem 0 0.5rem 0.5rem;
  }
`;

const StyledProfileWrapper = styled.div`
  position: relative;
  width: 15rem;
  height: 15rem;
  border-radius: 0.625rem;
  background: white;

  @media ${(props) => props.theme.device.tablet} {
    width: 11.25rem;
    height: 11.25rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    width: 7.5rem;
    height: 7.5rem;
  }
`;

const Image = styled.img`
  position: absolute;
  display: block;
  color: white;
  font-size: 10.625rem;
  font-weight: 700;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  object-fit: fill;
  border-radius: 0.625rem;
  transform: translate(-50%, -50%);

  @media ${(props) => props.theme.device.tablet} {
    font-size: 8.125rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    font-size: 5rem;
  }
`;

const InfoIconNav = styled.nav`
  display: flex;
  gap: 0.625rem;
  cursor: pointer;
`;

const StyledImg = styled.img`
  width: 2.25rem;

  @media ${(props) => props.theme.device.tablet} {
    width: 2rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    width: 1.375rem;
  }
`;

const StyledTitle = styled.h2`
  font-size: 3.5rem;
  font-weight: bold;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 3rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    font-size: 2.5rem;
  }
`;

const StyledInfo = styled.h3`
  font-size: 2rem;
  font-weight: 600;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 1.75rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    font-size: 1.125rem;
  }
`;

const StyledText = styled.p`
  font-size: 1.5rem;
  font-weight: 500;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 1.25rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    font-size: 1rem;
  }
`;

const ButtonArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  gap: 0.625rem;
  height: 1.875rem;
`;

const Button = styled.button`
  width: fit-content;
  height: fit-content;
  margin: 0.125rem;
  border: 1px solid black;
  padding-top: 0.5%;
  padding-bottom: 0.5%;
  border-radius: 0.3125rem;
  box-sizing: border-box;
  background-color: white;
  font-size: 1.5rem;
  font-weight: 500;

  &:hover {
    background-color: #111;
    color: white;
    font-weight: 600;
  }

  @media ${(props) => props.theme.device.tablet} {
    font-size: 1.25rem;
  }

  @media ${(props) => props.theme.device.mobile} {
    font-size: 0.875rem;
  }
`;
