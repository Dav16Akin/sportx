"use client";

import CustomerInfoForm from "@/components/shared/CustomerInfoForm";
import CustomForm from "@/components/shared/CustomForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RootState } from "@/state/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const page = () => {
  const [isInfoComplete, setIsInfoComplete] = useState(false);
  const [activeTab, setActiveTab] = useState("Information");

  
  const cartItems = useSelector(
    (state: RootState) => state.cart.cart.cartItems
  );

  let Total = cartItems.reduce(
    (Total, item) => Total + item.quantity * item.price,
    0
  );

  const handleInfoSubmit = (isComplete: boolean) => {
    setIsInfoComplete(isComplete);
    if (isComplete) {
      setActiveTab("Payment"); // Switch to Payment tab
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
          <TabsTrigger className="font-bold" value="Payment" disabled={!isInfoComplete}>
            Payment
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Information">
          <CustomerInfoForm onInfoSubmit={handleInfoSubmit} />
        </TabsContent>
        <TabsContent value="Payment">
          <CustomForm total={Total} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
