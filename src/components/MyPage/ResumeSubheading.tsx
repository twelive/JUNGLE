import styled from 'styled-components';
import activity from '@assets/mypage/resume-activity.svg';
import me from '@assets/mypage/resume-me.svg';
import personalStatement from '@assets/mypage/resume-personalStatement.svg';
import portfolio from '@assets/mypage/resume-portfolio.svg';
import project from '@assets/mypage/resume-project.svg';
import stack from '@assets/mypage/resume-stack.svg';

interface PropType {
  essential?: boolean;
  children: React.ReactNode;
}

function ResumeSubheading({ essential = false, children }: PropType) {
  let imgSrc = '';
  if (children == '기본 정보') imgSrc = me;
  else if (children == '기술 스택') imgSrc = stack;
  else if (children == '경험/교육/활동') imgSrc = activity;
  else if (children == '프로젝트') imgSrc = project;
  else if (children == '자기소개') imgSrc = personalStatement;
  else imgSrc = portfolio;

  return (
    <StyledFlexBox>
      <img src={imgSrc} />
      <StyledHeading $essential={essential}>{children}</StyledHeading>
    </StyledFlexBox>
  );
}

export default ResumeSubheading;

const StyledFlexBox = styled.div`
  display: flex;
  gap: 0.3125rem;
  align-items: center;

  img {
    width: 2.25rem;

    @media ${(props) => props.theme.device.tablet} {
      width: 2rem;
    }
    @media ${(props) => props.theme.device.mobile} {
      width: 1.375rem;
    }
  }
`;

const StyledHeading = styled.h3<{ $essential?: boolean }>`
  font-size: 2.25rem;
  font-weight: 600;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 2rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    font-size: 1.375rem;
  }

  ${(props) =>
    props.$essential &&
    `
    &::after {
      content: '*';
      margin-left: 0.25rem;
      color: #f03636;
    }
  `}
`;
