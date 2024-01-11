import React from "react";
import styled from "styled-components"


interface TagButtonProps {
studyTitle: string;
children?: React.ReactNode;
  children2?: React.ReactNode;
  tagTitle?: string | undefined;
studymobiletitle?: string;

}

function StudyTitleGroup({ studyTitle, tagTitle, studymobiletitle,
  children, children2 }:TagButtonProps){

return (
<StyledStudyButtonContainer>
<StyledStudyTitleWrapper>

  <StyledStudyTitleBox>
    {studyTitle}
  </StyledStudyTitleBox>
  <StyledTagTitleBox>
    {tagTitle}
  </StyledTagTitleBox>

  </StyledStudyTitleWrapper>
  <div>
    <StyledStudyMobileBox>
  <StyledStudyMobileP>
  {studymobiletitle}


</StyledStudyMobileP>
  <StyledTagButtonDiv>
{children2}
  </StyledTagButtonDiv>
  </StyledStudyMobileBox>
  <StyledContentBox>
{children}
  </StyledContentBox>
  
  </div>
</StyledStudyButtonContainer>
);

}

export default StudyTitleGroup

const StyledStudyTitleWrapper = styled.div`

border-right: 1px solid var(--bs-black-500);


display: flex;
flex-direction: column;
justify-content: space-between;
width: 17.5rem;
padding-right: 3.125rem;


`;

const StyledStudyButtonContainer = styled.div `

display: flex;
flex-direction: row;
vertical-align: middle;
width: 100%;


@media ${(props) => props.theme.device.mobile} {

}



@media ${(props) => props.theme.device.mobile} {
display: block;
& > ${StyledStudyTitleWrapper} {
display: none;
}}

`;

const StyledTagButtonDiv = styled(StyledStudyButtonContainer)`
border: none;
margin-left: 1.25rem;
@media ${(props) => props.theme.device.mobile} {
margin-left: 0rem;

}

`;

const StyledStudyTitleBox = styled.p`
padding-top: 0.625rem;
font-size: 2.8125rem;
font-weight: 700;
width: 12.5rem;
@media ${(props) => props.theme.device.mobile} {

}
`; 

const StyledTagTitleBox = styled.p`
font-size: 1.875rem;
font-weight: 600;
padding: 0.9375rem;
text-align: end;

`;



const StyledContentBox = styled.div`
height: 30vh;

display: grid;



`;

const StyledStudyMobileP = styled.p `
font-size: 2.8125rem;
font-weight: 700;
white-space: nowrap;
display: none; 

@media ${(props) => props.theme.device.mobile} {
display: inline; 

flex-basis: 2.8125rem;
flex-grow: 1;
height: 0.625rem;
}

`;

const StyledStudyMobileBox = styled.div `
display: flex;   
flex-direction: column;
gap: 0.625rem;
`;  

