// import router from '@/routes';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import router from '@/routes';
import GlobalStyles from '@/GlobalStyles';
import LandingPage from './pages/LandingPage';
import { useAuthStore } from './store/useAuthStore';

function App() {
  const isAuth = useAuthStore((state) => state.isAuth);
  
  return (
    <>
    {!isAuth && <>
    
      <LandingPage />
    </>}
      {isAuth &&
      <>
      
      <HelmetProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </HelmetProvider>
      <ToastContainer />
      </>
      }
      <GlobalStyles />
    </>
  );
}

export default App;
