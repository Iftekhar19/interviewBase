import * as z from "zod";
const AddQuestion = z.object({
  title: z.string("Title is required").nonempty("Title is required"),
  askedIn: z
    .string("Company is required")
    .nonempty("Company is required"),
  subject: z.string("Subject is required").nonempty("Subject is required"),
  for: z.string("Experience level is required").nonempty("Experience level is required"),
  description: z
    .string("Description is required")
    .optional(),
  level: z.string("Difficulty level is required").nonempty("Difficulty level is required"),
});

export { AddQuestion as AddQuestionSchema };
