

import { CommunityProject } from '@/types/CommunityProject';
import { CommunityStudy } from '@/types/CommunityStudy';
import { Users } from '@/types/Users';
import { useQuery } from 'react-query';
import { supabase } from '@/client';

export const useGetProjects = () => {
  return useQuery('projects', async () => {
    const { data } = await supabase
      .from('community_project')
      .select('*')
      .order('created_at', { ascending: false })
      .returns<CommunityProject[] | null>();
    return data;
  });
};

export const useGetStudys = () => {
  return useQuery('study', async () => {
    const { data } = await supabase
      .from('community_study')
      .select('*')
      .order('created_at', { ascending: false })
      .returns<CommunityStudy[] | null>();
    return data;
  });
};

export const useGetUsers = () => {
  return useQuery('users', async () => {
    const { data } = await supabase
      .from('users')
      .select('id, email, community_project:community_project (id, title)')
      .order('created_at', { ascending: false })
      .returns<Users[] | null>();
    return data;
  });
};

// export const useGetUserEmail = () => {
//   const { data: users } = useGetUsers();

//   const getUserEmail = (userId:string) => {
//     const foundUser = users?.find((user) => user.id === userId);
//     return foundUser?.email || 'Unknown';
//   };

//   return getUserEmail;
// };
