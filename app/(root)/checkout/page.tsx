"use client";

export const dynamic = "force-dynamic";

import CustomerInfoForm from "@/components/shared/CustomerInfoForm";
import CustomForm from "@/components/shared/CustomForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RootState } from "@/state/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const page = () => {
  const [isInfoComplete, setIsInfoComplete] = useState(false);
  const [activeTab, setActiveTab] = useState("Information");
  const [total, setTotal] = useState(0);

  const cartItems = useSelector(
    (state: RootState) => state.cart.cart.cartItems
  );

  useEffect(() => {
    if (typeof window !== "undefined" && cartItems) {
      // Code that accesses `window` should be inside this block
      const total = cartItems.reduce(
        (Total, item) => Total + item.quantity * item.price,
        0
      );
      setTotal(total);
    }
  }, [cartItems]);

  const handleInfoSubmit = (isComplete: boolean) => {
    setIsInfoComplete(isComplete);
    if (isComplete) {
      setActiveTab("Payment");
    }
  };

  return (
    <div className="p-24 m-10 bg-white">
      <div>
        <h1 className="text-4xl">Checkout</h1>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger className="font-bold" value="Information">
            Information
          </TabsTrigger>
          <TabsTrigger
            className="font-bold"
            value="Payment"
            disabled={!isInfoComplete}
          >
            Payment
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Information">
          <CustomerInfoForm onInfoSubmit={handleInfoSubmit} />
        </TabsContent>
        <TabsContent value="Payment">
          <CustomForm total={total} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
