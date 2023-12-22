
import { createClient } from '@supabase/supabase-js';
import { create } from 'zustand';

// Supabase 연결 정보
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Supabase 클라이언트 생성
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// 로컬 스토리지 키 정의
// const LOCAL_STORAGE_KEY = 'create';

// 댓글 데이터 타입 정의
interface Comment {
  id?: number|string;
  title: string;
  contents: string;
  division: string;
  people: string;
  progress: string;
  tag1: string;
  tag2: string;
  tag3: string;
  user_id: string|number;
}
// Zustand 상태 관리를 위한 인터페이스
interface CommentStore {
  projectComments: Comment[];
  studyComments: Comment[];
  addComment: (comment: Comment) => void;
  deleteComment: (id: string) => void;
}

// Zustand Store 생성
const useCreateStore = create<CommentStore>((set) => {
  // 로컬 스토리지에서 데이터를 불러와 초기화
  const savedProjectComments = localStorage.getItem('community_project');
  const savedStudyComments = localStorage.getItem('community_study');

  const initialProjectComments = savedProjectComments
    ? JSON.parse(savedProjectComments)
    : [];
  const initialStudyComments = savedStudyComments
    ? JSON.parse(savedStudyComments)
    : [];

  return {
    projectComments: initialProjectComments,
    studyComments: initialStudyComments,
    addComment: async (comment) => {
      // Zustand 상태 업데이트
      if (comment.division === '프로젝트') {
        set((state) => {
          const newComments = [...state.projectComments, comment];
          localStorage.setItem(
            'community_project',
            JSON.stringify(newComments)
          );
          return { projectComments: newComments };
        });
      } else if (comment.division === '스터디') {
        set((state) => {
          const newComments = [...state.studyComments, comment];
          localStorage.setItem('community_study', JSON.stringify(newComments));
          return { studyComments: newComments };
        });
      }

      // Supabase에 데이터 전송
      const tableName =
        comment.division === '프로젝트'
          ? 'community_project'
          : 'community_study';
      const { error } = await supabase.from(tableName).insert([comment]);
      if (error) {
        console.error('Error adding comment to Supabase:', error);
      }
    },

    deleteComment: async (id: string | number) => {
      set((state) => {
        const updatedProjectComments = state.projectComments.filter(
          (comment) => comment.id !== id
        );
        localStorage.setItem(
          'community_project',
          JSON.stringify(updatedProjectComments)
        );
        const updatedStudyComments = state.studyComments.filter(
          (comment) => comment.id !== id
        );
        localStorage.setItem(
          'community_study',
          JSON.stringify(updatedStudyComments)
        );

        return {
          projectComments: updatedProjectComments,
          studyComments: updatedStudyComments,
        };
      });

      // Supabase에서 해당 ID의 댓글을 삭제
      // ... 삭제 관련 코드
    },
  };
});

export default useCreateStore;

