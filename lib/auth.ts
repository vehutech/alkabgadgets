import { cookies } from "next/headers";
import { auth } from "@/lib/firebase-admin";
import { User } from "@/lib/types";

/**
 * Get the current authenticated user from session cookie
 * Returns null if not authenticated
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;

    if (!sessionCookie) {
      return null;
    }

    // Verify the session cookie
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    // Get user data
    const userRecord = await auth.getUser(decodedClaims.uid);

    return {
      uid: userRecord.uid,
      email: userRecord.email || "",
      displayName: userRecord.displayName,
      role: (decodedClaims.role as "admin" | "user") || "user",
    };
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

/**
 * Check if user is admin
 */
export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.role === "admin";
}