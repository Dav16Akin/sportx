import React, { Suspense } from "react";
import { shopData } from "@/constants";
import Card from "@/components/shared/Card";
import Loading from "../shop/loading";

const page = () => {
  return (
    <div className="flex flex-col w-full p-8">
      <h1>Home/Men</h1>
      <div className="grid grid-cols-4 gap-2 py-8">
        {shopData
          .filter(
            (item) =>
              item.category.includes("men") || item.category.includes("shoes")
          )
          .map((data) => {
            return (
              <Suspense fallback={<Loading />}>
                <div className="m-0">
                  <Card
                    key={data.id}
                    id={data.id}
                    label={data.name}
                    price={data.price}
                    imgUrl={data.imgUrl}
                    category={data.category}
                  />
                </div>
              </Suspense>
            );
          })}
      </div>
    </div>
  );
};

export default page;
