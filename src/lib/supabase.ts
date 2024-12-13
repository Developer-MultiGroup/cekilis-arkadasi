import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function fetchAllUsers() {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*"); 

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (err) {
    console.error("Error fetching users: ", err);
    return null;
  }
}

export const getUserByEmail = async (email: string) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single(); 

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

export const getMatchedUser = async (currentUserID: string) => {
  try {
    // Fetch the matched user ID
    const { data, error } = await supabase
      .from("matches")
      .select("matched_to")
      .eq("id", currentUserID)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    if (data.matched_to == "") {
      return
    }

    // Fetch the matched user's details
    const { data: matchData, error: matchError } = await supabase
      .from("users")
      .select("*")
      .eq("id", data.matched_to)
      .single();

    if (matchError) {
      throw new Error(matchError.message);
    }

    return matchData.id; // Return the matched user's details
  } catch (error) {
    console.error("Error fetching matched user:", error);
    return null;
  }
};


export const matchUsers = async (
  currentUserID: string,
  matchedUserID: string
) => {
  try {
    // Start a transaction to update both users
    const { data: currentUserData, error: currentUserError } = await supabase
      .from("matches")
      .update({ matched_to: matchedUserID })
      .eq("id", currentUserID);

    if (currentUserError) {
      throw new Error(currentUserError.message);
    }

    // Update the matched user's `has_matched` field
    const { data: matchedUserData, error: matchedUserError } = await supabase
      .from("users")
      .update({ has_match: true })
      .eq("id", matchedUserID);

    if (matchedUserError) {
      throw new Error(matchedUserError.message);
    }

    return {
      currentUser: currentUserData,
      matchedUser: matchedUserData,
    };
  } catch (error) {
    console.error("Error matching users:", error);
    return null;
  }
};


