import { createClient } from '@supabase/supabase-js';
import { create } from 'zustand';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const LOCAL_STORAGE_KEY = 'comments';

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

const useCommentStore = create<CommentStore>((set) => {
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

export default useCommentStore;
