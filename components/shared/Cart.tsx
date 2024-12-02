"use client";

import { RootState } from "@/state/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { setIsCartOpen } from "@/state/Features/cart/cartSlice";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import CartCard from "./CartCard";
import { Button } from "../ui/button";

const Cart = () => {
  const dispatch = useDispatch();

  const isCartOpen = useSelector(
    (state: RootState) => state.cart.cart.isCartOpen
  );
  const cartItems = useSelector(
    (state: RootState) => state.cart.cart.cartItems
  );

  // useEffect(() => {
  //   // Set isCartOpen to false when the component mounts
  //   dispatch(setIsCartOpen(false));
  // }, [dispatch]);

  useEffect(() => {
    if (isCartOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => document.body.classList.remove("no-scroll");
  }, [isCartOpen]);

  const toggleCart = () => {
    dispatch(setIsCartOpen(!isCartOpen));
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <div
            onClick={toggleCart}
            className="w-full h-full fixed inset-0 z-50 top-0 left-0 bg-gray-300 opacity-85"
          />
          <motion.div
            initial={{ x: 1000 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5, ease: "linear" }}
            className="w-[500px] bg-white  justify-between flex flex-col border h-full fixed right-0 top-0 z-50"
          >
            <div className="w-full flex justify-between p-4 border-b ">
              <h1>Shopping Cart</h1>
              <IoClose
                onClick={toggleCart}
                size="30px"
                className="text-black cursor-pointer"
                aria-label="Close cart"
              />
            </div>
            <div className="p-2 flex-1 overflow-y-scroll">
              {cartItems.map((item) => {
                return (
                  <CartCard
                    key={item.id}
                    id={item.id}
                    price={item.price}
                    quantity={item.quantity}
                    imgUrl={item.imgUrl}
                    name={item.name}
                  />
                );
              })}
            </div>

            <div className=" bg-white">
              <div className="flex justify-between py-4 px-2 border-y text-lg">
                <h1>SubTotal: </h1>
                <h1>
                  Total : $
                  {cartItems.reduce(
                    (total, item) => total + item.quantity * item.price,
                    0
                  )}
                </h1>
              </div>
              <div className=" flex flex-col gap-4 p-4 w-full">
                <Button className="rounded-full bg-red-500">VIEW CART</Button>
                <Button className="rounded-full bg-red-500">CHECKOUT</Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
