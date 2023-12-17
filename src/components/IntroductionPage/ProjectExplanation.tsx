import styled from "styled-components"

function ProjectExplanation({src= '#', projectName = '프로젝트명', date = '개발기간', review = '소감(회고)', plus='추후 구현하고 싶은 기능'}) {
  return (
    <Layout>
      <ProjectImg src={src} />
      <div>
        <ProjectName>{projectName}</ProjectName>
        <Content>{date}</Content>
        <Content>{review}</Content>
        <Content>{plus}</Content>
      </div>
    </Layout>
  )
}

export default ProjectExplanation

const Layout = styled.div`
  display: flex;
  gap: 1.875rem;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 3.125rem 0;
  border-bottom: 0.15rem solid var(--bs-black-400);

  div {
    min-height: 10.1875rem;
  }

  @media ${(props) => props.theme.device.tablet} {
    padding: 2.5rem 0;
  }
  @media ${(props) => props.theme.device.mobile} {
    padding: 1.25rem 0;
    gap: 1.25rem;
  }
`;

const ProjectImg = styled.img`
  width: 40%;
  max-width: 15.625rem;
  object-fit: cover;
  border-radius: 0.9375rem;

  @media ${(props) => props.theme.device.tablet} {     
    max-width: 12.5rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    max-width: 9.375rem;
  }
`

const ProjectName = styled.h3`
  margin-bottom: 1.875rem;
  font-size: 2.5rem;
  font-weight: 600;

  @media ${(props) => props.theme.device.tablet} {     
    margin-bottom: 1.25rem;
    font-size: 2rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    margin-bottom: 0.625rem;
    font-size: 1.5rem;
  }
`

const Content = styled.p`
  font-size: 2rem;

  @media ${(props) => props.theme.device.tablet} {     
    font-size: 1.75rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    font-size: 1rem;
  }
`