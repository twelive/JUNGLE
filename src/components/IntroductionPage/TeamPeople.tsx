import styled from "styled-components"

function TeamPeople({src = '#', name = '조원소개', introduction= '조원소개글'}) {
  return (
    <Member>
      <MemberImg src={src} />
      <MemberName>{name}</MemberName>
      <MemberIntroduction>{introduction}</MemberIntroduction>
    </Member>
  )
}

export default TeamPeople

const Member = styled.li`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  
  @media ${(props) => props.theme.device.laptop} {
    width: 20%;
  }
  @media ${(props) => props.theme.device.tablet} {
    min-height: 22.625rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    min-height: 15.375rem;
  }
`

const MemberImg = styled.img`
  width: 100%;
  object-fit: contain;

  @media ${(props) => props.theme.device.tablet} {     
    width: 80%;
  }
  @media ${(props) => props.theme.device.mobile} {
    width: 80%;
  }
`;

const MemberName = styled.strong`
  padding: 0.6875rem 1.125rem;
  border-radius: 1.875rem;
  border: 0.0625rem solid var(--bs-black-200);
  color: var(--bs-black-200);
  text-align: center;
  font-size: 2rem;
  font-weight: bold;

  @media ${(props) => props.theme.device.tablet} {     
    font-size: 1.75rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    font-size: 1rem;
  }
`;

const MemberIntroduction = styled.p`
  margin-top: 1.875rem;
  color: var(--bs-black-200);
  text-align: center;
  font-size: 2rem;
  white-space: pre-wrap;

  @media ${(props) => props.theme.device.tablet} {    
    font-size: 1.75rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    margin-top: 0.625rem;
    font-size: 1rem;
  }
`