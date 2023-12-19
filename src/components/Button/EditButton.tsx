import edit from '@assets/common/edit.svg'
import styled from 'styled-components';

function EditButton() {
  return (
    <Button type='button'>
      <img src={edit} alt="수정" />
    </Button>
  )
}

export default EditButton;

const Button = styled.button`
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
`