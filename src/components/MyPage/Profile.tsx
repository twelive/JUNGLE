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
  min-width: 18.75rem;
  min-height: 18.75rem;
  border-radius: 50%;
  background: var(--bs-black-300);
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
`;
