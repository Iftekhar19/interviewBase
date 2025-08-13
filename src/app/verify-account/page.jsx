"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import axios from "axios";

export default function VerifyAccountPage() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();

  const handleVerify = async () => {
    try {
      const token = searchParams.get("token");

      if (!token) return;
      setIsVerifying(true);
      setError("");
      await axios.post(
        `/api/users/verifyEmail`,
        JSON.stringify({ token })
      );
      setIsVerified(true);
    } catch (error) {
      setError(
        error?.response?.data?.message || "Unable to verify your account"
      );
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 
      bg-gradient-to-br from-indigo-50 via-white to-pink-50 
      dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <motion.div
        className="w-full max-w-md 
          bg-white dark:bg-gray-900 
          p-8 rounded-xl shadow-md 
          border border-indigo-100 dark:border-gray-700 
          text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-extrabold 
          bg-gradient-to-r from-indigo-600 via-pink-500 to-indigo-600 
          dark:from-indigo-400 dark:via-pink-400 dark:to-indigo-400
          bg-clip-text text-transparent mb-4">
          Verify Your Account
        </h2>

        {!isVerified ? (
          <>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Click the button below to verify your account.
            </p>
            <Button
              onClick={handleVerify}
              disabled={isVerifying}
              className="w-full cursor-pointer 
                bg-gradient-to-r from-indigo-500 to-pink-500 
                dark:from-indigo-400 dark:to-pink-400
                text-white font-semibold hover:brightness-105"
            >
              {isVerifying ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin" size={18} /> Verifying...
                </span>
              ) : (
                "Verify Account"
              )}
            </Button>
            {error && (
              <p className="mt-4 text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
            )}
          </>
        ) : (
          <div className="space-y-4">
            <CheckCircle
              className="text-green-500 dark:text-green-400 mx-auto"
              size={48}
            />
            <p className="text-green-600 dark:text-green-400 font-medium">
              Your account has been successfully verified!
            </p>
            <Link
              href="/sign-in"
              className="inline-block 
                text-indigo-600 dark:text-indigo-400 
                hover:underline font-semibold"
            >
              Go to Sign In
            </Link>
          </div>
        )}
      </motion.div>
    </section>
  );
}
