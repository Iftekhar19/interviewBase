"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CompanyList } from "@/data/CompanyList";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Book,
  FileText,
  Landmark,
  Loader2,
  SignalHigh,
  StickyNote,
  UserCog,
  Braces,
  Atom,
  DatabaseZap,
  BrainCircuit,
  ShieldCheckIcon,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { AddQuestionSchema } from "@/formValidationSchemas/addquestionSchema";
import { useState } from "react";
import axios from "axios";

export default function AddQuestionForm() {
  const [askedIn, setAskedIn] = useState("");
  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState("");
  const [forwhom, setForwhom] = useState("");
  const [apiError, setApiError] = useState({
    isError: false,
    message: "",
  });
  const [success,setSuccess]=useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(AddQuestionSchema),
  });
  const removeSuccess=()=>{
    setTimeout(()=>
    {
      setSuccess(false)
    },2000)
  }
  const onSubmit = async (data) => {
    try {
      setApiError({ isError: false, message: "" });
      await axios.post(`/api/questions/addquestion`, JSON.stringify(data));
      setSuccess(true)
      removeSuccess()
      reset();
      setAskedIn("");
      setSubject("");
      setLevel("");
      setForwhom("");
    } catch (err) {
      setApiError({
        isError: true,
        message: err?.response?.data?.message || "Unexpected error occurred",
      });
    }
  };

  return (
    <div className="w-full px-1 sm:px-6 lg:px-8 max-w-4xl mx-auto mt-1 sm:mt-6">
      <Card className="shadow-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <CardHeader className="w-full">
          <h1 className="flex w-full text-center items-center justify-center gap-2 text-2xl font-black tracking-tight text-indigo-600">
            Submit a New Interview Question
          </h1>
          {apiError.isError && (
            <p className="text-red-600 dark:text-red-400 text-sm font-semibold text-center">
              {apiError.message}
            </p>
          )}
          {
            success && <div className="w-full flex  items-center justify-center">
              <ShieldCheckIcon className="h-10 w-10 text-green-500"/>
              <p className="text-green-500">Question addedd successfully</p>
            </div>
          }
        </CardHeader>
        <CardContent className="p-2 sm:p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Question Title */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <FileText className="w-4 h-4" /> Question Title
              </Label>
              <Input
                className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                placeholder="What is closure in JS?"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            {/* Asked In & Subject */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2 w-full">
                <Label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Landmark className="w-4 h-4" /> Asked In (Company)
                </Label>
                <Select
                  value={askedIn}
                  onValueChange={(value) => {
                    setValue("askedIn", value.toLowerCase());
                    setAskedIn(value);
                  }}
                >
                  <SelectTrigger className="w-full dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
                    <SelectValue placeholder="Select Company" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
                    {CompanyList.map((list, index) => (
                      <SelectItem value={list.name} key={list.name + index}>
                        {list.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.askedIn && (
                  <p className="text-red-500 text-sm">
                    {errors.askedIn.message}
                  </p>
                )}
              </div>

              <div className="space-y-2 w-full">
                <Label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Book className="w-4 h-4" /> Subject
                </Label>
                <Select
                  value={subject}
                  onValueChange={(value) => {
                    setValue("subject", value.toLowerCase());
                    setSubject(value);
                  }}
                >
                  <SelectTrigger className="w-full dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
                    <SelectItem value="JavaScript">
                      <div className="flex items-center gap-2">
                        <Braces className="w-4 h-4 text-yellow-500" /> JavaScript
                      </div>
                    </SelectItem>
                    <SelectItem value="reactjs">
                      <div className="flex items-center gap-2">
                        <Atom className="w-4 h-4 text-sky-500" /> React.js
                      </div>
                    </SelectItem>
                    <SelectItem value="nodejs">
                      <div className="flex items-center gap-2">
                        <DatabaseZap className="w-4 h-4 text-green-600" /> Node.js
                      </div>
                    </SelectItem>
                    <SelectItem value="SQL">
                      <div className="flex items-center gap-2">
                        <DatabaseZap className="w-4 h-4 text-indigo-600" /> SQL
                      </div>
                    </SelectItem>
                    <SelectItem value="DSA">
                      <div className="flex items-center gap-2">
                        <BrainCircuit className="w-4 h-4 text-pink-600" /> DSA
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.subject && (
                  <p className="text-red-500 text-sm">
                    {errors.subject.message}
                  </p>
                )}
              </div>
            </div>

            {/* Experience Level & Difficulty */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2 w-full">
                <Label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <UserCog className="w-4 h-4" /> Experience Level
                </Label>
                <Select
                  value={forwhom}
                  onValueChange={(value) => {
                    setValue("for", value.toLowerCase());
                    setForwhom(value);
                  }}
                >
                  <SelectTrigger className="w-full dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
                    <SelectValue placeholder="Select Experience Level" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
                    <SelectItem value="Fresher">Fresher</SelectItem>
                    <SelectItem value="1-3 years">1-3 years</SelectItem>
                    <SelectItem value="3+ years">3+ years</SelectItem>
                  </SelectContent>
                </Select>
                {errors.for && (
                  <p className="text-red-500 text-sm">{errors.for.message}</p>
                )}
              </div>

              <div className="space-y-2 w-full">
                <Label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <SignalHigh className="w-4 h-4" /> Difficulty Level
                </Label>
                <Select
                  value={level}
                  onValueChange={(value) => {
                    setValue("level", value.toLowerCase());
                    setLevel(value);
                  }}
                >
                  <SelectTrigger className="w-full dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
                    <SelectValue placeholder="Select Difficulty" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
                    <SelectItem value="Easy" className="text-green-600">
                      Easy
                    </SelectItem>
                    <SelectItem value="Medium" className="text-orange-400">
                      Medium
                    </SelectItem>
                    <SelectItem value="Hard" className="text-red-600">
                      Hard
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.level && (
                  <p className="text-red-500 text-sm">{errors.level.message}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <StickyNote className="w-4 h-4" /> Description (Optional)
              </Label>
              <Textarea
                rows={7}
                placeholder="Explain your answer or provide context..."
                {...register("description")}
                className="min-h-[150px] resize-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer bg-indigo-600 text-white hover:bg-indigo-600"
            >
              {isSubmitting && (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              )}
              Submit Question
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
