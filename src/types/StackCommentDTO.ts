import { Database } from "./database";


type StackCommentTable = Database['public']['Tables']['stack_comment'];


export interface StackCommentDTO extends Pick<StackCommentTable['Insert'], keyof StackCommentTable['Insert']> {}


