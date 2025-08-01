"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Lock, Loader2, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSearchParams } from "next/navigation";
import axios from "axios";

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function ResetPasswordConfirmationForm() {
  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
    reset,
  } = form;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [validating, setValidating] = useState(true);
  const [validateMsg, setValidateMsg] = useState("");
  const  [error,setError]=useState("")
  const searchParams = useSearchParams();
  const onSubmit = async (data) => {
    const userId=searchParams.get("userid")
    try {
      setError("")
      await axios.post(`/api/users/forgotpassword`,JSON.stringify({
        password:data.password,
        userid:userId
      }))
      setError("")
    } catch (error) {
      console.log(error)
      setError(error?.response?.data?.message)
    }
  };
  useEffect(() => {
    (async () => {
      try {
        const token = searchParams.get("token");
        if (!token) return;

        console.log(token);
        await axios.post(
          `/api/users/verifyforgotpasswordtoken`,
          JSON.stringify({
            token,
          })
        );
        setValidateMsg("");
      } catch (error) {
        setValidateMsg(error?.response?.data?.message || "Unexpected error");
      } finally {
        setValidating(false);
      }
    })();
  }, []);
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50 via-white to-pink-50 px-4">
      {validateMsg === "" && !validating ? (
        <motion.div
          className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border border-indigo-100"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 flex flex-col justify-center items-center gap-1">
          <h2 className="text-2xl font-extrabold text-center  bg-gradient-to-r from-indigo-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent">
            Set a New Password
          </h2>
          {error && <p className="text-red-400 text-sm font-semibold">{error}</p>}
          </div>

          {!isSubmitSuccessful ? (
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter new password"
                            className="pl-10 pr-10"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                          >
                            {showPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                          <Input
                            type={showConfirm ? "text" : "password"}
                            placeholder="Confirm your password"
                            className="pl-10 pr-10"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirm((prev) => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                          >
                            {showConfirm ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold hover:brightness-105"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="animate-spin" size={18} />{" "}
                      Resetting...
                    </span>
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </form>
            </Form>
          ) : (
            <div className="text-center text-green-600 font-medium space-y-4">
              <p>Your password has been successfully reset.</p>
              <Link
                href="/sign-in"
                className="text-indigo-600 hover:underline font-semibold"
              >
                Back to Sign In
              </Link>
            </div>
          )}
        </motion.div>
      ) : !validating && validateMsg !== "" ? (
        <div className=" min-h-[200px] w-full max-w-md bg-white p-8 rounded-xl shadow-md border border-indigo-100">
          <div className="flex justify-center flex-col items-center w-full h-full">
            <p className="text-red-500 text-center text-md font-semibold">
              Sorry ! unable to validate your token please raise another reset
              passowrd request by forgetting passowrd
            </p>
            <Link
              href="/forgot-password"
              className="text-indigo-600 hover:underline font-semibold"
            >
              forgot password
            </Link>
          </div>
        </div>
      ) : (
        <div className=" min-h-[200px] w-full max-w-md bg-white p-8 rounded-xl shadow-md border border-indigo-100">
          <div className="flex justify-center flex-col items-center w-full h-full">
            <Loader2 className="h-12 w-12 animate-spin" />
            <p className="text-black mt-2 font-bold">
              Please wait... we are validating your credentials
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
