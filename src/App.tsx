// import router from '@/routes';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import router from '@/routes';
import GlobalStyles from '@/GlobalStyles';

function App() {
  return (
    <>
      <HelmetProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router} />
        </Suspense>
        <GlobalStyles />
      </HelmetProvider>
      <ToastContainer />
    </>
  );
}

export default App;
