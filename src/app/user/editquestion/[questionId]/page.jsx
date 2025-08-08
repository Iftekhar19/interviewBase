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
import { getUpdatedValues } from "@/utility/getUpdatedValue";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
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
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Title is required and must be at least 5 characters."),
  askedIn: z.string().min(2, "Company name is required."),
  subject: z.string().min(2, "Subject is required."),
  for: z.string().min(2, "Experience level is required."),
  level: z.string().min(2, "Level is required."),
  description: z.string().optional(),
});

export default function AddQuestionForm() {
  const [askedIn, setAskedIn] = useState("");
  const [forWhom, setForWhom] = useState("");
  const [level, setLevel] = useState("");
  const [subject, setSubject] = useState("");
  const [oldData, setOldData] = useState({
    title: "",
    askedIn: "",
    subject: "",
    for: "",
    level: "",
    description: "",
  });
  const router=useRouter()
  const params = useParams();
  const [apiError, setApiError] = useState({
    isError: false,
    message: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data) => {
    try {
      console.log("Submitted Data:", data);
      const updatedobj=getUpdatedValues(oldData,data)
      console.log(updatedobj)
      await axios.patch(`/api/questions/updatequestion/${params.questionId}`,JSON.stringify(updatedobj))
      router.back()
    } catch (err) {
      console.error(err?.response?.data?.message||"Unexpected error occured");
      setApiError({
        isError:true,
        message:err?.response?.data?.message||"Unexpected error occured"
      })
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setApiError({
          isError: false,
          message: "",
        });
        const res = await axios.get(
          `/api/questions/getquestion/${params.questionId}`
        );
        const data = res.data;
        console.log(data.message);
        setValue("askedIn", data.message.askedIn);
        setValue("title", data.message.title);
        setValue("description", data.message.description||"");
        setValue("for", data.message.for);
        setValue("level", data.message.level);
        setValue("subject", data.message.subject);
        await Promise.all([
          setAskedIn(data.message.askedIn),
          setLevel(data.message.level),
          setSubject(data.message.subject),
          setForWhom(data.message.for),
          setOldData({
            title: data.message.title,
            askedIn: data.message.askedIn,
            subject: data.message.subject,
            for: data.message.for,
            level: data.message.level,
            description: data.message.description||"",
          }),
        ]);
      } catch (error) {
        console.log(
          error?.response?.data?.message || "unexpected error occured"
        );
        setApiError({
          isError: true,
          message: error?.response?.data?.message || "unexpected error occured",
        });
      }
    })();
  }, []);

  return (
    <div className="w-full px-1 sm:px-6 lg:px-8 max-w-4xl mx-auto mt-1 sm:mt-6">
      <Card className="shadow-xl border border-gray-200">
        <CardHeader className={`w-full `}>
          <h1 className="flex w-full  text-center items-center gap-2 text-2xl font-black text-indigo-600 tracking-tight bg-gradient-to-r from-indigo-500 via-sky-400 to-pink-400 bg-clip-text text-transparent">
            Submit a New Interview Question
          </h1>
          {apiError && (
            <p className="text-red-600 text-sm font-semibold">
              {apiError.message}
            </p>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <FileText className="w-4 h-4" /> Question Title
              </Label>
              <Input
                placeholder="What is closure in JS?"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2 w-full">
                <Label className="flex items-center gap-2">
                  <Landmark className="w-4 h-4" /> Asked In (Company)
                </Label>
                <Select
                  value={askedIn}
                  onValueChange={(value) => {
                    setValue("askedIn", value);
                    setAskedIn(value);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Company" />
                  </SelectTrigger>
                  <SelectContent>
                    {CompanyList.map((list, index) => (
                      <SelectItem
                        value={list.name.toLowerCase()}
                        key={list.name + index}
                      >
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
                <Label className="flex items-center gap-2">
                  <Book className="w-4 h-4" /> Subject
                </Label>
                <Select
                  value={subject}
                  onValueChange={(value) => {
                    setValue("subject", value);
                    setSubject(value);
                  }}
                  disabled={true}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="javaScript">
                      <div className="flex items-center gap-2">
                        <Braces className="w-4 h-4 text-yellow-500" />{" "}
                        JavaScript
                      </div>
                    </SelectItem>
                    <SelectItem value="reactjs">
                      <div className="flex items-center gap-2">
                        <Atom className="w-4 h-4 text-sky-500" /> React.js
                      </div>
                    </SelectItem>
                    <SelectItem value="nodejs">
                      <div className="flex items-center gap-2">
                        <DatabaseZap className="w-4 h-4 text-green-600" />{" "}
                        Node.js
                      </div>
                    </SelectItem>
                    <SelectItem value="sql">
                      <div className="flex items-center gap-2">
                        <DatabaseZap className="w-4 h-4 text-indigo-600" /> SQL
                      </div>
                    </SelectItem>
                    <SelectItem value="dsa">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2 w-full">
                <Label className="flex items-center gap-2">
                  <UserCog className="w-4 h-4" /> Experience Level
                </Label>
                <Select
                  value={forWhom}
                  onValueChange={(value) => {
                    setValue("for", value);
                    setForWhom(value);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Experience Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fresher">Fresher</SelectItem>
                    <SelectItem value="1-3 years">1-3 years</SelectItem>
                    <SelectItem value="3+ years">3+ years</SelectItem>
                  </SelectContent>
                </Select>
                {errors.for && (
                  <p className="text-red-500 text-sm">{errors.for.message}</p>
                )}
              </div>

              <div className="space-y-2 w-full">
                <Label className="flex items-center gap-2">
                  <SignalHigh className="w-4 h-4" /> Difficulty Level
                </Label>
                <Select
                  value={level}
                  onValueChange={(value) => {
                    setValue("level", value);
                    setLevel(value);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy" className={`text-green-600`}>
                      Easy
                    </SelectItem>
                    <SelectItem value="medium" className={`text-orange-400`}>
                      Medium
                    </SelectItem>
                    <SelectItem value="hard" className={`text-red-600`}>
                      Hard
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.level && (
                  <p className="text-red-500 text-sm">{errors.level.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <StickyNote className="w-4 h-4" /> Description (Optional)
              </Label>
              <Textarea
                rows={7}
                placeholder="Explain your answer or provide context..."
                {...register("description")}
                className={`min-h-[150px] resize-none`}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer bg-gradient-to-r from-indigo-500 to-pink-500 text-white "
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : null}
              Submit Question
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
