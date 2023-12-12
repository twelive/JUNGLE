import { Outlet, useLocation } from 'react-router-dom';
import MainHeader from '@layout/MainHeader';
import Header from '@layout/Header';
import Footer from '@layout/Footer';
import getPathName from '@utils/getPathName';

export default function RootLayout() {
  const { pathname } = useLocation();

  return (
    <>
      {pathname !== '/' && (pathname === '/main' ? <MainHeader /> : <Header isMenu={getPathName(pathname, 14) === '/mypage/resume' ? false : true } />)}
      <Outlet />
      {pathname !== '/' && <Footer />}
    </>
  );
}
