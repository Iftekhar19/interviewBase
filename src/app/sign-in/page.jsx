"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Lock, Eye, EyeOff, User, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  identifier: z.string().min(3, "Enter your email or username"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

export default function SignInForm() {
  const [apiError, setApiError] = useState({
    isError: false,
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: "",
      password: ""
    }
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      setApiError({
        isError: false,
        message: ""
      });
      await axios.post(`/api/users/login`,
        JSON.stringify({
          identifier: values.identifier,
          password: values.password
        })
      );
      router.replace('/');
      window?.location?.reload();
    } catch (error) {
      console.log(error?.response?.data?.message || "Unexpected errors");
      setApiError({
        isError: true,
        message: error?.response?.data?.message || "Unexpected errors"
      });
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center items-center min-h-[100dvh] bg-gradient-to-b from-indigo-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-950 dark:to-black transition-colors duration-300">
      <div className="max-w-md w-full mx-auto p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl shadow-md">
        <div className="flex items-center flex-col mb-6 gap-1">
          <h2 className="text-2xl font-bold text-center text-indigo-600 dark:text-indigo-400">Sign In</h2>
          {apiError.isError && <p className="text-red-700 dark:text-red-400 text-sm">{apiError.message}</p>}
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-300">Email or Username</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
                      <Input
                        placeholder="Enter your email or username"
                        className="pl-10 dark:bg-gray-900 dark:border-gray-700 dark:text-white dark:placeholder-gray-500"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-300">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pl-10 pr-10 dark:bg-gray-900 dark:border-gray-700 dark:text-white dark:placeholder-gray-500"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={loading}
              type="submit"
              className="w-full cursor-pointer bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold py-3 rounded-full shadow-lg hover:brightness-110 hover:scale-[1.01] transition-all duration-300"
            >
              {loading ? <><Loader2 className="h-6 w-5 animate-spin" /> Signing In</> : "Sign In"}
            </Button>

            <div className="flex items-center justify-between mt-2">
              <div>
                <Link href="/forgot-password" className="text-sm text-indigo-600 hover:underline font-medium dark:text-indigo-400">
                  Forgot Password?
                </Link>
              </div>

              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <Link href="/sign-up" className="text-indigo-600 font-medium hover:underline transition-colors dark:text-indigo-400">
                  Register now
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
