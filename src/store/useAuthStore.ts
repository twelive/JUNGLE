// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { create } from 'zustand';
import { supabase } from '@/client';
import { Session } from '@supabase/supabase-js';

type State = {
  isAuth: boolean;
  user: string;
  token: string;
  userEmail: string;
  handleLogin: () => Promise<void>;
  handleLogout: () => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  register : (session :Session | null) => Promise<void>
};

const initialAuthState = {
  isAuth: false,
  user: '',
  token: '',
  userEmail: '',
  userName: '',
};
// export function MyComponent() {
//   const navigate = useNavigate();
//   const { isAuth } = useAuthStore();

//   useEffect(() => {
//      console.log('isAuth state:', isAuth);
//   if (isAuth) {
//     console.log('Redirecting to /main');
//     navigate('/main');
//   }
// }, [isAuth, navigate]);


//   // useEffect(() => {
//   //   if (isAuth) {
//   //     navigate('/main');
//   //   }
//   // }, [isAuth, navigate]);
// }

export const useAuthStore = create<State>((set) => {
  const getURL = () => {
    let url =
      import.meta.env.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
      import.meta.env.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
      'http://localhost:3000/'
    // Make sure to include `https://` when not localhost.
    url = url.includes('http') ? url : `https://${url}`
    // Make sure to include a trailing `/`.
    url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
    return url
  }
  
    const handleLogin: State['handleLogin'] = async () => {
    const {data,  error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options : {redirectTo: getURL(),} 
    });
     
    if (error) {
      console.error('Error during sign in: ', error);
      return;
      }
    if (data)  {
      console.log('성공')
      
    }
  };
  
  
  const register: State['register'] = async (session: Session | null): Promise<void> => {
    set((prevState) => {
      console.log(session);
          return ({ ...prevState, isAuth: true, token: session!.access_token, user: session!.user.id, userEmail: session!.user.email })
        });  
  }
  const handleLogout: State['handleLogout'] = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Error during sign out: ', error);
    } else {
      console.log('Signed out successfully');
      set((prevState) => ({ ...prevState, isAuth: false }));
    }
  };

  const deleteUser: State['deleteUser'] = async (id: string) => {
    if (id) {
      const { data, error } = await supabase.auth.admin.deleteUser(id);

      if (error) {
        console.error('Error deleting user: ', error);
      } else {
        console.log('User deleted successfully: ', data);
        set((prevState) => ({ ...prevState, isAuth: false }));
      }
    } else {
      console.error('No user id provided');
    }
  };

    supabase.auth.onAuthStateChange((_event, session) => {
    console.log(`Supabase auth event: ${_event}`);

    if (_event === 'SIGNED_IN' && session) {
      set({ isAuth: true, token: session.access_token, user: session.user.id, userEmail: session.user.email });
    } else if (_event === 'SIGNED_OUT') {
      set({ ...initialAuthState });
    }
  });


  

  return {
    ...initialAuthState,
    handleLogin,
    handleLogout,
    deleteUser,
    register,
  };
});

