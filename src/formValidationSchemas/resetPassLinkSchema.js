import * as z from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const UserEmai = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .nonempty("Email is required")
    .refine((val) => emailRegex.test(val), {
      message: "Invalid email format",
    }),
});

export { UserEmai };