import styled from 'styled-components';

function HeaderButton({
  borderWeight = '0.0625rem',
  backgroundColor = 'black',
  color = 'white',
  children = 'HeaderButton',
  onClick,
}: {
  borderWeight?: string,
  backgroundColor?: string,
  color?: string,
  children?: React.ReactNode,
  onClick?: React.MouseEventHandler<HTMLButtonElement>, 
}) {
  return (
    <StyledButton
      $borderWeight={borderWeight}
      $backgroundColor={backgroundColor}
      $color={color}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
}

export default HeaderButton;

const StyledButton = styled.button<{
  $borderWeight: string;
  $backgroundColor: string;
  $color: string;
}>`
  display: inline-flex;
  padding: 0.4375rem 1.1875rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.9375rem;
  border: ${(props) => props.$borderWeight} solid var(--bs-black-100);
  background-color: ${(props) => props.$backgroundColor};
  color: ${(props) => props.$color};
  font-size: 1.5rem;
  text-align: center;
  cursor: pointer;
`;
