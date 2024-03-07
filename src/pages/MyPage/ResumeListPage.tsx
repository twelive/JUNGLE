import { supabase } from '@/client';
import ResumeCategory from '@/components/MyPage/ResumeCategory';
import { useAuthStore } from '@/store/useAuthStore';
import { ResumeNewDTO } from '@/types/ResumeNew';
import { Helmet } from 'react-helmet-async';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function ResumeListPage() {
  const { user } = useAuthStore();

  const getListData: () => Promise<ResumeNewDTO[] | null> = async () => {
    const { data, error } = await supabase
      .from('resume')
      .select('*')
      .eq('user_id', user)
      .order('created_at', { ascending: false })
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

  const { data: resumeListData, error } = useQuery('resume', getListData);

  if (error) {
    console.error('Error fetching data:', error);
    return <div>죄송합니다. 잠시 후에 시도해주세요.</div>;
  }

  return (
    <StyledListSection>
      <Helmet>MyResumePage - JUNGLE</Helmet>
      <h1 className="sr-only">JUNGLE - 이력서 목록 페이지</h1>
      <StyledPositionLink to={'/mypage/resume/new'}>글 작성</StyledPositionLink>
      {resumeListData ? (
        <StyledResumeSection>
          {resumeListData.map((resume, index) => (
            <StyledWritingWrapper key={index}>
              <ResumeCategory
                href={`/mypage/resume/detail/${resume.id}`}
                title={resume.title || undefined}
                context={resume.project.join('\n') || undefined}
                date={resume.updated_at ? resume.updated_at : resume.created_at}
              />
            </StyledWritingWrapper>
          ))}
        </StyledResumeSection>
      ) : (
        <StyledNoResumeSection>
          <StyledLink to={'/mypage/resume/new'}>글 작성</StyledLink>
          <StyledLink to={'/main'}>메인으로 이동</StyledLink>
        </StyledNoResumeSection>
      )}
    </StyledListSection>
  );
}

export default ResumeListPage;

const StyledListSection = styled.section`
  position: relative;
`;

const StyledResumeSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 1.875rem;
  margin: 3.125rem;
  align-items: center;
`;

const StyledNoResumeSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.875rem;
  margin: 3.125rem;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 2rem;
  font-weight: 700;

  @media ${(props) => props.theme.device.tablet} {
    margin: 2.5rem;
    font-size: 1.75rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    margin: 1.875rem;
    font-size: 1.25rem;
  }
`;

const StyledWritingWrapper = styled.div`
  min-width: 17.5rem;
  width: 17.5rem;
  margin: 1.5625rem 3.125rem 1.5625rem 0;
  padding: 1.875rem;
  border-radius: 15px;
  background: white;
  color: var(--bs-black-200);
  border: 2px black solid;

  @media ${(props) => props.theme.device.mobile} {
    min-width: 12.5rem;
    width: 12.5rem;
    margin: 1rem 0.5rem;
    padding: 0.75rem;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  padding: 0.75rem 1.25rem;
  border: 1px solid var(--bs-black-500);
  border-radius: 9px;
  background-color: var(--bs-black-100);
  color: var(--main-bgColor);
  font-weight: 500;
  text-align: center;

  @media ${(props) => props.theme.device.tablet} {
    padding: 0.5rem 1rem;
  }

  @media ${(props) => props.theme.device.mobile} {
    padding: 0.25rem 0.75rem;
  }
`;

const StyledPositionLink = styled(StyledLink)`
  position: absolute;
  top: -2rem;
  right: 0;
`;
