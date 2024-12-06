"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RootState } from "@/state/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  addItemToCart,
  reduceItemQuantityFromCart,
  removeItemFromCart,
} from "@/state/Features/cart/cartSlice";
import Image from "next/image";
import { IoCloseCircleOutline } from "react-icons/io5";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

const page = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const cartItems = useSelector(
    (state: RootState) => state.cart.cart.cartItems
  );

  const removeProductFromCart = (id: string) => {
    dispatch(
      removeItemFromCart({
        cartItems,
        productToRemove: { id },
      })
    );
    toast({
      id: `${id}-added`,
      title: "Cart updated",
      description: "You successfully edited your cart!",
    });
  };

  const reduceQuantity = (id: string) => {
    dispatch(reduceItemQuantityFromCart({ cartItems, itemToReduce: { id } }));
    toast({
      id: `${id}-added`,
      title: "Cart updated",
      description: "You successfully edited your cart!",
    });
  };

  const increaseQuantity = (
    id: string,
    name: string,
    imgUrl: string,
    price: number
  ) => {
    dispatch(
      addItemToCart({ cartItems, productToAdd: { id, name, imgUrl, price } })
    );
    toast({
      id: `${id}-added`,
      title: "Cart updated",
      description: "You successfully edited your cart!",
    });
  };

  return (
    <div className="m-14">
      <div className="bg-white flex flex-col">
        <div className="flex justify-between items-center p-2">
          <h1 className="text-4xl">Cart</h1>
          <Link href="/shop">
            <Button className="rounded-full bg-red-500">
              Continue shopping
            </Button>
          </Link>
        </div>

        <div>
          <div>
            <Table>
              <TableCaption>A list of your products in your cart</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead></TableHead>
                  <TableHead className="w-[100px]">Product</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead className="text-right">SubTotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartItems.map((cartItem) => (
                  <TableRow key={cartItem.id}>
                    <TableCell>
                      <IoCloseCircleOutline
                        size="20px"
                        onClick={() => removeProductFromCart(cartItem.id)}
                        className="cursor-pointer"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="relative w-16 h-16">
                        <Image
                          src={cartItem.imgUrl}
                          alt={cartItem.name}
                          layout="fill"
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {cartItem.name}
                    </TableCell>
                    <TableCell>{cartItem.price}</TableCell>
                    <TableCell>
                      <div className="flex">
                        <Button
                          onClick={() => reduceQuantity(cartItem.id)}
                          variant="outline"
                          className="rounded-none border-gray-700 text-lg"
                        >
                          -
                        </Button>
                        <p className="border-y border-gray-700 w-10 flex justify-center items-center text-lg">
                          {cartItem.quantity}
                        </p>
                        <Button
                          onClick={() =>
                            increaseQuantity(
                              cartItem.id,
                              cartItem.name,
                              cartItem.imgUrl,
                              cartItem.price
                            )
                          }
                          variant="outline"
                          className="rounded-none border-gray-700 text-lg"
                        >
                          +
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {cartItem.price * cartItem.quantity}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={5}>Total</TableCell>
                  <TableCell className="text-right">
                    $
                    {cartItems.reduce(
                      (total, item) => total + item.quantity * item.price,
                      0
                    )}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>
        <Link className="w-full" href="/checkout">
          <Button className="p-4 m-14 bg-black">Buy now</Button>
        </Link>
      </div>
    </div>
  );
};

export default page;
