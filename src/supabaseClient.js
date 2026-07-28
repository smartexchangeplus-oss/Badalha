import { createClient } from "@supabase/supabase-js";

// هذي القيم تُقرأ من ملف .env (لا تكتبها مباشرة بالكود)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "تحقق من ملف .env — لازم تحط فيه VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY"
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
