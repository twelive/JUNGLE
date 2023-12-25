import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthStore } from '@store/useAuthStore';
import getUserName from '@utils/getUserName';
import ArrowClickLink from '@assets/common/arrow-clickLink.svg';

function ResumeLink() {
  const {userEmail} = useAuthStore();

  return (
    <FlexBox>
      <h2>이력서</h2>
      <Link to={`/mypage/${getUserName(userEmail)}/resume`}>
        <img src={ArrowClickLink} />
      </Link>
    </FlexBox>
  );
}

export default ResumeLink;

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 20%;
  margin: 3.125rem 0;
  margin-left: auto;
  padding-left: 1.875rem;
  border-left: 0.15rem solid var(--bs-black-400);

  h2 {
    min-width: 7.8125rem;
  }

  a {
    align-self: end;
  }

  @media ${(props) => props.theme.device.tablet} {
    flex-direction: row;
    align-items: end;
    width: 100%;
    margin: 0;
    padding: 2.5rem 0;
    border-top: 0.15rem solid var(--bs-black-400);
    border-left: none;
  }

  @media ${(props) => props.theme.device.mobile} {
    flex-direction: row;
    align-items: end;
    width: 100%;
    margin: 0;
    padding: 1.875rem 0;
    border-top: 0.15rem solid var(--bs-black-400);
    border-left: none;
  }
`;