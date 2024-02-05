import { Database } from "./database";


type StackDiggingTable = Database['public']['Tables']['stack_digging'];


export interface StackDiggingUpdateDTO extends Pick<StackDiggingTable['Update'], keyof StackDiggingTable['Update']> {}



