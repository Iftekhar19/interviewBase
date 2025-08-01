import * as z from "zod";
const AddQuestion = z.object({
  title: z.string("title is required").nonempty("title is required"),
  askedIn: z
    .string({ required_error: "askinIn is required" })
    .nonempty("askinIn is required"),
  subject: z.string("subject is required").nonempty("subject is required"),
  for: z.string("for is required").nonempty("for is required"),
  description: z
    .string("description is required")
    .nonempty("description is required"),
  level: z.string("level is required").nonempty("level is required"),
});

export { AddQuestion };
