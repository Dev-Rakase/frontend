import { z } from "zod";

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password required" }),
});

export const registerUserSchema = loginUserSchema.extend({
  name: z.string().min(1, { message: "Not a valid name" }),
});
