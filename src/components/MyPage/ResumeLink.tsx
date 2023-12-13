// import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ArrowClickLink from '@assets/common/arrow-clickLink.svg';
import useDataStore from '@store/useDataStore';
import getUserName from '@utils/getUserName';
import styled from 'styled-components';

function ResumeLink() {
  const {user} = useDataStore();

  return (
    <FlexBox>
      <Link to={`/mypage/${getUserName(user?.email)}/resume`}>
        <img src={ArrowClickLink} />
      </Link>
      <Heading>이력서</Heading>
    </FlexBox>
  );
}

export default ResumeLink;

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 20%;
  min-width: 18.75rem;
  margin: 3.125rem 0;
  padding: 0 3.125rem;
  border-left: 0.15rem solid var(--bs-black-400);
`;

const Heading = styled.h2`
  font-size: 4.5rem;
  font-weight: 700;
`;
