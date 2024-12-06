"use client"

import { TooltipContent, TooltipProvider } from "@radix-ui/react-tooltip";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoCartSharp } from "react-icons/io5";
import { Tooltip, TooltipTrigger } from "../ui/tooltip";
import { RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "@/state/Features/cart/cartSlice";
import { useToast } from "@/hooks/use-toast";

interface Props {
  id: number;
  label: string;
  price: number;
  imgUrl: string;
  category: string;
}

const Card = ({ id, label, price, imgUrl, category }: Props) => {
  const { toast } = useToast();
  const cartItems = useSelector(
    (state: RootState) => state.cart.cart.cartItems
  );
  const dispatch = useDispatch();

  const addProductToCart = () => {
    dispatch(
      addItemToCart({
        cartItems,
        productToAdd: { id, name, imgUrl, price, category },
      })
    );

    toast({
      id: `${id}-added`,
      title: "Product added to cart",
      description: "You successfully added the product to your cart!",
    });
  };
  return (
    <Link href={`/product/${id}`} className="flex flex-col">
      <div className="w-72 h-72 relative overflow-hidden">
        <Image
          src={imgUrl}
          alt={label}
          layout="fill"
          objectFit="cover"
          className="bg-gray-300 hover:scale-125 transition-all ease-in duration-300"
        />
        <div onClick={addProductToCart} className="rounded-full bg-white z-30 shadow-lg absolute right-2 top-2 w-8 h-8 flex items-center justify-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <IoCartSharp
                  size="20px"
                  className="text-gray-700 cursor-pointer"
                />
              </TooltipTrigger>
              <TooltipContent className="z-30 text-xs bg-black rounded-full text-white p-1">
                Add to cart
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="space-y-2 py-4">
        <h1 className="text-2xl">{label}</h1>
        <p>{"$" + price}</p>
      </div>
    </Link>
  );
};

export default Card;
