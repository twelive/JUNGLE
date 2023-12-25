import styled from 'styled-components';

interface CreateButtonProps {
  onClick: () => void;
}

function CreateButton({ onClick }: CreateButtonProps) {
  return (
    <div>
      <StyleButton type="button" onClick={onClick}>
        출간하기
      </StyleButton>
    </div>
  );
}

export default CreateButton;

const StyleButton = styled.button<{ $isActive?: boolean }>`
  ${(props) =>
    props.$isActive
      ? 'background-color: white; font-weight: 700; box-shadow: 3px 3px 2px 1px rgba(137, 137, 138, 0.2); '
      : 'background-color: black; color: white;'}
  width :12%;
  border: none;
  padding: 15px;
  border-radius: 10px;
  margin-right: 5px;
  border: 0.5px solid var(--bs-black-500);
  box-sizing: border-box;
  font-size: 20px;
  position: absolute;
  left: 35%;
  bottom: 5%;
  @media ${(props) => props.theme.device.tablet} {
    font-size: 15px;
    padding: 10px;
  }

  @media ${(props) => props.theme.device.mobile} {
    font-size: 10px;
    padding: 8px;
  }
`;
