import { Outlet, useLocation } from 'react-router-dom';
import MainHeader from '@layout/MainHeader';
import Header from '@layout/Header';
import Footer from '@layout/Footer';

export default function RootLayout() {
  const { pathname } = useLocation();

  return (
    <>
      {pathname !== '/' && (pathname === '/main' ? <MainHeader /> : <Header />)}
      <Outlet />
      {pathname !== '/' && <Footer />}
    </>
  );
}
