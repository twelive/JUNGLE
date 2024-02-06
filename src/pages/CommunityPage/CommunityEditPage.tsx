import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { Helmet } from 'react-helmet-async';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

import { supabase } from '@/client';
import CommunityCreateDetail from '@/components/CommunityPage/CommunityCreateDetail';
import CommunityCreateIntroduction from '@/components/CommunityPage/CommunityCreateIntroduction';
import CommunityCreateAuthorInfo from '@components/CommunityPage/CommunityCreateAuthorInfo';
import CommunityCreateDeadline from '@components/CommunityPage/CommunityCreateDeadline';

interface EditData {
  title: string;
  contents: string;
  division: string;
  people: string;
  progress: string;
  tag1: string;
  tag2: string;
  tag3: string;
  deadline: Date | null;
}

function CommunityEditPage() {
  const { itemId, dataType } = useParams();
  console.log('Type:', dataType);


  const [userEmail] = useState<string>('');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [people, setPeople] = useState('');
  const [division, setDivision] = useState('');
  const [progress, setProgress] = useState('');
  const [tag1, setStack1] = useState('');
  const [tag2, setStack2] = useState('');
  const [tag3, setStack3] = useState('');
  const [deadline, setDeadline] = useState<Date | null>(null);
  const navigate = useNavigate();
  

  const { data: initialData } = useQuery(['item', itemId], async () => {
    if (!itemId) {

      return null;
    }
    const targetTable = dataType === 'project' ? 'community_project' : 'community_study';
    console.log('Target Table:', targetTable);

    const { data, error } = await supabase
      .from(targetTable)
      .select('*')
      .eq('id', itemId)
      .single();

    if (error) {
      console.error('Error fetching initial data:', error);
    }
  console.log('Fetched Data:', data);

    return data;
  });
 

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setContents(initialData.contents || '');
      setPeople(initialData.people || '');
      setDivision(initialData.division || '');
      setProgress(initialData.progress || '');
      setStack1(initialData.tag1 || '');
      setStack2(initialData.tag2 || '');
      setStack3(initialData.tag3 || '');
      setDeadline(initialData.deadline ? new Date(initialData.deadline) : null);
    }
     console.log('Initial Data:', initialData);
  }, [initialData]);

  const updatePost = useMutation(
    async (data: EditData) => {
      try {
         if (itemId === undefined) {
        return;
        }
        const targetTable = dataType === 'project' ? 'community_project' : 'community_study';
        const { error } = await supabase
          .from(targetTable)
          .update({
            title: data.title,
            contents: data.contents,
            division: data.division,
            people: data.people,
            progress: data.progress,
            tag1: data.tag1,
            tag2: data.tag2,
            tag3: data.tag3,
            deadline: data.deadline?.toISOString(), // Convert Date to string
          })
          .eq('id', itemId);

        if (error) {
          console.error('Error updating post. Error details:', error);
          throw new Error('Error updating post');
        }
      } catch (error) {
        console.error('Error updating post:', error);
      }
    },
    {
      onSuccess: () => {
        navigate('/community'); // Redirect to the community page after a successful update
      },
    }
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updatePost.mutate({
      title,
      contents,
      division,
      people,
      progress,
      tag1,
      tag2,
      tag3,
      deadline,
    });
  };
 
  return (
    <>
      <Helmet>
        <title>CommunityCreate - JUNGLE</title>
      </Helmet>
          <StyledFormContainer>
            <fieldset>
              <div className="sr-only">
                <StyledSrlegend>프로젝트/스터디 모집 작성 폼</StyledSrlegend>
              </div>
              <StyledFormWrapper onSubmit={handleSubmit}>
                <ul>
                  <div>
                    <StyledInfo>✏프로젝트 기본 정보를 입력해주세요.</StyledInfo>
                    <CommunityCreateAuthorInfo userEmail={userEmail} />
                    <CommunityCreateDetail
                      division={division}
                      people={people}
                      progress={progress}
                      tag1={tag1}
                      tag2={tag2}
                      tag3={tag3}
                      setDivision={setDivision}
                      setPeople={setPeople}
                      setProgress={setProgress}
                      setStack1={setStack1}
                      setStack2={setStack2}
                      setStack3={setStack3}
                    />
                  </div>
                  <StyledLiBox>
                    <CommunityCreateDeadline
                      deadline={deadline}
                      setDeadline={setDeadline}
                    />
                  </StyledLiBox>
                  <StyledInfo>👩‍💻프로젝트에 대해 소개해주세요.</StyledInfo>
                  <CommunityCreateIntroduction
                    title={title}
                    setTitle={setTitle}
                    contents={contents}
                    setContents={setContents}
                  />
                </ul>
                <StyledSubmitBox>
                  <StyledSubmit type="submit">수정 완료</StyledSubmit>
                </StyledSubmitBox>
              </StyledFormWrapper>
            </fieldset>
          </StyledFormContainer>
    </>
  );
}
export default CommunityEditPage;

const StyledFormContainer = styled.div`
  margin: 0 auto;
  align-items: center;
`;

const StyledFormWrapper = styled.form`
  font-size: 1.625rem;
`;

const StyledLiBox = styled.li`
  width: 80%;
  height: 40%;
  padding-bottom: 1.25rem;
  padding-right: 10%;
`;

const StyledSrlegend = styled.legend`
  .sr-only {
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
    margin: -1px;
  }
`;

const StyledInfo = styled.div`
  padding-bottom: 1.25rem;
  border-bottom: 1px solid #d8d8d8;
`;

  const StyledSubmit = styled.button`
    width: 10%;
    height: 2.5rem;
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
    background-color: #fff;
  `;

  const StyledSubmitBox = styled.div`
    display: flex;
    justify-content: end;
  `;
  