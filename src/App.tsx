import { Suspense, useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from 'styled-components';

import { supabase } from '@/client';
import { Session } from '@supabase/supabase-js';
import router from '@/routes';
import theme from '@/theme';
import GlobalStyles from '@/GlobalStyles';
import Loading from '@components/Loading';
import LandingPage from '@pages/LandingPage/LandingPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

function App() {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);

    });
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        {!session ? (
          <LandingPage />
        ) : (
          <>
            <QueryClientProvider client={queryClient}>
              <HelmetProvider>
                <Suspense fallback={<Loading />}>
                  <RouterProvider router={router} />
                  <GlobalStyles />
                </Suspense>
              </HelmetProvider>
              <ReactQueryDevtools initialIsOpen={false} />
              </QueryClientProvider>
                            
<ToastContainer
        position="top-center"
        limit={1}
        closeButton={false}
        autoClose={2000}
        hideProgressBar
      />
          </>
        )}
      </ThemeProvider>
    </>
  );
}

export default App;
