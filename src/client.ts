import { createClient } from "@supabase/supabase-js";
import { Database } from "./types/database";

export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);


export const TABLE_NAME = {
  video: 'video_comment',
  user: 'user',
  
};





