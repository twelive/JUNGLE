import { Outlet, useLocation } from 'react-router-dom';
import MainHeader from '@layout/MainHeader';
import Header from '@layout/Header';
import Footer from '@layout/Footer';

export default function RootLayout() {
  const { pathname } = useLocation();

  return (
    <>
      {pathname !== '/' &&
        (pathname.includes('/main') ? (
          <MainHeader />
        ) : (
          <Header isMenu={pathname.includes('resume') ? false : true} />
        ))}
      <Outlet />
      {pathname !== '/' && <Footer />}
    </>
  );
}
