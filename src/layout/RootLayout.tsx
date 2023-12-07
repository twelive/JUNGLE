import { Outlet, useLocation } from 'react-router-dom';
import Header from '@layout/Header';
import Footer from '@layout/Footer';

export default function RootLayout() {
  const { pathname } = useLocation();

  return (
    <>
      {pathname !== '/' && <Header />}
      <Outlet />
      {pathname !== '/' && <Footer />}
    </>
  );
}
