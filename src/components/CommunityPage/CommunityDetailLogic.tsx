import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import  useDataStore  from '@store/useDataStore';
import  useStorageStore from '@store/useStorageStore';
import { useAuthStore } from '@store/useAuthStore';
import { supabase } from '@/client';


type Item = {
  contents: string;
  created_at: string;
  deadline: string | null;
  id: string | number;
  people: string | null;
  primary_key: string;
  progress: string | null;
  tag1: string | null;
  tag2: string | null;
  tag3: string | null;
  title: string;
  user_id: string | null;
};

const fetchItemData = async (
  itemId: string,
  dataType: string
): Promise<Item> => {
  const targetTable = dataType.includes('project')
    ? 'community_project'
    : 'community_study';
  const { data, error } = await supabase
    .from(targetTable)
    .select('*')
    .eq('id', itemId)
    .single();

  if (error) {
    throw new Error('데이터를 불러오는 중 오류가 발생했습니다.');
  }

  if (!data) {
    throw new Error('데이터를 찾을 수 없습니다.');
  }

  return {
    id: data.id,
    user_id: data.user_id || '',
    contents: data.contents,
    created_at: data.created_at,
    deadline: data.deadline,
    people: data.people,
    primary_key: data.primary_key,
    progress: data.progress,
    tag1: data.tag1,  
    tag2: data.tag2, 
    tag3: data.tag3,
    title: data.title,
  };
};

const CommunityDetailLogic = () => {
  const { dataType, itemId } = useParams();
  const { data, getIdData } = useDataStore();
  const { getAllList } = useStorageStore(); 
  const currentDataType = dataType || '';
  const user: string | undefined = useAuthStore((state) => state.user);
  const [isAuthor, setIsAuthor] = useState<boolean>(false);

  const {
    data: item,
    isLoading,
    isError,
  } = useQuery<Item>(
    ['item', itemId || '', currentDataType],
    () => fetchItemData(itemId || '', currentDataType),
    {
      enabled: !!itemId,
    }
  );

  useEffect(() => {
    if (!isLoading && !isError && item && user && item.user_id === user) {
      setIsAuthor(true);
    } else {
      setIsAuthor(false);
    }
  }, [isLoading, isError, item, user]);

  const handleUpdate = async (dataType: string, itemId: string) => {
    try {
      await updateData(dataType, itemId);
    } catch (error) {
      console.error('데이터를 업데이트하는 도중 오류가 발생했습니다:', error);
      alert('데이터를 업데이트하는 도중 오류가 발생했습니다.');
    }
  };

  const handleDelete = async (dataType: string, itemId: string) => {
    try {
      await deleteData(dataType, itemId);
    } catch (error) {
      console.error('데이터를 삭제하는 도중 오류가 발생했습니다:', error);
      alert('데이터를 삭제하는 도중 오류가 발생했습니다.');
    }
  };

  const updateData = async (dataType: string, itemId: string) => {
    if (dataType === 'project') {
      const updatedProjectData = {
        title: 'New Title',
        description: 'New Description',
      };
      await supabase
        .from('community_project')
        .update(updatedProjectData)
        .eq('id', itemId);
    } else if (dataType === 'study') {
      const updatedStudyData = {
        title: 'New Study Title',
        details: 'New Study Details',
      };
      await supabase
        .from('community_study')
        .update(updatedStudyData)
        .eq('id', itemId);
    }
  };

  const deleteData = async (dataType: string, itemId: string) => {
    if (dataType === 'project') {
      const { data, error } = await supabase
        .from('community_project')
        .delete()
        .eq('id', itemId);

      if (error) {
        console.error('Error deleting project data:', error);
      } else {
        console.log('Project data deleted:', data);
      }
    } else if (dataType === 'study') {
      const { data, error } = await supabase
        .from('community_study')
        .delete()
        .eq('id', itemId);

      if (error) {
        console.error('Error deleting study data:', error);
      } else {
        console.log('Study data deleted:', data);
      }
    }
  };
  useEffect(() => {
    getIdData(`community_${dataType}`, `${itemId}`);
    getAllList('community_img', '');
  }, [getIdData, getAllList]);

  return {
    data,
    isAuthor,
    handleUpdate,
    handleDelete,
    currentDataType,
  };
};

export default CommunityDetailLogic;
