import { supabase } from '@/client';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { create } from 'zustand';

type State = {
  isAuth: boolean;
  user: string;
  token: string;
  handleLogin: () => Promise<void>;
  handleLogout: () => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
};

const initialAuthState = {
  isAuth: false,
  user: '',
  token: '',
};

export const useAuthStore = create<State>((set) => {
  const handleLogin: State['handleLogin'] = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    });

    if (error) {
      console.error('Error during sign in: ', error);
    } else {
      console.log('Signed in successfully: ', data);
      set({ isAuth: true });
    }
  };

  const handleLogout: State['handleLogout'] = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Error during sign out: ', error);
    } else {
      console.log('Signed out successfully');
      set({ isAuth: false });
    }
  };

  const deleteUser: State['deleteUser'] = async (id: string) => {
    if (id) {
      const { data, error } = await supabase.auth.admin.deleteUser(id);

      if (error) {
        console.error('Error deleting user: ', error);
      } else {
        console.log('User deleted successfully: ', data);
        set({ isAuth: false });
      }
    } else {
      console.error('No user id provided');
    }
  };

  supabase.auth.onAuthStateChange((event, session) => {
    console.log(`Supabase auth event: ${event}`);

    if (event === 'SIGNED_IN' && session) {
      set({ isAuth: true, token: session.access_token, user: session.user.id });
    } else if (event === 'SIGNED_OUT') {
      set({ ...initialAuthState });
    }
  });

  return {
    ...initialAuthState,
    handleLogin,
    handleLogout,
    deleteUser,
  };
});

export function MyComponent() {
  const navigate = useNavigate();
  const { isAuth } = useAuthStore();

  useEffect(() => {
    if (isAuth) {
      navigate('/main');
    }
  }, [isAuth, navigate]);
}
