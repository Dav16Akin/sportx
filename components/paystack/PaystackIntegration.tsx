"use client";

export const dynamic = "force-dynamic";

import { useRouter } from "next/navigation";
import React from "react";
import { PaystackButton } from "react-paystack";

interface Props {
  amount: number;
  email: string;
}

const PaystackIntegration = ({ amount, email }: Props) => {
  const router = useRouter();

  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_KEY || ""; // Ensure this is define

  if (amount <= 0) {
    return <p>Invalid amount specified</p>;
  }

  const AMOUNT = amount * 100; // Amount in kobo (e.g., 5000 NGN = 5000 * 100 kobo)

  const onSuccess = (reference: any) => {
    console.log("Payment successful:", reference);
 
    router.push("/"); // Use router for client-side navigation
  };

  const onClose = () => {
    console.log("Payment closed");
  };

  const componentProps = {
    email,
    amount: AMOUNT,
    publicKey,
    text: "Confirm Payment",
    onSuccess,
    onClose,
  };

  return <PaystackButton {...componentProps} />;
};

export default PaystackIntegration;
