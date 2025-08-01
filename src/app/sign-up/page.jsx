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
import { Mail, User, Phone, Lock, Eye, EyeOff, Loader2,CircleCheckBig  } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SignUpValidation } from "@/formValidationSchemas/signupSchema";
import axios from "axios";
import { useDebounceCallback } from "usehooks-ts";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Enter a valid phone number"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

export default function RegisterForm() {
const router=useRouter();
    const [showPassword, setShowPassword] = useState(false);
  const [apiError,setApiError]=useState({
    isError:false,
    message:""
  })
  const [username,setUsername]=useState("")
    const [checkingUsername, setCheckingUsername] = useState(false);
  const [checkingUserMsg, setCheckingUserMsg] = useState("");
  const [loading,setLoading]=useState(false);
  const [isSignedup,setIsSignedup]=useState(false)
   const debounced = useDebounceCallback(setUsername, 500);
  const form = useForm({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      password: ""
    }
  });



  const onSubmit = async(values) => {
    console.log("Submitted values:", values);
     try {
         setApiError({
        isError:false,
        message:""
      })
      setLoading(true)
      await axios.post(`/api/users/signup`,JSON.stringify(values))
      setIsSignedup(true)
      setTimeout(()=>
      {
        router.push('/sign-in')

      },1000)
     } catch (error) { 
      console.log(error)
      setApiError({
        isError:true,
        message:error?.response?.data?.message||"Unexpected error from server"
      })
     }
     finally{
      setLoading(false)
     }
  };
  useEffect(()=>
  {
    (async ()=>
    {
      if(username)
      {
        setCheckingUsername(true)
       try {
         const res=await axios.get(`/api/users/check-unique-username?username=${username}`)
        //  console.log(res.data.message)
         setCheckingUserMsg(res.data.message)
       } catch (error) {
        console.log(error?.response?.data?.message)
        setCheckingUserMsg(error?.response?.data?.message||"Unexpected error")
       }
       finally{
        setCheckingUsername(false)
       }
      }
    })()

  },[username])

  return (
    <section className="flex justify-center  items-center min-h-[100dvh] bg-gradient-to-b from-indigo-50 via-white to-pink-50">

    <div className="max-w-md w-full mx-auto  p-6 bg-[#ffffff8e] backdrop-blur-xl rounded-xl shadow-md">
     <div className="flex flex-col gap-1 items-center mb-6">

      <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-indigo-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent mb-0">User Registration</h2>
    {apiError.isError&&<p className="text-red-500 text-center text-sm font-medium">{apiError.message}</p>}  
    {isSignedup&&<div className="flex flex-col justify-center items-center gap-2 mt-2 "><CircleCheckBig className="h-10 w-10 text-green-500"/><p className="text-green-500 text-center text-sm font-medium"> Account verificatipon link has been sent to your email</p></div>}  
    
     </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input placeholder="Enter your username" className="pl-10" {...field} 
                    onChange={(e)=>
                    {
                      field.onChange(e);
                      debounced(e.target.value);
                      if (e.target.value == "") setCheckingUserMsg("");
                    }}
                    />
                  </div>
                </FormControl>
                <div className="text-green-800">
                {checkingUsername ?<Loader2 className="h-8 w-8 animate-spin text-green-800"/>:<span className={`${checkingUserMsg=="Username is unique"?'text-green-800':'text-red-600'}`}>{checkingUserMsg}</span>}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input placeholder="you@example.com" className="pl-10" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input placeholder="Enter your phone number" className="pl-10" {...field} />
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
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
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
            {
              loading ? <><Loader2 className="h-6 w-6 animate-spin"/>Signing Up</>:"Sign Up"
            }
          </Button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{' '}
            <Link href="/sign-in" className="text-indigo-600 font-medium hover:underline transition-colors">
              Sign in here
            </Link>
          </p>
        </form>
      </Form>
    </div>
    </section>
  );
}
