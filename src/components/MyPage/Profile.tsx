import styled from 'styled-components';

function Profile({ children = 'J' }) {
  return (
    <>
      <Circle>
        <Level>{children}</Level>
      </Circle>
    </>
  );
}

export default Profile;

const Circle = styled.div`
  position: relative;
  min-width: 19.375rem;
  min-height: 19.375rem;
  border-radius: 50%;
  background: var(--bs-black-300);

  @media ${(props) => props.theme.device.tablet} {
    min-width: 16.25rem;
    min-height: 16.25rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    /* align-self: baseline; */
    min-width: 7.5rem;
    min-height: 7.5rem;
  }
`;

const Level = styled.span`
  position: absolute;
  display: block;
  color: white;
  font-size: 12.5rem;
  font-weight: 700;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media ${(props) => props.theme.device.tablet} {
    
  }
  @media ${(props) => props.theme.device.mobile} {
    font-size: 5rem;
  }
`;
