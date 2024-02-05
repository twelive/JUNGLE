import { Database } from "./database";

// // Extract the stack_comment table definition from the Database interface
type StackCommentTable = Database['public']['Tables']['stack_comment'];

// // Define the StackCommentDTO by picking the properties from the Row type of the stack_comment table
export interface StackCommentDTO extends Pick<StackCommentTable['Insert'], keyof StackCommentTable['Insert']> {}
// export interface StackCommentDTO extends Database["public"]["Tables"]["stack_comment"]["Row"] {}