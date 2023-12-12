import styled from "styled-components";

interface TagButtonComponentProps {
  title: string;
  key?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  active?: boolean;
  children?: React.ReactNode;
}



function TagButtonComponent({
  key,
  active,
  title,
  type = 'button',
  onClick,
  children,
}:TagButtonComponentProps ) {
  return (
    <TagButton key={key} active={active} onClick={onClick} type={type}>
      {title}
      {children}
    </TagButton>
  )

}

export default TagButtonComponent

const TagButton = styled.button<{ active?: boolean }> `
${props => props.active ? '' : ''}

`;