import { addItemToCart, reduceItemQuantityFromCart, removeItemFromCart } from "@/state/Features/cart/cartSlice";
import { RootState } from "@/state/store";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Button } from "../ui/button";

interface Props {
  id: string;
  name: string;
  imgUrl: string;
  price: number;
  quantity: number;
}

const CartCard = ({ id, name, imgUrl, price, quantity }: Props) => {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state: RootState) => state.cart.cart.cartItems
  );

  const removeProductFromCart = () => {
    dispatch(
      removeItemFromCart({
        cartItems,
        productToRemove: { id, name, imgUrl, price },
      })
    );
  };

  const reduceQuantity = () => {
    dispatch(
      reduceItemQuantityFromCart({cartItems, itemToReduce: {id}})
    )
  }

  const increaseQuantity = () => {
    dispatch(
      addItemToCart({cartItems, productToAdd: {id, name, imgUrl, price}})
    )
  }

  return (
    <div
      key={id}
      className="flex z-50 items-center justify-evenly w-full gap-4 h-24 border-b"
    >
      <div className="relative w-16 h-16">
        <Image src={imgUrl} alt={name} layout="fill" className="object-cover" />
      </div>

      <div>
        {name}
        <div>
          <div className="flex">
            <Button
              onClick={reduceQuantity}
              variant="outline"
              className="rounded-none border-gray-700 text-lg"
            >
              -
            </Button>
            <p className="border-y border-gray-700 w-10 flex justify-center items-center text-lg">
              {quantity}
            </p>
            <Button
              onClick={increaseQuantity}
              variant="outline"
              className="rounded-none border-gray-700 text-lg"
            >
              +
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <IoCloseCircleOutline
          size="20px"
          onClick={removeProductFromCart}
          className="cursor-pointer"
        />
        <p>{price * quantity}</p>
      </div>
    </div>
  );
};

export default CartCard;
