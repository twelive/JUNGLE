import styled from 'styled-components';

interface WritingCategoryTagProps {
  key?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  $isActive?: boolean;
  children?: React.ReactNode;
}

function WritingCategoryTag({
  $isActive,
  type = 'button',
  onClick,
  children,
}: WritingCategoryTagProps) {
  return (
    <StyledTagButton $isActive={$isActive} onClick={onClick} type={type}>
      {children}
    </StyledTagButton>
  );
}

export default WritingCategoryTag;

const StyledTagButton = styled.button<{ $isActive?: boolean }>`
  ${(props) =>
    props.$isActive
      ? 'background-color: white; font-weight: 700; box-shadow: 0.1875rem 0.1875rem 0.125rem 0.0625rem rgba(137, 137, 138, 0.2); '
      : 'background-color: black; color: white;'}
  border: none;
  padding-left: 0.9375rem;
  padding-right: 0.9375rem;
  height: 1.25rem;
  border-radius: 0.625rem;
  margin: 0.3125rem;
  border: 0.5008px solid var(--bs-black-500);
  box-sizing: border-box;
  @media ${(props) => props.theme.device.mobile} {
    font-size: 0.5rem;
    padding-left: 3%;
    padding-right: 3%;
    padding-top: 1%;
    padding-bottom: 1%;
  }
`;
