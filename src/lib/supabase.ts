// lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

// Replace with your Supabase credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function fetchAllUsers() {
  try {
    // Query to fetch all user data
    const { data, error } = await supabase
      .from("users") // Assuming the table name is 'users'
      .select("*"); // Select all fields from the 'users' table

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

export const getUserByEmail = async (email: string) => {
  try {
    // Fetch the user based on email
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single(); // Use single() to get a single matching row

    if (error) {
      console.error("Error fetching user:", error.message);
      return { error: error.message, data: null };
    }

    return { data, error: null };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { error: "Unexpected error occurred.", data: null };
  }
};
