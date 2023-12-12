import React from "react";
import styled from "styled-components"



interface TagButtonProps {
  studyTitle: string;
  children: React.ReactNode;
}


function StudyTitleGroup ({studyTitle,
children}:TagButtonProps){

  return (
    <StudyButtonGroup>
      <StudyTitleWrapper>

      <StudyTitle>
        {studyTitle}
      </StudyTitle>

      </StudyTitleWrapper>
      <TagButtonGroup>
    {children}
      </TagButtonGroup>
      
    </StudyButtonGroup>


  );

}

export default StudyTitleGroup


const StudyButtonGroup = styled.div `
width: 100%;
display: flex;
flex-direction: row;
vertical-align: middle;
align-items: center;
text-align: center;
gap: 5px;
`;


const TagButtonGroup = styled(StudyButtonGroup)`


`;

const StudyTitle = styled.p`

`;

const StudyTitleWrapper = styled.div`
  width: 50px;

`;