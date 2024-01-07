import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import JobHeaderCreateButton from '@components/JobPage/JobHeaderCreateButton';

const DefaultMenu = [
  { path: '/job', children: '취업' },
  { path: '/job/interview', children: '면접' },
  { path: '/job/codingTest', children: '코딩 테스트' },
];

function JobHeaderItem() {
  const { pathname } = useLocation();
  const isInterviewOrCoding =
    pathname === '/job/interview' || pathname === '/job/codingTest';
  return (
    <StyledMenuSection>
      <StyledMenuOuter>
        {DefaultMenu.map((item, index) => (
          <StyledLinkContainer
            to={item.path}
            key={index}
            $isActive={pathname === item.path}
          >
            <div>{item.children}</div>
          </StyledLinkContainer>
        ))}
      </StyledMenuOuter>
      {isInterviewOrCoding && (
        <JobHeaderCreateButton title="생성하기" type="button" />
      )}
    </StyledMenuSection>
  );
}

export default JobHeaderItem;

const StyledMenuSection = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`;

const StyledMenuOuter = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 1.875rem;
`;

const StyledLinkContainer = styled(Link)<{ $isActive?: boolean }>`
  text-decoration: none;
  padding: 0.125rem;
  border-bottom: ${(props) => (props.$isActive ? '5px solid black' : 'none')};
  font-size: 2rem;
  font-weight: 600;
  color: ${(props) => (props.$isActive ? 'black' : 'var(--bs-black-600)')};
  position: relative;

  @media ${(props) => props.theme.device.tablet} {
    font-size: 1.25rem;
  }

  @media ${(props) => props.theme.device.mobile} {
    font-size: 1rem;
  }

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 0.3125rem;
    bottom: -0.1875rem;
    left: 0;
    background-color: black;
    visibility: hidden;
    transform: scale(0);
    transition: all 0.3s;
  }

  ${(props) =>
    !props.$isActive &&
    `
  &:hover {
    color: black;
    transition: all 0.3s;
  }

  &:hover::after {
    visibility: visible;
    transform: scale(1);
  }
  `};
`;
