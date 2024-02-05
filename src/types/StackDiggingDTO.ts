import { Database } from "./database";


type StackDiggingTable = Database['public']['Tables']['stack_digging'];


export interface StackDiggingDTO extends Pick<StackDiggingTable['Row'], keyof StackDiggingTable['Row']> {}


