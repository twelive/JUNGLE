import { Database } from "./database";

// // Extract the stack_comment table definition from the Database interface
type StackDiggingTable = Database['public']['Tables']['stack_digging'];

// // Define the StackCommentDTO by picking the properties from the Row type of the stack_comment table
export interface StackDiggingDTO extends Pick<StackDiggingTable['Row'], keyof StackDiggingTable['Row']> {}
// export interface StackCommentDTO extends Database["public"]["Tables"]["stack_comment"]["Row"] {}