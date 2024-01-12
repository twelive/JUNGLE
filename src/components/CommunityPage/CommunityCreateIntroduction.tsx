import React from 'react';
import styled from 'styled-components';

interface CommunityCreateIntroductionProps {
  title: string;
  contents: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setContents: React.Dispatch<React.SetStateAction<string>>;
}

const CommunityCreateIntroduction: React.FC<CommunityCreateIntroductionProps> = ({
    title,
    contents,
    setTitle,
    setContents
}) => {
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContents(e.target.value);
    };
    
  return (
    <div>
      <StyledLibox>
        <StyledLabel>제목</StyledLabel>
        <StyledInput
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="JUNGLE을 이용해 주셔서 감사합니다. 제목을 입력해 주세요."
        />
      </StyledLibox>
      <StyledLibox>
        <StyledLabel>내용</StyledLabel>
        <Styledtextarea
          value={contents}
          onChange={handleContentChange}
          placeholder="JUNGLE을 이용해 주셔서 감사합니다. 모집 내용을 입력해 주세요."
        />
      </StyledLibox>
    </div>
  );
};

export default CommunityCreateIntroduction;
const StyledInput = styled.input`
  width: 100%;
  height: 1.875rem;
  font-size: 1.375rem;
`;

const StyledLibox = styled.li`
  width: 80%;
  height: 40%;
  padding-bottom: 1.25rem;
  padding-right: 10%;
`;
const StyledLabel = styled.label`
  display: block;
  padding-bottom: 0.625rem;
  padding-top: 0.625rem;
`;

const Styledtextarea = styled.textarea`
  width: 100%;
  height: 100px;
  font-size: 1.25rem;
`;