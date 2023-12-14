import { create } from 'zustand';

interface Comment {
  id: string;
  name: string;
  date: string;
  text: string;
}

interface CommentStore {
  comments: Comment[];
  addComment: (comment: Comment) => void;
  deleteComment: (id: string) => void;
}

const useCommentStore = create<CommentStore>((set) => ({
  comments: [],
  addComment: (comment) =>
    set((state) => ({ comments: [...state.comments, comment] })),
  deleteComment: (id) =>
    set((state) => ({
      comments: state.comments.filter((comment) => comment.id !== id),
    })),
}));

export default useCommentStore;
