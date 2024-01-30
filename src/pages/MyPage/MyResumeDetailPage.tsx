import { useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { supabase } from '@/client';
import { useAuthStore } from '@store/useAuthStore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import debounce from '@/utils/debounce';
import { ResumeNewDTO } from '@/types/ResumeNew';

const createData: (
  tableName: string,
  data: Partial<ResumeNewDTO>
) => Promise<ResumeNewDTO[] | null> = async (tableName, data) => {
  const { data: insertedData } = await supabase
    .from(tableName)
    .insert(data)
    .single();

  return insertedData;
};

function MyResumeDetailPage() {
  const userId = useAuthStore((state) => state.user);
  const userEmail = useAuthStore((state) => state.userEmail);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  console.log(title, content);
  const [stack, setStack] = useState<
    'Javascript' | 'TypeScirpt' | 'React' | 'Next.js'
  >('Javascript');

  const handleStackClick = () => {
    setStack('React');
  };

  const titleRef = useRef<HTMLInputElement>(null);
  const portfolioRef = useRef<HTMLInputElement>(null);
  const projectRef = useRef<HTMLTextAreaElement>(null);
  const activitiesRef = useRef<HTMLTextAreaElement>(null);
  const SecureEmail = userEmail.replace(/@.*/, '');
  const debouncedSetTitle = debounce((value: string) => setTitle(value), 50);
  const debouncedSetContent = debounce(
    (value: string) => setContent(value),
    50
  );
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = titleRef.current?.value;
    const portfolio = portfolioRef.current?.value;
    const project = projectRef.current?.value;
    const activities = activitiesRef.current?.value;

    if (title && portfolio && userId && userEmail) {
      const data = {
        title,
        portfolio,
        project,
        activities,
        user_id: userId,
        user_email: userEmail,
      };

      try {
        await createData('resume', data);
        toast.success(`작성 완료 👌 ${stack}`);
        setTimeout(() => {
          navigate(`/mypage/${SecureEmail}/resume`);
        }, 3000);
      } catch (error) {
        toast.error('작성 실패 😞');
      }
    }
  };

  const handleReset = () => {
    titleRef.current!.value = '';
    portfolioRef.current!.value = '';
    projectRef.current!.value = '';
    activitiesRef.current!.value = '';
  };

  return (
    <>
      <Helmet>createNew ResumePage</Helmet>
      <NewOuter>
        <TitleArea>이력서 작성</TitleArea>
        <FormArea onSubmit={handleSubmit}>
          <Label>
            <AnyTextBox>
              <Author>제목</Author>
              <Input
                type="text"
                ref={titleRef}
                onChange={(e) => debouncedSetTitle(e.target.value)}
              />
            </AnyTextBox>
          </Label>
          <Label>
            <AnyTextBox>
              <Author>포트폴리오</Author>
              <Input
                type="text"
                ref={titleRef}
                onChange={(e) => debouncedSetTitle(e.target.value)}
              />
            </AnyTextBox>
            <StyledAddButton type="button">+ 추가</StyledAddButton>
          </Label>

          <Label>
            <StyledToggleButton onClick={handleStackClick}>
              주요 기술 스택
            </StyledToggleButton>
            <StyledToggleButton onClick={handleStackClick}>
              자격증/외국어
            </StyledToggleButton>
          </Label>

          <Label>
            <AnyTextBox>
              <Author>작성자</Author>
              <Email>{SecureEmail}</Email>
            </AnyTextBox>
          </Label>
          <Label>
            <div>주요 프로젝트</div>
            <Textarea
              ref={projectRef}
              onChange={(e) => debouncedSetContent(e.target.value)}
            />
          </Label>
          <Label>
            <div>활동</div>
            <Textarea
              ref={activitiesRef}
              onChange={(e) => debouncedSetContent(e.target.value)}
            />
          </Label>
          <ButtonArea>
            <Button type="submit">저장</Button>
            <Button type="button" onClick={handleReset}>
              취소
            </Button>
          </ButtonArea>
        </FormArea>
      </NewOuter>
    </>
  );
}

export default MyResumeDetailPage;

const NewOuter = styled.section`
  padding: 3.125rem;
  color: black;

  @media ${(props) => props.theme.device.mobile} {
    padding-top: 1.25rem;
    padding-left: 0;
    padding-bottom: 0;
    padding-right: 0;
  }

  select {
    border: 1px solid black;
  }
`;

const FormArea = styled.form`
  margin: 5%;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 2.1875rem;
  padding: 1.25rem;
  min-height: 25rem;
`;

const Author = styled.div`
  text-align: center;
  white-space: nowrap;
  padding-left: 0.3125rem;
  padding-right: 0.9375rem;
`;

const Email = styled.p``;

const AnyTextBox = styled.div`
  width: 100%;
  display: flex;

  justify-items: center;
  vertical-align: middle;
  align-items: center;
  @media ${(props) => props.theme.device.mobile} {
    font-size: 0.625rem;
  }
`;

const Label = styled.label`
  width: 100%;
  display: block;
  margin-bottom: 0.625rem;
`;

const Input = styled.input`
  width: 100%;
  margin-top: 0.3125rem;
  padding: 0.3125rem;
  border: 1px solid black;
  @media ${(props) => props.theme.device.mobile} {
    padding: 0rem;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 18.75rem;
  resize: none;
  box-sizing: border-box;
  margin-top: 0.3125rem;
  padding: 0.3125rem;
  border: 1px solid black;
  padding: 0.625rem;
`;

const TitleArea = styled.p`
  font-weight: 600;
  font-size: 3.125rem;
  margin-left: 5%;
  @media ${(props) => props.theme.device.mobile} {
    font-size: 1.25rem;
  }
`;
const ButtonArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  height: 1.875rem;
`;
const Button = styled.button`
  margin: 0.125rem;
  border: 1px solid black;
  padding-top: 0.5%;
  padding-bottom: 0.5%;
  border-radius: 0.3125rem;
  box-sizing: border-box;

  &:hover {
    background-color: #111;
    color: white;
  }
  @media ${(props) => props.theme.device.mobile} {
    font-size: 0.625rem;
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

const StyledAddButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0.3125rem 0.9375rem;
  border-radius: 0.625rem;
  margin: 0.3125rem;
  box-sizing: border-box;
  font-weight: 700;
  cursor: pointer;
`;
