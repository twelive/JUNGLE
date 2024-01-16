import React from 'react';
import styled from 'styled-components';

interface CommunityCreateDetailProps {
  division: string;
  people: string;
  progress: string;
  tag1: string;
  tag2: string;
  tag3: string;
  setDivision: React.Dispatch<React.SetStateAction<string>>;
  setPeople: React.Dispatch<React.SetStateAction<string>>;
  setProgress: React.Dispatch<React.SetStateAction<string>>;
  setStack1: React.Dispatch<React.SetStateAction<string>>;
  setStack2: React.Dispatch<React.SetStateAction<string>>;
  setStack3: React.Dispatch<React.SetStateAction<string>>;
}

const CommunityCreateDetail: React.FC<CommunityCreateDetailProps> = ({
  setDivision,
  setPeople,
  setProgress,
  setStack1,
  setStack2,
  setStack3,
}) => {
  const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDivision(e.target.value);
  };

  const handlePeopleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPeople(e.target.value);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProgress(e.target.value);
  };

  const handleTag1Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStack1(e.target.value);
  };

  const handleTag2Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStack2(e.target.value);
  };

  const handleTag3Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStack3(e.target.value);
  };

  return (
      <div>
        <StyledSecondContainer>
          <StyledLiWrapper>
            <p>구분</p>
            <StyledSelectbox
              defaultValue="프로젝트/스터디"
              onChange={handleDivisionChange}
            >
              <option disabled>프로젝트/스터디</option>
              <option>프로젝트</option>
              <option>스터디</option>
            </StyledSelectbox>
          </StyledLiWrapper>
          <StyledLiWrapper>
            <p>모집인원</p>
            <StyledSelectbox defaultValue="모집인원" onChange={handlePeopleChange}>
              <option disabled>모집인원</option>
              <option>1 명</option>
              <option>2 명</option>
              <option>3 명</option>
              <option>4 명</option>
              <option>5 명</option>
              <option>인원 수 제한없음</option>
            </StyledSelectbox>
          </StyledLiWrapper>
        </StyledSecondContainer>
        <StyledThirdContainer>
          <StyledLiWrapper>
            <p>진행방식</p>
            <StyledSelectbox defaultValue="진행방식" onChange={handleProgressChange}>
              <option disabled>진행방식</option>
              <option>온라인</option>
              <option>오프라인</option>
            </StyledSelectbox>
          </StyledLiWrapper>
          <StyledLiWrapper>
            <p>사용언어</p>
            <StyledSelectbox defaultValue="사용언어" onChange={handleTag1Change}>
              <option disabled>사용언어</option>
              <option value="javascript">javascript</option>
              <option value="react">react</option>
              <option value="ts">ts</option>
              <option value="next.js">next.js</option>
              <option value="vue">vue</option>
              <option value="svelte">svelte</option>
            </StyledSelectbox>
          </StyledLiWrapper>
        </StyledThirdContainer>
        <StyledFourthContainer>
          <StyledLiWrapper>
            <p>사용언어</p>
            <StyledSelectbox defaultValue="사용언어" onChange={handleTag2Change}>
              <option disabled>사용언어</option>
              <option value="javascript">javascript</option>
              <option value="react">react</option>
              <option value="ts">ts</option>
              <option value="next.js">next.js</option>
              <option value="vue">vue</option>
              <option value="svelte">svelte</option>
            </StyledSelectbox>
          </StyledLiWrapper>
          <StyledLiWrapper>
            <p>사용언어</p>
            <StyledSelectbox defaultValue="사용언어" onChange={handleTag3Change}>
              <option disabled>사용언어</option>
              <option value="javascript">javascript</option>
              <option value="react">react</option>
              <option value="ts">ts</option>
              <option value="next.js">next.js</option>
              <option value="vue">vue</option>
              <option value="svelte">svelte</option>
            </StyledSelectbox>
          </StyledLiWrapper>
        </StyledFourthContainer>
      </div>
  );
};

export default CommunityCreateDetail;
const StyledLiWrapper = styled.li`
  width: 80%;
  height: 40%;
  padding-bottom: 1.25rem;
  padding-right: 10%;
`;

const StyledSecondContainer = styled.div`
  display: flex;
`;

const StyledThirdContainer = styled.div`
  display: flex;
`;

const StyledFourthContainer = styled.div`
  display: flex;
`;

const StyledSelectbox = styled.select`
  width: 100%;
  height: 2.5rem;
  text-align: center;
`;

