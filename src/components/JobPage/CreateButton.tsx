import styled from 'styled-components';

interface CreateButtonProps {
  onClick: () => void;
}

function CreateButton({ onClick }: CreateButtonProps) {
  return (
    <div>
      <StyledButton type="button" onClick={onClick}>
        출간하기
      </StyledButton>
    </div>
  );
}

export default CreateButton;

const StyledButton = styled.button<{ $isActive?: boolean }>`
  ${(props) =>
    props.$isActive
      ? 'background-color: white; font-weight: 700; box-shadow: 0.188rem 0.188rem 0.125rem 0.063rem rgba(137, 137, 138, 0.2); '
      : 'background-color: black; color: white;'}
  width :12%;
  border: none;
  padding: 0.938rem;
  border-radius: 0.625rem;
  margin-right: 0.313rem;
  border: 0.031rem solid var(--bs-black-500);
  box-sizing: border-box;
  font-size: 1.25rem;
  position: absolute;
  left: 35%;
  bottom: 5%;
  @media ${(props) => props.theme.device.tablet} {
    font-size: 0.938rem;
    padding: 0.625rem;
  }

  @media ${(props) => props.theme.device.mobile} {
    font-size: 0.625rem;
    padding: 0.5rem;
  }
`;
