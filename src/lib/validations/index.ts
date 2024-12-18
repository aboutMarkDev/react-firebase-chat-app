import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Passwords must be at least 6 characters long." }),
});

export const signUpSchema = z.object({
  username: z.string().min(4, { message: "Too short!" }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Passwords must be at least 6 characters long." }),
});
