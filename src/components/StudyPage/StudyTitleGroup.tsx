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
<StudyButtonGroup>
<StudyTitleWrapper>

  <StudyTitle>
    {studyTitle}
  </StudyTitle>
  <TagTitle>
    {tagTitle}
  </TagTitle>

  </StudyTitleWrapper>
  <ContentWrapper>
    <StudyMobileWrapper>
  <StudyMobile>
  {studymobiletitle}


</StudyMobile>
  <TagButtonGroup>
{children2}
  </TagButtonGroup>
  </StudyMobileWrapper>
  <ContentContainer>
{children}
  </ContentContainer>
  
  </ContentWrapper>
</StudyButtonGroup>
);

}

export default StudyTitleGroup

const StudyTitleWrapper = styled.div`

border-right: 0.0625rem solid var(--bs-black-500);


display: flex;
flex-direction: column;
justify-content: space-between;
width: 17.5rem;
padding-right: 3.125rem;
@media ${(props) => props.theme.device.tablet}    
{


}

`;

const StudyButtonGroup = styled.div `

display: flex;
flex-direction: row;
vertical-align: middle;
width: 100%;


@media ${(props) => props.theme.device.mobile} {

}



@media ${(props) => props.theme.device.mobile} {
display: block;
& > ${StudyTitleWrapper} {
display: none;
}}

`;

const TagButtonGroup = styled(StudyButtonGroup)`
border: none;
margin-left: 1.25rem;
@media ${(props) => props.theme.device.mobile} {
margin-left: 0rem;

}

`;

const StudyTitle = styled.p`
padding-top: 0.625rem;
font-size: 2.8125rem;
font-weight: 700;
width: 12.5rem;
@media ${(props) => props.theme.device.mobile} {

}
`; 

const TagTitle = styled.p`
font-size: 1.875rem;
font-weight: 600;
padding: 0.9375rem;
text-align: end;

`;

const ContentWrapper = styled.div `


@media ${(props) => props.theme.device.mobile} {
    
    
  }

`;

const ContentContainer = styled.div`
height: 30vh;

display: grid;


@media ${(props) => props.theme.device.mobile} {


}

`;

const StudyMobile = styled.p `
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

const StudyMobileWrapper = styled.div `
display: flex;   
flex-direction: column;
gap: 0.625rem;
`;  

