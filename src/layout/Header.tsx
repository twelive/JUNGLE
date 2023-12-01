import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

function Header() {
  return (
    <header>
      <StyledNav>
        <NavLink to="/">MainPage</NavLink>
        <NavLink to="/job">JobPage</NavLink>
        <NavLink to="/study">StudyPage</NavLink>
        <NavLink to="/mypage">MyPage</NavLink>
        <NavLink to="/community">CommunityPage</NavLink>
        <NavLink to="/introduction">IntroductionPage</NavLink>
      </StyledNav>
    </header>
  );
}

export default Header;

const StyledNav = styled.nav`
  display: flex;
  gap: 1rem;
`;
