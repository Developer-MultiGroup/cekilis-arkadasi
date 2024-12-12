// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function fetchAllUsers() {
    try {
      // Query to fetch all user data
      const { data, error } = await supabase
        .from('users')  // Assuming the table name is 'users'
        .select('*');   // Select all fields from the 'users' table
  
      if (error) {
        throw new Error(error.message);
      }
  
      // Log the fetched data
      console.log("Fetched Users: ", data);
      return data;
    } catch (err) {
      console.error("Error fetching users: ", err);
      return null;
    }
  }