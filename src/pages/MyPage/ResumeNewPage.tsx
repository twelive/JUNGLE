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
import ResumeSubheading from '@/components/MyPage/ResumeSubheading';
import ResumeInfoIcon from '@/components/MyPage/ResumeInfoIcon';
import ProfileResume from '@/components/MyPage/ProfileResume';

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

function ResumeNewPage() {
  const userId = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const [, setTitle] = useState('');
  const [, setName] = useState('');
  const [, setJob] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [, setPhone] = useState('');
  const [, setMail] = useState('');
  const [, setGithub] = useState('');
  const [, setBlog] = useState('');
  const [, setLink] = useState('');
  const [linkCount, setLinkCount] = useState(0);
  const [, setActivity] = useState('');
  const [, setProject] = useState('');
  const [, setIntroduce] = useState('');
  const [stack, setStack] = useState<
    'Javascript' | 'TypeScirpt' | 'React' | 'Next.js'
  >('Javascript');
  const [portfolioCount, setPortfolioCount] = useState(0);

  const titleRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const jobRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const mailRef = useRef<HTMLInputElement>(null);
  const githubRef = useRef<HTMLInputElement>(null);
  const blogRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  const activityTitleRef = useRef<HTMLInputElement>(null);
  const activityPlaceRef = useRef<HTMLInputElement>(null);
  const activityPeriodRef = useRef<HTMLInputElement>(null);
  const activityContentRef = useRef<HTMLTextAreaElement>(null);

  const projectTitleRef = useRef<HTMLInputElement>(null);
  const projectDepartmentRef = useRef<HTMLInputElement>(null);
  const projectPeriodRef = useRef<HTMLInputElement>(null);
  const projectContentRef = useRef<HTMLTextAreaElement>(null);

  const introduceTitleRef = useRef<HTMLInputElement>(null);
  const introduceContentRef = useRef<HTMLTextAreaElement>(null);

  const debouncedSetTitle = debounce((value: string) => setTitle(value), 500);
  const debouncedSetName = debounce((value: string) => setName(value), 500);
  const debouncedSetJob = debounce((value: string) => setJob(value), 500);
  const debouncedSetPhone = debounce((value: string) => setPhone(value), 500);
  const debouncedSetMail = debounce((value: string) => setMail(value), 500);
  const debouncedSetGithub = debounce((value: string) => setGithub(value), 500);
  const debouncedSetBlog = debounce((value: string) => setBlog(value), 500);
  const debouncedSetLink = debounce((value: string) => setLink(value), 500);
  const debouncedSetActivity = debounce(
    (value: string) => setActivity(value),
    500
  );
  const debouncedSetProject = debounce(
    (value: string) => setProject(value),
    500
  );
  const debouncedSetIntroduce = debounce(
    (value: string) => setIntroduce(value),
    500
  );

  function phoneFormat(phoneNumber: string) {
    const value = phoneNumber.replace(/[^0-9]/g, '');

    const firstLength = value.length > 9 ? 3 : 4;
    const formatted = [
      value.slice(0, firstLength),
      value.slice(firstLength, firstLength + 4),
      value.slice(firstLength + 4),
    ].join('-');

    return value.length > 9 ? formatted : value;
  }

  const handlePhoneInput = (e: React.FormEvent<HTMLInputElement>) => {
    const formatted = phoneFormat(e.currentTarget.value);
    setPhoneNumber(formatted);
    debouncedSetPhone(formatted);
  };

  const handlePlusLink = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLinkCount((prevLinks) => prevLinks + 1);
  };

  const handlePlusStack = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStack('React');
  };

  const handlePlusPortfolio = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPortfolioCount((prevLinks) => prevLinks + 1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = titleRef.current?.value;
    const name = nameRef.current?.value;
    const job = jobRef.current?.value;
    const phone = phoneRef.current?.value;
    const mail = mailRef.current?.value;
    const github = githubRef.current?.value;
    const blog = blogRef.current?.value;
    const link = linkRef.current?.value;
    const activity = [
      activityTitleRef.current?.value,
      activityPlaceRef.current?.value,
      activityPeriodRef.current?.value,
      activityContentRef.current?.value,
    ];
    const project = [
      projectTitleRef.current?.value,
      projectDepartmentRef.current?.value,
      projectPeriodRef.current?.value,
      projectContentRef.current?.value,
    ];
    const introduce = [
      introduceTitleRef.current?.value,
      introduceContentRef.current?.value,
    ];

    if (title && name && job && userId) {
      const data = {
        title,
        info_name: name,
        info_job: job,
        info_phone: phone,
        info_mail: mail,
        info_github: github,
        info_blog: blog,
        info_link: link,
        activity,
        project,
        introduce,
        user_id: userId,
      };

      try {
        await createData('resume', data);
        toast.success(`작성 완료 👌 ${stack}`);
        setTimeout(() => {
          navigate('/mypage/resume');
        }, 3000);
      } catch (error) {
        toast.error('작성 실패 😞');
      }
    }
  };

  const handleTemporary = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handleReset = () => {
    titleRef.current!.value = '';
    nameRef.current!.value = '';
    jobRef.current!.value = '';
    // 추가 예정
  };

  return (
    <>
      <Helmet>
        <title>createNew ResumePage</title>
      </Helmet>
      <h1 className="sr-only">새 이력서 작성</h1>
      <ProfileSection>
        <h3>사진</h3>
        <ProfileResume />
      </ProfileSection>
      <StyledFormArea onSubmit={handleSubmit}>
        <h2 className="sr-only">제목</h2>
        <StyledTitleInput
          type="text"
          placeholder="제목을 입력해주세요."
          required
          ref={titleRef}
          onChange={(e) => debouncedSetTitle(e.target.value)}
        />
        <ResumeSubheading essential>기본 정보</ResumeSubheading>
        <StyledSection>
          <StyledInfoInput
            type="text"
            placeholder="이름을 입력해주세요."
            required
            ref={nameRef}
            onChange={(e) => debouncedSetName(e.target.value)}
          />
          <StyledInfoInput
            type="text"
            placeholder="직무를 입력해주세요."
            required
            ref={jobRef}
            onChange={(e) => debouncedSetJob(e.target.value)}
          />
          <span>개인정보</span>
          <StyledPersonalContainer>
            <StyledLabel>
              <ResumeInfoIcon imgIcon="전화번호" />
              <StyledPersonalInput
                type="tel"
                placeholder="숫자만 입력해주세요."
                maxLength={14}
                value={phoneNumber}
                onInput={handlePhoneInput}
                ref={phoneRef}
                onChange={(e) => debouncedSetPhone(e.target.value)}
              />
            </StyledLabel>
            <StyledLabel>
              <ResumeInfoIcon imgIcon="메일" />
              <StyledPersonalInput
                type="email"
                placeholder="이메일 주소를 입력해주세요."
                ref={mailRef}
                onChange={(e) => debouncedSetMail(e.target.value)}
              />
            </StyledLabel>
            <StyledLabel>
              <ResumeInfoIcon imgIcon="깃허브" />
              <StyledPersonalInput
                type="url"
                placeholder="깃허브 주소를 입력해주세요."
                ref={githubRef}
                onChange={(e) => debouncedSetGithub(e.target.value)}
              />
            </StyledLabel>
            <StyledLabel>
              <ResumeInfoIcon imgIcon="블로그" />
              <StyledPersonalInput
                type="url"
                placeholder="블로그 주소를 입력해주세요."
                ref={blogRef}
                onChange={(e) => debouncedSetBlog(e.target.value)}
              />
            </StyledLabel>
            {Array(linkCount)
              .fill(null)
              .map((_, index) => (
                <StyledLabel>
                  <ResumeInfoIcon />
                  <StyledPersonalInput
                    key={index}
                    type="url"
                    placeholder="추가 링크 주소를 입력해주세요."
                    ref={linkRef}
                    onChange={(e) => debouncedSetLink(e.target.value)}
                  />
                </StyledLabel>
              ))}
            <StyledPlusButton onClick={handlePlusLink}>
              <ResumeInfoIcon />
              링크 추가
            </StyledPlusButton>
          </StyledPersonalContainer>
        </StyledSection>
        <ResumeSubheading>기술 스택</ResumeSubheading>
        <StyledSection>
          <StyledPlusButton onClick={handlePlusStack}>
            <ResumeInfoIcon />
            기술 스택 추가
          </StyledPlusButton>
        </StyledSection>
        <ResumeSubheading>경험/활동/교육</ResumeSubheading>
        <StyledSection>
          <StyledDiv>
            <label htmlFor="activityTitle">활동명</label>
            <StyledPersonalInput
              type="text"
              id="activityTitle"
              placeholder="활동 제목을 입력해주세요."
              ref={activityTitleRef}
              onChange={(e) => debouncedSetActivity(e.target.value)}
            />
          </StyledDiv>
          <StyledDiv>
            <label htmlFor="activityPlace">기관/장소명</label>
            <StyledPersonalInput
              type="text"
              id="activityPlace"
              placeholder="기관 또는 장소를 입력해주세요."
              ref={activityPlaceRef}
              onChange={(e) => debouncedSetActivity(e.target.value)}
            />
          </StyledDiv>
          <StyledDiv>
            <label htmlFor="activityPeriod">활동 기간</label>
            <StyledPersonalInput
              type="text"
              id="activityPeriod"
              placeholder="기간을 입력해주세요."
              ref={activityPeriodRef}
              onChange={(e) => debouncedSetActivity(e.target.value)}
            />
          </StyledDiv>
          <StyledTextarea
            placeholder="활동을 입력해주세요."
            ref={activityContentRef}
            onChange={(e) => debouncedSetActivity(e.target.value)}
          />
          <StyledPlusButton onClick={() => {}}>
            <ResumeInfoIcon />
            활동 추가
          </StyledPlusButton>
        </StyledSection>
        <ResumeSubheading>프로젝트</ResumeSubheading>
        <StyledSection>
          <StyledDiv>
            <label htmlFor="projectTitle">프로젝트명</label>
            <StyledPersonalInput
              type="text"
              id="projectTitle"
              placeholder="프로젝트 제목을 입력해주세요."
              ref={projectTitleRef}
              onChange={(e) => debouncedSetProject(e.target.value)}
            />
          </StyledDiv>
          <StyledDiv>
            <label htmlFor="projectDepartment">소속/기타</label>
            <StyledPersonalInput
              type="text"
              id="projectDepartment"
              placeholder="소속을 입력해주세요."
              ref={projectDepartmentRef}
              onChange={(e) => debouncedSetProject(e.target.value)}
            />
          </StyledDiv>
          <StyledDiv>
            <label htmlFor="projectPeroid">활동 기간</label>
            <StyledPersonalInput
              type="text"
              id="projectPeroid"
              placeholder="기간을 입력해주세요."
              ref={projectPeriodRef}
              onChange={(e) => debouncedSetProject(e.target.value)}
            />
          </StyledDiv>
          <StyledTextarea
            placeholder="활동을 입력해주세요."
            ref={projectContentRef}
            onChange={(e) => debouncedSetProject(e.target.value)}
          />
          <StyledPlusButton onClick={() => {}}>
            <ResumeInfoIcon />
            프로젝트 추가
          </StyledPlusButton>
        </StyledSection>
        <ResumeSubheading>자기소개</ResumeSubheading>
        <StyledSection>
          <StyledDiv>
            <label htmlFor="introduceText">소제목</label>
            <StyledPersonalInput
              type="text"
              id="introduceText"
              placeholder="소제목을 입력해주세요."
              ref={introduceTitleRef}
              onChange={(e) => debouncedSetIntroduce(e.target.value)}
            />
          </StyledDiv>
          <StyledTextarea
            placeholder="내용을 입력해주세요."
            ref={introduceContentRef}
            onChange={(e) => debouncedSetProject(e.target.value)}
          />
          <StyledPlusButton onClick={() => {}}>
            <ResumeInfoIcon />
            단락 추가
          </StyledPlusButton>
        </StyledSection>
        <ResumeSubheading>포트폴리오</ResumeSubheading>
        <StyledSection>
          {Array(portfolioCount)
            .fill(null)
            .map((_, index) => (
              <StyledLabel>
                <ResumeInfoIcon />
                <StyledInput
                  key={index}
                  type="url"
                  placeholder="추가 링크 주소를 입력해주세요."
                  ref={linkRef}
                  onChange={(e) => debouncedSetLink(e.target.value)}
                />
              </StyledLabel>
            ))}
          <StyledPlusButton onClick={handlePlusPortfolio}>
            <ResumeInfoIcon />
            포트폴리오 추가 (링크)
          </StyledPlusButton>
        </StyledSection>
        <ButtonArea>
          <Button type="button" onClick={handleTemporary}>
            임시저장
          </Button>
          <Button type="submit">저장</Button>
          <Button type="button" onClick={handleReset}>
            취소
          </Button>
        </ButtonArea>
      </StyledFormArea>
    </>
  );
}

