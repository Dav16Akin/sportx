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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { clearCart } from "@/state/Features/cart/cartSlice";
import { FaCheckCircle } from "react-icons/fa";

const CustomForm = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

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
    dispatch(clearCart({ cartItems }));
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

        <AlertDialog>
          <Button type="submit">
            <AlertDialogTrigger>Confirm payment</AlertDialogTrigger>
          </Button>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Success</AlertDialogTitle>
              <AlertDialogDescription>
                <div className="">
                  <div>
                    <FaCheckCircle
                    size="50px" />
                  </div>
                  <h1>Payment Successful</h1>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction >Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </Form>
  );
};

export default CustomForm;
