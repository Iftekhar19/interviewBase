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
      await axios.post(`/api/users/verifyEmail`,JSON.stringify({
        token
      }));
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
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 px-4">
      <motion.div
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border border-indigo-100 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent 0 mb-4">
          Verify Your Account
        </h2>

        {!isVerified ? (
          <>
            <p className="text-gray-600 mb-6">
              Click the button below to verify your account.
            </p>
            <Button
              onClick={handleVerify}
              disabled={isVerifying}
              className="w-full cursor-pointer bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold hover:brightness-105"
            >
              {isVerifying ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin" size={18} /> Verifying...
                </span>
              ) : (
                "Verify Account"
              )}
            </Button>
          </>
        ) : (
          <div className="space-y-4">
            <CheckCircle className="text-green-500 mx-auto" size={48} />
            <p className="text-green-600 font-medium">
              Your account has been successfully verified!
            </p>
            <Link
              href="/sign-in"
              className="inline-block text-indigo-600 hover:underline font-semibold"
            >
              Go to Sign In
            </Link>
          </div>
        )}
      </motion.div>
    </section>
  );
}
