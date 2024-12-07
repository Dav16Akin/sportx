import { PaymentValidation } from "@/lib/validations/payment";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import PaystackIntegration from "../paystack/PaystackIntegration";

interface Props {
  total: number;
}

const CustomForm = ({ total }: Props) => {
  const form = useForm({
    resolver: zodResolver(PaymentValidation),
    defaultValues: {
      email: "",
      amount: Number(total),
    },
  });

  const email = form.watch("email");
  const amount = form.watch("amount");

  const onSubmit = async (values: z.infer<typeof PaymentValidation>) => {
    values.amount = 0
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Amount..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          <PaystackIntegration amount={Number(amount)} email={email} />
        </Button>
      </form>
    </Form>
  );
};

export default CustomForm;
