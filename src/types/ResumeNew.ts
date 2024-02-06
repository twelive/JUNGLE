import { Database } from './database';

// // Extract the stack_comment table definition from the Database interface
type ResumeNewTable = Database['public']['Tables']['resume'];

// // Define the StackCommentDTO by picking the properties from the Row type of the stack_comment table
export interface ResumeNewDTO
  extends Pick<ResumeNewTable['Row'], keyof ResumeNewTable['Row']> {}
// export interface StackCommentDTO extends Database["public"]["Tables"]["stack_comment"]["Row"] {}
