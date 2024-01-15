import styled from 'styled-components';

function ProjectExplanation({
  src = '#',
  projectName = '프로젝트명',
  planningDate = '기획기간',
  developingDate = '개발기간',
  review = '소감(회고)',
  plus = '추후 구현하고 싶은 기능',
}) {
  return (
    <Layout>
      <ProjectImg src={src} />
      <div>
        <ProjectName>{projectName}</ProjectName>
        <Content>
          <dt>기획 기간</dt>
          <dd>{planningDate}</dd>
        </Content>
        <Content>
          <dt>개발 기간</dt>
          <dd>{developingDate}</dd>
        </Content>
        <Content>
          <dt>소개</dt>
          <dd>{review}</dd>
        </Content>
        <Content>
          <dt>추후 계획</dt>
          <dd>{plus}</dd>
        </Content>
      </div>
    </Layout>
  );
}

export default ProjectExplanation;

const Layout = styled.div`
  display: flex;
  gap: 1.875rem;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 3.125rem 0;
  border-bottom: 2.4px solid var(--bs-black-400);

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
  margin-bottom: auto;
  object-fit: cover;
  border-radius: 15px;

  @media ${(props) => props.theme.device.tablet} {
    max-width: 12.5rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    max-width: 9.375rem;
  }
`;

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
`;

const Content = styled.dl`
  margin: 1rem 0;
  font-size: 2rem;

  dt {
    font-weight: 600;
  }

  dd {
    margin: 0.25rem 0 0.625rem 0.625rem;
  }

  @media ${(props) => props.theme.device.tablet} {
    font-size: 1.75rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    font-size: 1rem;
  }
`;
