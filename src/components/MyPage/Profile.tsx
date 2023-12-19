import styled from 'styled-components';
import EditButton from '../Button/EditButton';

function Profile({ src, children = 'J' }: { src?: File | undefined, children?: React.ReactNode }) {
  return (
    <>
      <Circle $src={Boolean(src)}>
        {src ? <Image src={URL.createObjectURL(src)} alt="profile" /> : <Level>{children}</Level>}
        <EditButton />
      </Circle>
    </>
  );
}

export default Profile;

const Circle = styled.div<{$src: boolean}>`
  position: relative;
  min-width: 15rem;
  min-height: 15rem;
  border-radius: 50%;
  background: ${(props) => props.$src ? 'white' : 'var(--bs-black-300)'};

  @media ${(props) => props.theme.device.tablet} {
    min-width: 11.25rem;
    min-height: 11.25rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    min-width: 7.5rem;
    min-height: 7.5rem;
  }
`;

const Level = styled.span`
  position: absolute;
  display: block;
  color: white;
  font-size: 10.625rem;
  font-weight: 700;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media ${(props) => props.theme.device.tablet} {
    font-size: 8.125rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    font-size: 5rem;
  }
`;


const Image = styled.img`
  position: absolute;
  display: block;
  color: white;
  font-size: 10.625rem;
  font-weight: 700;
  top: 50%;
  left: 50%;
  width: 60%;
  transform: translate(-50%, -50%);

  @media ${(props) => props.theme.device.tablet} {
    font-size: 8.125rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    font-size: 5rem;
  }
`;