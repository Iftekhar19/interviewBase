"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";

const resetSchema = z.object({
  identifier: z
    .string()
    .min(3, "Identifier must be at least 3 characters long")
    .max(100, "Too long"),
});

export default function ResetPasswordForm() {
  const [apiError, setApierror] = useState({
    isError: false,
    message: "",
  });
  const [isSuccess, setIssuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetSchema),
  });

  const onSubmit = async (data) => {
    try {
      setApierror({ isError: false, message: "" });
      await axios.post(
        `/api/users/forgotpasswordlink`,
        JSON.stringify({ email: data.identifier })
      );
      setIssuccess(true);
    } catch (error) {
      console.log(error?.response?.data?.message || "Unexpected error");
      setApierror({
        isError: true,
        message: error?.response?.data?.message || "Unexpected error",
      });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 px-4">
      <motion.div
        className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md border border-indigo-100 dark:border-gray-700"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col gap-1 mb-6 items-center">
          <h2 className="text-2xl mb-0 font-extrabold text-center bg-gradient-to-r from-indigo-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent">
            Reset Your Password
          </h2>
          <p className="text-center text-gray-400 dark:text-gray-500 font-semibold text-sm">
            A password reset link will be sent to your email
          </p>

          {apiError.isError && (
            <p className="text-red-500 dark:text-red-400 text-md font-semibold my-2 text-center">
              {apiError.message}
            </p>
          )}
        </div>

        {!isSuccess ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-300 font-semibold mb-1">
                Username or Email
              </label>
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-1/2 text-gray-600 dark:text-gray-400 -translate-y-1/2" size={18} />
                <Input
                  type="text"
                  placeholder="Enter your email or username"
                  className="pl-10 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                  {...register("identifier")}
                />
              </div>
              {errors.identifier && (
                <p className="text-sm text-red-500 dark:text-red-400 mt-1">
                  {errors.identifier.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold hover:brightness-105 dark:hover:brightness-110"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-6 w-6 animate-spin" /> Sending
                </>
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </form>
        ) : (
          <div className="text-center text-green-600 dark:text-green-400 font-medium">
            A password reset link has been sent to your email. Please check your inbox.
          </div>
        )}

        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Remember your password?{" "}
          <Link
            href="/sign-in"
            className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
          >
            Sign in
          </Link>{" "}
          or{" "}
          <Link
            href="/sign-up"
            className="text-pink-600 dark:text-pink-400 hover:underline font-medium"
          >
            Create an account
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
