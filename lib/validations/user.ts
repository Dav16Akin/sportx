import * as z from "zod"

export const UserValidation = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    firstname: z.string().min(1, { message: "First name is required" }),
    lastname: z.string().min(1, { message: "Last name is required" }),
    country: z.string().min(1, { message: "Country is required" }),
    address: z.string().min(1, { message: "Address is required" }),
    town: z.string().min(1, { message: "Town/City is required" }),
    phonenumber: z
      .string()
      .regex(/^\+?[0-9]{10,15}$/, { message: "Invalid phone number" }),
  });