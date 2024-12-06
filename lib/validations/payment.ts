import * as z from "zod"

export const PaymentValidation = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    amount: z.number().positive("Amount must be greater than 0"),
})