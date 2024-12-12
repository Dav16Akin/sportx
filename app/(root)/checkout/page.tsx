"use client";

export const dynamic = "force-dynamic";

import CustomerInfoForm from "@/components/shared/CustomerInfoForm";
import CustomForm from "@/components/shared/CustomForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";

const page = () => {
  const [isInfoComplete, setIsInfoComplete] = useState(false);
  const [activeTab, setActiveTab] = useState("Information");


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
        {/* <TabsContent value="Information">
          <CustomerInfoForm onInfoSubmit={handleInfoSubmit} />
        </TabsContent>
        <TabsContent value="Payment">
          <CustomForm/>
        </TabsContent> */}
      </Tabs>
    </div>
  );
};

export default page;
