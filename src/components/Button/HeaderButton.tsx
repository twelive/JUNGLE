import styled from 'styled-components';

function HeaderButton({
  borderWeight = '1px',
  backgroundColor = 'black',
  color = 'white',
  children = 'HeaderButton',
  onClick,
}: {
  borderWeight?: string;
  backgroundColor?: string;
  color?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
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
  justify-content: center;
  align-items: center;
  min-width: fit-content;
  padding: 0.25rem 1.1875rem;
  border-radius: 0.9375rem;
  border: ${(props) => props.$borderWeight} solid var(--bs-black-100);
  background-color: ${(props) => props.$backgroundColor};
  color: ${(props) => props.$color};
  font-size: 24px;
  text-align: center;
  cursor: pointer;

  @media ${(props) => props.theme.device.tablet} {
    padding: 0.25rem 1rem;
    font-size: 1.25rem;
  }
  @media ${(props) => props.theme.device.mobile} {
    padding: 0.125rem 0.75rem;
    font-size: 1rem;
  }
`;
