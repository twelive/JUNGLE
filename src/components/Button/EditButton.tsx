import styled from 'styled-components';
import edit from '@assets/common/edit.svg';

interface State {
  onClick: () => void;
}

function EditButton({ onClick }: State) {
  return (
    <StyledButton type="button" onClick={onClick}>
      <img src={edit} alt="수정" />
    </StyledButton>
  );
}

export default EditButton;

const StyledButton = styled.button`
  position: absolute;
  top: 9%;
  left: 75%;
  width: 2.5rem;
  height: 2.5rem;
  background: white;
  border-radius: 3.125rem;
  border: 0.25rem solid black;
  cursor: pointer;
  transform: translate(-50%, -50%);

  @media ${(props) => props.theme.device.mobile} {
    width: 2.375rem;
    height: 2.375rem;
  }
`;
