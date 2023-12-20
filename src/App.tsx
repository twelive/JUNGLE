import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from 'styled-components';
import router from '@/routes';
import theme from '@/theme';
import GlobalStyles from '@/GlobalStyles';
import Loading from '@components/Loading';
import LandingPage from '@pages/LandingPage';
import { useAuthStore } from '@store/useAuthStore';

const queryClient = new QueryClient();

function App() {
  const isAuth = useAuthStore((state) => state.isAuth);

  return (
    <>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          {!isAuth && (
            <>
              <LandingPage />
            </>
          )}
          {isAuth && (
            <>
              <HelmetProvider>
                <Suspense fallback={<Loading />}>
                  <RouterProvider router={router} />
                  <GlobalStyles />
                </Suspense>
              </HelmetProvider>
            </>
          )}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
