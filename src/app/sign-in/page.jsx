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
  const [apiError,setApiError]=useState({
    isError:false,
    message:""
  })
  const [loading,setLoading]=useState(false)
  const router=useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: "",
      password: ""
    }
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async(values) => {
    // console.log("Sign-in values:", values);
    try {
      setLoading(true)
      setApiError({
        isError:false,
        message:""
      })
      await axios.post(`/api/users/login`,
        JSON.stringify({
          identifier:values.identifier,
          password:values.password
        })
      )
      router.replace('/')
    } catch (error) {
      console.log(error?.response?.data?.message||"Unexpected errors")
      setApiError({
        isError:true,
        message:error?.response?.data?.message||"Unexpected errors"
      })
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <section className="flex justify-center items-center min-h-[100dvh] bg-gradient-to-b from-indigo-50 via-white to-pink-50">
      <div className="max-w-md w-full mx-auto p-6 bg-[#ffffff8e] backdrop-blur-xl rounded-xl shadow-md">
        <div className="flex items-center flex-col mb-6 gap-1">
          <h2 className="text-2xl font-bold text-center text-indigo-600 ">Sign In</h2>
          {apiError.isError &&<p className="text-red-700 text-sm">{apiError.message}</p>}
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email or Username</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Enter your email or username"
                        className="pl-10"
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pl-10 pr-10"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
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
              {loading?<><Loader2 className="h-6 w-5 animate-spin"/> Signing In</>:"Sign In"}
            </Button>
           <div className="flex items-center justify-between mt-2">

            <div >
              <Link href="/forgot-password" className="text-sm text-indigo-600 hover:underline font-medium">
                Forgot Password?
              </Link>
            </div>

            <p className="text-center text-sm text-gray-600 ">
              Don't have an account?{' '}
              <Link href="/sign-up" className="text-indigo-600 font-medium hover:underline transition-colors">
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
