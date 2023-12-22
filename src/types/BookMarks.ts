export interface BookMarks {
  book_id: number | null
  created_at: string
  id: number
  job_id: number | null
  stack_id: number | null
  user_id: string
  stack_digging: {
      created_at: string
      id: number
      stack_comment_counter: number | null
      tag: string
      text: string | null
      title: string | null
      updated_at: string | null
      user_email: string | null
      user_id: string | null
    }
}
