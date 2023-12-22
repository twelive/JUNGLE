import { Suspense, useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from 'styled-components';
import router from '@/routes';
import theme from '@/theme';
import GlobalStyles from '@/GlobalStyles';
import LandingPage from '@pages/LandingPage/LandingPage';

import Loading from '@components/Loading';
import { supabase } from './client';

import { Session } from '@supabase/supabase-js';
const queryClient = new QueryClient();

function App() {

const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });


    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log("변경");
    })
    
  }, []);




  return (
 
    <>
          {!session ? (
            
              <LandingPage />
            
          ) : (
              <>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
              <HelmetProvider>
                <Suspense fallback={<Loading />}>
                  <RouterProvider router={router} />
                  <GlobalStyles />
                </Suspense>
              </HelmetProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
            </>
              
          )}
          
            </>

          
  );
}

export default App;