export default ResumeNewPage;

const StyledFormArea = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin: 5% 0;
  padding: 5%;
  border: 3px solid gray;
  border-radius: 1.25rem;
  background: #efeee9;
  font-size: 1.5rem;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 1.25rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    font-size: 0.875rem;
  }
`;

const ProfileSection = styled.section`
  margin-left: 1.25rem;
  h3 {
    margin: 1.25rem 0;
    font-size: 2.25rem;
    font-weight: 600;

    @media ${(props) => props.theme.device.tablet} {
      font-size: 2rem;
    }
    @media ${(props) => props.theme.device.mobile} {
      font-size: 1.375rem;
    }
  }
`;

const StyledSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1.25rem;
  border: 3px solid #444;
  border-radius: 0.625rem;

  @media ${(props) => props.theme.device.tablet} {
    padding: 1.25rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    padding: 0.625rem;
  }

  span {
    font-weight: 600;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  @media ${(props) => props.theme.device.tablet} {
    width: auto;
  }
  @media ${(props) => props.theme.device.mobile} {
    width: auto;
  }

  label {
    width: 8.125rem;
    cursor: pointer;
  }
`;

const StyledPersonalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  width: auto;
  margin-left: 0.625rem;
`;

const StyledLabel = styled.label`
  display: flex;
  gap: 0.625rem;
  align-items: center;
  max-width: 50rem;
  cursor: pointer;

  @media ${(props) => props.theme.device.tablet} {
    width: auto;
  }
  @media ${(props) => props.theme.device.mobile} {
    width: auto;
  }
