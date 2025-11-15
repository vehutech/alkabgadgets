import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * DEVELOPMENT MODE LOGIN
 * This is a simplified login for development purposes.
 * Replace with proper Firebase Authentication in production.
 */
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // DEVELOPMENT MODE: Accept any credentials
    // TODO: Replace with Firebase Authentication in production
    if (process.env.NODE_ENV === "development") {
      // Create a simple session token (for dev only)
      const sessionToken = Buffer.from(
        JSON.stringify({
          email,
          uid: "dev-user-" + Date.now(),
          role: "admin",
          timestamp: Date.now(),
        })
      ).toString("base64");

      // Set cookie
      const cookieStore = await cookies();
      cookieStore.set("session", sessionToken, {
        httpOnly: true,
        secure: (process.env.NODE_ENV as string) === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      return NextResponse.json({
        success: true,
        message: "Login successful",
      });
    }

    // PRODUCTION MODE: Use Firebase Authentication
    // Uncomment and implement when ready for production
    /*
    try {
      // Import Firebase Auth (client-side SDK)
      const { signInWithEmailAndPassword } = await import("firebase/auth");
      const { auth } = await import("@/lib/firebase-client");
      
      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      
      // Get ID token
      const idToken = await userCredential.user.getIdToken();
      
      // Create session cookie using Firebase Admin
      const { auth: adminAuth } = await import("@/lib/firebase-admin");
      const expiresIn = 60 * 60 * 24 * 7 * 1000; // 7 days
      
      const sessionCookie = await adminAuth.createSessionCookie(idToken, {
        expiresIn,
      });
      
      // Set cookie
      const cookieStore = await cookies();
      cookieStore.set("session", sessionCookie, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: expiresIn / 1000,
        path: "/",
      });
      
      return NextResponse.json({
        success: true,
        message: "Login successful",
      });
    } catch (firebaseError: any) {
      console.error("Firebase auth error:", firebaseError);
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }
    */

    return NextResponse.json(
      { error: "Production authentication not configured" },
      { status: 500 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An error occurred during login" },
      { status: 500 }
    );
  }
}