"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

export default function Login() {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <LoginContent session={session} status={status} router={router} />
    </Suspense>
  );
}

function LoginContent({ session, status, router }) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/"; // Get return URL after login

  // 🚀 If user is already logged in, redirect them automatically
  useEffect(() => {
    if (status === "authenticated") {
      router.replace(callbackUrl);
    }
  }, [status, callbackUrl, router]);

 

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300">
        {/* Elegant Header */}
        <div className="bg-gradient-to-r from-black/90 to-black/80 p-6 text-center">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Welcome Back to Andaihub
          </h1>
          <p className="mt-2 text-indigo-100 text-opacity-90">
            Get AI Ready in minutes
          </p>
        </div>

        {/* Login Content */}
        <div className="p-8 space-y-6">
          {/* Social Login Buttons */}
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => signIn("google", { callbackUrl })}
              className="w-full flex items-center justify-center py-3 px-4 bg-white border border-gray-300 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
            >
              <svg className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M12.545 10.239v3.821h5.445c-0.712..." fill="#4285F4" />
              </svg>
              <span className="text-gray-700 font-semibold group-hover:text-blue-600 transition-colors">
                Continue with Google
              </span>
            </button>

            <button
              onClick={() => signIn("linkedin", { callbackUrl })}
              className="w-full flex items-center justify-center py-3 px-4 bg-white border border-gray-300 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
            >
              <svg className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 ..." fill="#0077B5" />
              </svg>
              <span className="text-gray-700 font-semibold group-hover:text-blue-800 transition-colors">
                Continue with LinkedIn
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}