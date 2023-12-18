import styled from "styled-components";

interface TagButtonComponentProps {
  title: string;
  key?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  $isActive?: boolean;
  children?: React.ReactNode;
}



function TagButtonComponent({

  $isActive,
  title,
  type = 'button',
  onClick,
  children,
}:TagButtonComponentProps ) {
  return (
   
     


      <TagButton $isActive={$isActive} onClick={onClick} type={type}>
        {title}
        {children}
      </TagButton>

     
   
   
 
    )



}

export default TagButtonComponent

const TagButton = styled.button<{ $isActive?: boolean }> `
  ${props => props.$isActive ? 'background-color: white; font-weight: 700; box-shadow: 3px 3px 2px 1px rgba(137, 137, 138, 0.2); ' : 'background-color: black; color: white;'}
  border: none;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 10px;
  margin: 5px;
  border: 0.5px solid var(--bs-black-500);
  box-sizing: border-box;
  @media ${(props) => props.theme.device.mobile} { 
    font-size: 0.5rem;
    padding-left: 3%;
  padding-right: 3%;
  padding-top: 1%;
  padding-bottom: 1%;
  }
`;




