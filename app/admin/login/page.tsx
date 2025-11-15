"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase-client";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { Eye } from "lucide-react";
import { loginWithFirebase } from "@/app/actions/login";
import useAdmin from "@/hooks/store";

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { setAdmin } = useAdmin();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await cred.user.getIdToken();
      const result = await loginWithFirebase(idToken);
      if (result.success) {
        setAdmin(true);
        router.push("/admin/dashboard");
      } else {
        setError(result.error || "Login failed");
      }
    } catch (e) {
      if (e instanceof FirebaseError) {
        switch (e.code) {
          case "auth/invalid-email":
            setError("Invalid email format.");
            break;
          case "auth/user-disabled":
            setError("This user account has been disabled.");
            break;
          case "auth/user-not-found":
            setError("No user found with this email.");
            break;
          case "auth/wrong-password":
            setError("Incorrect password.");
            break;
          case "auth/too-many-requests":
            setError("Too many login attempts. Try again later.");
            break;
          case "auth/network-request-failed":
            setError("Network error. Please check your connection.");
            break;
          case "auth/internal-error":
            setError("Internal error. Please try again.");
            break;
          case "auth/invalid-credential":
            setError("Invalid credentials.");
            break;
          case "auth/missing-password":
            setError("Password is missing.");
            break;
          default:
            setError("Login failed");
        }
      } else {
        setError("Login failed");
      }
      console.log("LOGIN ERROR: ", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Admin Login
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <div className="mt-1 appearance-none relative border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md  sm:text-sm flex justify-between">
                <input
                  id="password"
                  name="password"
                  type={isPasswordVisible ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="px-3 py-2 rounded-md w-full h-full appearance-none focus:outline-none focus:ring-primary focus:border-primary focus:z-10"
                  placeholder="Enter your password"
                />
                <button
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <Eye />
                </button>
              </div>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Sign in"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
