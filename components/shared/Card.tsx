import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoCartSharp } from "react-icons/io5";

interface Props {
  id: number;
  label: string;
  price: number;
  imgUrl: string;
  category: string
}

const Card = ({ id, label, price, imgUrl, category }: Props) => {
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
        <div className="rounded-full bg-white absolute right-2 top-2 w-8 h-8 flex items-center justify-center">
          <IoCartSharp size="20px" className="text-gray-700 cursor-pointer" />
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
