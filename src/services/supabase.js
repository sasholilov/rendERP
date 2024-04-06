import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://cxlsyzbtbjcnzpbiwxou.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4bHN5emJ0YmpjbnpwYml3eG91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI0MTg4NjgsImV4cCI6MjAyNzk5NDg2OH0.d4-YG8d2M9AvcL9BF_9r_F8l3n9bGyuajWQSVm3SqTE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
