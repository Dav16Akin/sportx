"use client";

import Link from "next/link";
import { topbarLinks } from "@/constants/index";
import { IoCartSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { setIsCartOpen } from "@/state/Features/cart/cartSlice";
import { usePathname } from "next/navigation";

const Topbar = () => {
  const isCartOpen = useSelector(
    (state: RootState) => state.cart.cart.isCartOpen
  );
  const cartItems = useSelector(
    (state: RootState) => state.cart.cart.cartItems
  );
  const dispatch = useDispatch();
  const pathname = usePathname();

  const toggleCart = () => {
    document.body.classList.add("no-scroll");
    dispatch(setIsCartOpen(!isCartOpen));
  };
  

  return (
    <section className="flex justify-between items-center bg-white text-inherit sticky h-16 px-20">
      <div className="flex flex-row gap-12 items-center">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold">
            <Link href="/">
              SPORT<span className="text-red-700 text-3xl">X</span>
            </Link>
          </h1>
        </div>
        <div className="flex items-center gap-8 uppercase">
          {topbarLinks.map((data) => {
            const isActive =
              (pathname.includes(data.route) && data.route.length > 1) ||
              pathname === data.route;
            return (
              <Link
                key={data.label}
                className={`font-mono hover:text-red-500 ${
                  isActive && "text-red-500"
                }`}
                href={data.route}
              >
                {data.label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex gap-8">
        <span className="font-semibold text-red-500">${cartItems.reduce(
                        (total, item) => total + item.quantity * item.price,
                        0
                      ).toFixed(2)}</span>
        <div className="relative">
          <IoCartSharp
            onClick={toggleCart}
            size="20px"
            className="text-red-500 cursor-pointer"
          />
          <div className="text-white font-semibold text-sm flex items-center justify-center absolute -top-2 -right-3 bg-red-500 rounded-full w-4 h-4">
            <p className="">
              {cartItems.reduce((total, item) => total + item.quantity, 0)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
