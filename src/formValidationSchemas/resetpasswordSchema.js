import * as z from "zod";
const UserResetPass=  z.object({

   password:z.string("Password is required").nonempty("Password is required"),
   confirmPassword:z.string("Confirm Password is required").nonempty("Confirm Password is required")
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],   
   // Specify the field for the error message
  });

export {UserResetPass}