import { cookies } from "next/headers";
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

    // DEVELOPMENT MODE: Decode simple session token
    if (process.env.NODE_ENV === "development") {
      try {
        const decoded = JSON.parse(
          Buffer.from(sessionCookie, "base64").toString("utf-8")
        );

        return {
          uid: decoded.uid || "dev-user",
          email: decoded.email || "admin@example.com",
          displayName: decoded.displayName || "Admin User",
          role: "admin",
        };
      } catch (decodeError) {
        console.error("Error decoding dev session:", decodeError);
        return null;
      }
    }

    // PRODUCTION MODE: Verify with Firebase
    // Uncomment when implementing Firebase Authentication
    /*
    try {
      const { auth } = await import("@/lib/firebase-admin");
      
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
    } catch (verifyError) {
      console.error("Error verifying session cookie:", verifyError);
      return null;
    }
    */

    return null;
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