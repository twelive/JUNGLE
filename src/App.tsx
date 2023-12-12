import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import router from '@/routes';
import GlobalStyles from '@/GlobalStyles';
import LandingPage from '@pages/LandingPage';
import { useAuthStore } from '@store/useAuthStore';
import { ThemeProvider } from 'styled-components';
import theme from '@/theme';

function App() {
  const isAuth = useAuthStore((state) => state.isAuth);

  return (
    <>
      <ThemeProvider theme={theme}>
      {!isAuth && (
        <>
          <LandingPage />
        </>
      )}
      {isAuth && (
        <>
          <HelmetProvider>
            <Suspense fallback={<div>Loading...</div>}>
              <RouterProvider router={router} />
              <GlobalStyles />
            </Suspense>
          </HelmetProvider>
          <ToastContainer />
        </>
      )}
      </ThemeProvider>
    </>
  );
}

export default App;
