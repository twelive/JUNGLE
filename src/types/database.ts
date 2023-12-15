import { CommunityProject } from "./CommunityProject";

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      book: {
        Row: {
          anonymous_book_id: string;
          book_like_counter: number | null;
          created_at: string;
          id: number;
          img: string | null;
          tag: string | null;
          title: string | null;
          URL: string | null;
        };
        Insert: {
          anonymous_book_id?: string;
          book_like_counter?: number | null;
          created_at?: string;
          id?: number;
          img?: string | null;
          tag?: string | null;
          title?: string | null;
          URL?: string | null;
        };
        Update: {
          anonymous_book_id?: string;
          book_like_counter?: number | null;
          created_at?: string;
          id?: number;
          img?: string | null;
          tag?: string | null;
          title?: string | null;
          URL?: string | null;
        };
        Relationships: [];
      };
      bookmarks: {
        Row: {
          book_id: number | null;
          created_at: string;
          id: number;
          user_id: string;
        };
        Insert: {
          book_id?: number | null;
          created_at?: string;
          id?: number;
          user_id: string;
        };
        Update: {
          book_id?: number | null;
          created_at?: string;
          id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'bookmarks_book_id_fkey';
            columns: ['book_id'];
            isOneToOne: false;
            referencedRelation: 'book';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'bookmarks_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      comment: {
        Row: {
          created_at: string;
          id: number;
          project_id: number | null;
          study_id: number | null;
          text: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          project_id?: number | null;
          study_id?: number | null;
          text?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          project_id?: number | null;
          study_id?: number | null;
          text?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'comment_project_id_fkey';
            columns: ['project_id'];
            isOneToOne: false;
            referencedRelation: 'community_project';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'comment_study_id_fkey';
            columns: ['study_id'];
            isOneToOne: false;
            referencedRelation: 'community_study';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'comment_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      community_project: {
        Row: CommunityProject;
        Insert: {
          contents: string;
          created_at?: string;
          deadline?: string | null;
          id?: number;
          people?: string | null;
          primary_key?: string;
          progress?: string | null;
          tag1?: string | null;
          tag2?: string | null;
          tag3?: string | null;
          title: string;
          user_id?: string | null;
        };
        Update: {
          contents?: string;
          created_at?: string;
          deadline?: string | null;
          id?: number;
          people?: string | null;
          primary_key?: string;
          progress?: string | null;
          tag1?: string | null;
          tag2?: string | null;
          tag3?: string | null;
          title?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'community_project_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      community_study: {
        Row: {
          contents: string;
          created_at: string;
          deadline: string | null;
          id: number;
          people: string | null;
          primary_key: string;
          progress: string | null;
          tag1: string | null;
          tag2: string | null;
          tag3: string | null;
          title: string;
          user_id: string | null;
        };
        Insert: {
          contents: string;
          created_at?: string;
          deadline?: string | null;
          id?: number;
          people?: string | null;
          primary_key?: string;
          progress?: string | null;
          tag1?: string | null;
          tag2?: string | null;
          tag3?: string | null;
          title: string;
          user_id?: string | null;
        };
        Update: {
          contents?: string;
          created_at?: string;
          deadline?: string | null;
          id?: number;
          people?: string | null;
          primary_key?: string;
          progress?: string | null;
          tag1?: string | null;
          tag2?: string | null;
          tag3?: string | null;
          title?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'community_study_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      job: {
        Row: {
          created_at: number | null;
          id: number;
          job_likes_counter: number | null;
          tag: string | null;
          title: string;
          URL: string;
        };
        Insert: {
          created_at?: number | null;
          id?: number;
          job_likes_counter?: number | null;
          tag?: string | null;
          title: string;
          URL: string;
        };
        Update: {
          created_at?: number | null;
          id?: number;
          job_likes_counter?: number | null;
          tag?: string | null;
          title?: string;
          URL?: string;
        };
        Relationships: [];
      };
      job_codingtest: {
        Row: {
          created_at: string;
          id: number;
          info: string | null;
          name: string | null;
          title: string | null;
          uuid: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          info?: string | null;
          name?: string | null;
          title?: string | null;
          uuid?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          info?: string | null;
          name?: string | null;
          title?: string | null;
          uuid?: string | null;
        };
        Relationships: [];
      };
      job_interview: {
        Row: {
          created_at: string;
          id: number;
          info: string | null;
          name: string | null;
          title: string | null;
          uuid: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          info?: string | null;
          name?: string | null;
          title?: string | null;
          uuid?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          info?: string | null;
          name?: string | null;
          title?: string | null;
          uuid?: string | null;
        };
        Relationships: [];
      };
      likes: {
        Row: {
          book_id: number | null;
          created_at: string;
          id: number;
          job_id: number | null;
          user_id: string | null;
        };
        Insert: {
          book_id?: number | null;
          created_at?: string;
          id?: number;
          job_id?: number | null;
          user_id?: string | null;
        };
        Update: {
          book_id?: number | null;
          created_at?: string;
          id?: number;
          job_id?: number | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'likes_book_id_fkey';
            columns: ['book_id'];
            isOneToOne: false;
            referencedRelation: 'book';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'likes_job_id_fkey';
            columns: ['job_id'];
            isOneToOne: false;
            referencedRelation: 'job';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'likes_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      profiles: {
        Row: {
          first_name: string | null;
          id: string;
          last_name: string | null;
        };
        Insert: {
          first_name?: string | null;
          id: string;
          last_name?: string | null;
        };
        Update: {
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      stack_comment: {
        Row: {
          anonymous_user_id: string;
          comment_id: string;
          created_at: string;
          id: number;
          text: string | null;
        };
        Insert: {
          anonymous_user_id?: string;
          comment_id?: string;
          created_at?: string;
          id?: number;
          text?: string | null;
        };
        Update: {
          anonymous_user_id?: string;
          comment_id?: string;
          created_at?: string;
          id?: number;
          text?: string | null;
        };
        Relationships: [];
      };
      stack_discussion: {
        Row: {
          anonymous_user_id: string;
          created_at: string;
          email: string | null;
          id: number;
          text: string;
          title: string;
          URL: string | null;
        };
        Insert: {
          anonymous_user_id: string;
          created_at?: string;
          email?: string | null;
          id?: number;
          text: string;
          title: string;
          URL?: string | null;
        };
        Update: {
          anonymous_user_id?: string;
          created_at?: string;
          email?: string | null;
          id?: number;
          text?: string;
          title?: string;
          URL?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'stack_discussion_anonymous_user_id_fkey';
            columns: ['anonymous_user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      users: {
        Row: {
          created_at: string | null;
          email: string | null;
          id: string;
        };
        Insert: {
          created_at?: string | null;
          email?: string | null;
          id: string;
        };
        Update: {
          created_at?: string | null;
          email?: string | null;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'users_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      video_comment: {
        Row: {
          anonymous_user_id: string;
          created_at: string;
          id: number;
          text: string | null;
          video_id: string;
        };
        Insert: {
          anonymous_user_id?: string;
          created_at?: string;
          id?: number;
          text?: string | null;
          video_id?: string;
        };
        Update: {
          anonymous_user_id?: string;
          created_at?: string;
          id?: number;
          text?: string | null;
          video_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
        Database['public']['Views'])
    ? (Database['public']['Tables'] &
        Database['public']['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database['public']['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
    ? Database['public']['Enums'][PublicEnumNameOrOptions]
    : never;
