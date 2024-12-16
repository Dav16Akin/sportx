"use client";

import { RootState } from "@/state/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import Link from "next/link";
import { topbarLinks } from "@/constants";
import { setIsSiderbarOpen } from "@/state/Features/sidebar/sidebarSlice";

const Sidebar = () => {
  const dispatch = useDispatch();

  const isSidebarOpen = useSelector(
    (state: RootState) => state.sidebar.isSidebarOpen
  );

  useEffect(() => {
    // Set isCartOpen to false when the component mounts
    dispatch(setIsSiderbarOpen(false));
  }, [dispatch]);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => document.body.classList.remove("no-scroll");
  }, [isSidebarOpen]);

  const toggleCart = () => {
    dispatch(setIsSiderbarOpen(!isSidebarOpen));
  };

  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <>
          <div
            onClick={toggleCart}
            className="w-full h-full fixed inset-0 z-50 top-0 left-0 bg-gray-300 opacity-85"
          />
          <motion.div
            initial={{ x: -1000 }}
            animate={{ x: 1 }}
            transition={{ duration: 0.5, ease: "linear" }}
            className=" w-80 bg-white flex flex-col border h-full fixed right-0 top-0 z-50"
          >
            <div className="w-full justify-between p-4 border-b ">
              <p></p>
              <IoClose
                onClick={toggleCart}
                size="30px"
                className="text-black cursor-pointer"
                aria-label="Close cart"
              />
            </div>
            <div className="p-2 flex flex-col gap-4 overflow-y-scroll">
              {topbarLinks.map((data) => {
                return (
                    <Link
                    onClick={toggleCart}
                    key={data.label}
                    className={`font-mono text-3xl  hover:text-red-500`}
                    href={data.route}
                  >
                    {data.label}
                  </Link>
                );
              })}
            </div>
              
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
