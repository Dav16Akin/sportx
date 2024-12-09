import { clearCart } from "@/state/Features/cart/cartSlice";
import { RootState } from "@/state/store";
import { redirect } from "next/navigation";
import React from "react";
import { PaystackButton } from "react-paystack";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  amount: number;
  email: string;
}

const PaystackIntegration = ({ amount, email }: Props) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(
    (state: RootState) => state.cart.cart.cartItems
  );
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_KEY || ""; // Replace with your Paystack public key

  if (amount <= 0) {
    return <p>Invalid amount specified</p>;
  }

  const AMOUNT = amount * 100; // Amount in kobo (e.g., 5000 NGN = 5000 * 100 kobo)

  const onSuccess = (reference: any) => {
    console.log("Payment successful:", reference);
    dispatch(clearCart({ cartItems }));
    redirect("/")
    // Handle post-payment actions like saving data to your database
  };

  const onClose = () => {
    console.log("Payment window closed");
  };

  const componentProps = {
    email,
    amount: AMOUNT,
    publicKey,
    text: "Pay Now",
    onSuccess,
    onClose,
  };

  return <PaystackButton {...componentProps} />;
};

export default PaystackIntegration;
