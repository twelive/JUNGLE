import { createClient } from '@supabase/supabase-js';
import { create } from 'zustand';

// Supabase 연결 정보
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Supabase 클라이언트 생성
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// 로컬 스토리지 키 정의
const LOCAL_STORAGE_KEY = 'comments';

// 댓글 데이터 타입 정의
interface Comment {
  id?: number;
  name: string;
  text: string;
  interviewId?: number;
  commentId?: number;
}

// Zustand 상태 관리를 위한 인터페이스
interface CommentStore {
  comments: Comment[];
  addComment: (comment: Comment) => Promise<void>; // 비동기 함수임을 명시
  deleteComment: (id: number) => Promise<void>;
}

// Zustand Store 생성
const useCommentStore = create<CommentStore>((set) => {
  // 로컬 스토리지에서 데이터를 불러와 초기화
  const savedComments = localStorage.getItem(LOCAL_STORAGE_KEY);
  const initialComments = savedComments ? JSON.parse(savedComments) : [];
  let commentIdCounter = 1;
  return {
    comments: initialComments,
    addComment: async (comment) => {
      const newCommentWithId = { ...comment, commentId: commentIdCounter++ }; // 간단한 숫자로 새로운 commentId 추가
      set((state) => {
        const newComments = [...state.comments, newCommentWithId];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newComments));
        return { comments: newComments };
      });
      console.log(newCommentWithId);

      // Supabase에 데이터 전송
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

      // Supabase에서 해당 ID의 댓글을 삭제
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
