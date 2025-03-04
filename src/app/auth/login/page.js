"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data: session, status } = useSession();

  const callbackUrl = searchParams.get("callbackUrl") || "/"; 


  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 ">
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
              <path
                d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.79-1.677-4.184-2.702-6.735-2.702-5.522 0-10 4.478-10 10s4.478 10 10 10c8.396 0 10.249-7.85 9.426-11.748l-9.426 0.082z"
                fill="#4285F4"
              />
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
              <path
                d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
                fill="#0077B5"
              />
            </svg>
            <span className="text-gray-700 font-semibold group-hover:text-blue-800 transition-colors">
              Continue with LinkedIn
            </span>
          </button>
        </div>

        {/* Create Account Link */}
        
      </div>
    </div>
  </div>
  );
}
