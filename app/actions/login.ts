"use server";

import { cookies } from "next/headers";
import { auth } from "@/lib/firebase-admin";

export async function loginWithFirebase(idToken: string) {
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
  try {
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn,
    });
    const cookieStore = await cookies();
    cookieStore.set("session", sessionCookie, {
      maxAge: expiresIn / 1000,
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });
    return { success: true };
  } catch (err) {
    console.error("Session creation failed", err);
    return { success: false, error: "Invalid token" };
  }
}