`;

const StyledInput = styled.input`
  padding: 0.3125rem 0.9375rem;
  border: 1px solid #999;
  border-radius: 0.3125rem;
  background: white;
  outline: none;

  &:focus {
    animation: round 1s forwards;
  }

  @keyframes round {
    from {
      border-radius: 0.3125rem;
    }
    to {
      border-radius: 1.875rem;
    }
  }
`;

const StyledTitleInput = styled(StyledInput)`
  font-weight: bold;
`;

const StyledInfoInput = styled(StyledInput)`
  max-width: 50rem;
  font-weight: 500;
`;

const StyledPersonalInput = styled(StyledInput)`
  width: 100%;
`;

const StyledPlusButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.3125rem;
  width: fit-content;
  padding: 0.3125rem 0.9375rem;
  border: none;
  border-radius: 0.625rem;
  box-shadow: 3px 3px 2px 1px rgba(137, 137, 138, 0.2);
  background: white;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background-color: #111;
    color: white;
  }
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 12.5rem;
  resize: none;
  box-sizing: border-box;
  padding: 0.625rem;
  margin-top: 0.3125rem;
  border: 1px solid black;
  border-radius: 0.3125rem;
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
  font-weight: 500;

  &:hover {
    background-color: #111;
    color: white;
    font-weight: 600;
  }
`;
