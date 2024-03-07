import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useAuthStore } from '@store/useAuthStore';
import { supabase } from '@/client';
import { useParams } from 'react-router-dom';
import {useGetUsers} from '@hooks/useDataFetching';
// Supabase Error 타입 정의
type SupabaseError = {
  message?: string;
  details?: string;
};

// PostgrestError를 Error로 변환하는 함수
const convertPostgrestError = (error: unknown): Error => {
  const postgrestError = error as SupabaseError;
  return new Error(postgrestError.message || postgrestError.details || 'An error occurred.');
};

const CommunityDetailComment = () => {
  const { data: users } = useGetUsers();
  const { dataType } = useParams();
  const [commentText, setCommentText] = useState('');
  const queryClient = useQueryClient();

 const { data: comments = [], isLoading } = useQuery(['comments', dataType], async () => {
  const targetTable = dataType === 'project' ? 'communityproject_comment' : 'communitystudy_comment';
  const { data, error } = await supabase.from(targetTable).select('*').order('created_at', { ascending: true });
  
  if (error) {
    throw convertPostgrestError(error);
  }

  return data || [];
});


 const addCommentMutation = useMutation<null, Error, { text: string; user_id: string }>(
  async (newComment) => {
    const targetTable = dataType === 'project' ? 'communityproject_comment' : 'communitystudy_comment';
    const { data, error } = await supabase.from(targetTable).insert([newComment]);
    if (error) throw convertPostgrestError(error);
    return data;
  },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['comments', dataType]);
        return Promise.resolve(null);
      },
    }
  );

 const editCommentMutation = useMutation<null, Error, { text: string }>(
  async (editedComment) => {
    const targetTable = dataType === 'project' ? 'communityproject_comment' : 'communitystudy_comment';
    const { data, error } = await supabase.from(targetTable).update(editedComment).eq('id', editingCommentId);

    if (error) throw convertPostgrestError(error);

    return data;
  },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['comments', dataType]);
        setEditingCommentId(null);
        setCommentText('');
        return Promise.resolve(null);
      },
    }
  );

  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

  const handleEditComment = async (commentId: string) => {
    try {
      const targetTable = dataType === 'project' ? 'communityproject_comment' : 'communitystudy_comment';
      const { data: commentToUpdate, error } = await supabase
        .from(targetTable)
        .select('*')
        .eq('id', commentId)
        .single();

      if (error) {
        throw convertPostgrestError(error);
      }

      if (commentToUpdate) {
        setEditingCommentId(commentId);
        setCommentText(commentToUpdate.comment_text);
      }
    } catch (error) {
      console.error('댓글 수정 에러:', (error as Error).message);
    }
  };

const handleDeleteComment = async (commentId: string) => {
  try {
    const targetTable = dataType === 'project' ? 'communityproject_comment' : 'communitystudy_comment';
    const { error } = await supabase
      .from(targetTable)
      .delete()
      .eq('id', commentId)
      .eq('user_id', useAuthStore.getState().user);

    if (error) {
      throw convertPostgrestError(error);
    }

    queryClient.invalidateQueries(['comments', dataType]);
  } catch (error) {
    console.error('댓글 삭제 에러:', (error as Error).message);
  }
};

  const handleAddComment = async () => {
    if (commentText.trim() !== '') {
      if (editingCommentId) {
        // 수정 중인 댓글이 있다면 수정 로직 실행
        editCommentMutation.mutate({ text: commentText});
      } else {
        // 그렇지 않으면 새 댓글 추가 로직 실행
        const newComment = {
          text: commentText,
          user_id: useAuthStore.getState().user,
        };
        addCommentMutation.mutate(newComment);
      }

      setCommentText('');
    }
  };
   const getUserEmail = (userId: string) => {
    const foundUser = users?.find((user) => user.id === userId);
    return foundUser?.email || 'Unknown'; 
  };

  return (
     <div>
      <input type="text" value={commentText} onChange={(e) => setCommentText(e.target.value)} />

      <button onClick={handleAddComment}>{editingCommentId ? '댓글 수정' : '댓글 추가'}</button>

      {isLoading ? (
        <p>댓글을 불러오는 중입니다...</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              {comment.user_id === useAuthStore.getState().user && (
                <>
                  <div>{getUserEmail(comment.user_id)}</div>
                {comment.text}
                  <button onClick={() => handleEditComment(comment.id)}>수정</button>
                  <button onClick={() => handleDeleteComment(comment.id)}>삭제</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommunityDetailComment;
