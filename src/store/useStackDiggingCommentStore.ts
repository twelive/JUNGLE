import create from 'zustand';
import { supabase } from '@/client';

const LOCAL_STORAGE_KEY = 'stakccomments';

interface Comment {
  id?: number;
  name: string;
  text: string;
  interviewId?: number;
  commentId?: number;
}


interface CommentStore {
  comments: Comment[];
  addComment: (comment: Comment) => Promise<void>;
  deleteComment: (id: number) => Promise<void>;
}

const useStackDiggingCommentStore = create<CommentStore>((set) => {
  const savedComments = localStorage.getItem(LOCAL_STORAGE_KEY);
  const initialComments = savedComments ? JSON.parse(savedComments) : [];
  let commentIdCounter = 1;
  return {
    comments: initialComments,
    addComment: async (comment) => {
      const newCommentWithId = { ...comment, commentId: commentIdCounter++ };
      set((state) => {
        const newComments = [...state.comments, newCommentWithId];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newComments));
        return { comments: newComments };
      });
      console.log(newCommentWithId);

      const { error } = await supabase
        .from('job_interview_comment')
        .insert([{ ...newCommentWithId, interview_id: comment.interviewId }]);
      if (error) {
        console.error('Error adding comment to Supabase:', error);
      }
    },
    deleteComment: async (id: number) => {
      set((state) => {
        const updatedComments = state.comments.filter(
          (comment) => comment.commentId !== id
        );
        localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify(updatedComments)
        );
        return { comments: updatedComments };
      });

      const { error } = await supabase
        .from('job_interview_comment')
        .delete()
        .match({ id });
      if (error) {
        console.error('Error deleting comment from Supabase:', error);
      }
    },
  };
});

export default useStackDiggingCommentStore;
