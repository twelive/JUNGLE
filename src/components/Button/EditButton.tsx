import styled from 'styled-components';
import edit from '@assets/common/edit.svg';

interface State {
  position0?: boolean;
  onClick: () => void;
}

function EditButton({ position0 = false, onClick }: State) {
  return (
    <StyledButton type="button" onClick={onClick} $position0={position0}>
      <img src={edit} alt="수정" />
    </StyledButton>
  );
}

export default EditButton;

const StyledButton = styled.button<{ $position0: boolean }>`
  position: absolute;
  top: ${(props) => (props.$position0 ? 0 : '9%')};
  left: ${(props) => (props.$position0 ? '100%' : '75%')};
  width: 2.5rem;
  height: 2.5rem;
  background: white;
  border-radius: 3.125rem;
  border: 4px solid black;
  cursor: pointer;
  transform: translate(-50%, -50%);

  @media ${(props) => props.theme.device.mobile} {
    width: 2.375rem;
    height: 2.375rem;
  }
`;
