// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://kzpoakjhzpjnoljdgafl.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6cG9ha2poenBqbm9samRnYWZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzMTY0MTIsImV4cCI6MjA2MTg5MjQxMn0.oVfUEkb7cRoBKFQF89_FetOedtlsUZDy4gl8AJf20G0";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);