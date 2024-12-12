"use client";

export const dynamic = "force-dynamic";

import { PaymentValidation } from "@/lib/validations/payment";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import PaystackIntegration from "../paystack/PaystackIntegration";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

const CustomForm = () => {
  const cartItems = useSelector(
    (state: RootState) => state.cart.cart.cartItems
  );

  // Compute total amount safely
  const totalAmount = useMemo(() => {
    if (!cartItems) return 0;
    return cartItems
      .reduce((total, item) => total + item.quantity * item.price, 0)
      .toFixed(2);
  }, [cartItems]);

  const form = useForm({
    resolver: zodResolver(PaymentValidation),
    defaultValues: {
      email: "",
      amount: Number(totalAmount),
    },
  });

  const email = form.watch("email");
  const amount = form.watch("amount");

  const onSubmit = async (values: z.infer<typeof PaymentValidation>) => {
    form.reset();
    values.amount = Number(values.amount); // Ensure amount is a number
    values.amount = 0; // Clear the amount after submission
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
                <Input
                  type="number"
                  placeholder="Amount..."
                  disabled
                  value={totalAmount} // Lock the amount field
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <PaystackIntegration amount={Number(amount)} email={email} />
      </form>
    </Form>
  );
};

export default CustomForm;
