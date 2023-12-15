import { useState } from 'react';
import styled from 'styled-components';
import CancelImg from '@components/CancelImg';
import useBookMarkStore from '@store/useBookMarkStore';

function BookMarkModal() {
  const [isHovered, setIsHovered] = useState(false);
  const { setIsBookMark } = useBookMarkStore();

  const handleClickModal = () => {
    setIsBookMark();
    document.body.style.overflow = 'auto';
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const viewportWidth = window.innerWidth;
  let scrollTop = 0;

  if (viewportWidth < 768) {
    scrollTop = 1300;
  } else if (viewportWidth < 1010) {
    scrollTop = 900;
  } else {
    scrollTop = 650;
  }

  window.scrollTo({ top: scrollTop, behavior: 'smooth' });



  return (
  <>
    <Dimmed onClick={handleClickModal} />
    <Modal>
      <h2>북마크 목록</h2>
      <CancelButton onClick={handleClickModal} onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
        <CancelImg fill={isHovered ? 'black' : '#666'} />
      </CancelButton>
      {/* map 메서드를 통해 정보를 불러올 예정입니다. */}
    </Modal>
  </>
  )
}

export default BookMarkModal;

const Dimmed = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: black;
z-index: 1;
opacity: 0.8;
`

const Modal = styled.div`
  /* 중앙 정렬 */
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* Style CSS */
  box-sizing: border-box;
  width: 80%;
  height: 40%;
  padding: 3.125rem;
  border: 0.5rem solid var(--bs-black-600);
  border-radius: 3.125rem;
  background-color: var(--main-bgColor);
  z-index: 2;
  opacity: 1;
  /* Scroll */
  overflow-y: auto;

  @media ${(props) => props.theme.device.tablet} {
      width: 100%;
      height: 30%;
      padding: 2.5rem;
    }

    @media ${(props) => props.theme.device.mobile} {
      width: 100%;
      height: 27%;
      padding: 1.875rem;
    }

  h2 {
    width: 100%;
  text-align: center;
  color: var(--bs-black-300);

  @media ${(props) => props.theme.device.tablet} {
      font-size: 2.375rem;
    }

    @media ${(props) => props.theme.device.mobile} {
      font-size: 1.5rem;
    }
  }
`;

const CancelButton = styled.button`
  /* Reset CSS */
  border: none;
  background-color: transparent;
  /* Style CSS */
  cursor: pointer;

  /* 정렬 */
  svg {
    position: absolute;
    top: 4.5625rem;
    right: 1.875rem;
    transform: translate(-50%, -50%);

    @media ${(props) => props.theme.device.tablet} {
      top: 3.5rem;
    }

    @media ${(props) => props.theme.device.mobile} {
      top: 2.75rem;
      right: -0.625rem;
    }
  }
`