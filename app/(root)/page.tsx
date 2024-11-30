import Image from "next/image";
import banner from "@/public/assets/banner.jpg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { categoryData, shopData } from "@/constants";
import { MdArrowRightAlt } from "react-icons/md";
import Card from "@/components/shared/Card";

export default function Home() {
  return (
    <section className="">
      <div>
        <div className="w-full min-h-screen relative flex items-center justify-center">
          <div className="w-full h-screen bg-black opacity-45 z-10 absolute"></div>
          <Image src={banner} alt="Banner" layout="fill" />
          <div className="z-20 absolute text-white  top-1/4 text-center flex flex-col items-center gap-8">
            <h1 className="font-bold text-8xl ">Let's Level Up Your Game</h1>
            <p className="w-1/2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              iure explicabo sint numquam tempore, doloremque obcaecati ipsum
              quidem omnis iste dolorem praesentium. Qui maxime dolor veniam
              laborum ducimus aliquam dolores.
            </p>

            <Link href="/shop">
              <Button className="rounded-full text-xl text-black bg-white font-semibold hover:bg-slate-100">
                Shop now
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col w-full h-full p-12">
          <h1 className="text-3xl py-12">Shop by Category</h1>
          <div className="flex flex-wrap-reverse gap-3 justify-center w-full h-full">
            {categoryData.map((category) => {
              return (
                <div className="h-full relative">
                  <Image
                    src={category.imgUrl}
                    alt={category.name}
                    width={610}
                    height={100}
                    className="object-cover h-[500px]"
                  />
                  <Link href="/shop" className="absolute bottom-5 left-5">
                    <Button className="rounded-full uppercase p-4 hover:bg-slate-50 bg-white text-black">
                      {category.name} <MdArrowRightAlt />
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-12">
          <h1 className="text-2xl p-12">The Latest drop</h1>
          <div className="flex justify-evenly p-4">
            {shopData.slice(0, 4).map((item) => {
              return (
                <Card
                  id={item.id}
                  imgUrl={item.imgUrl}
                  label={item.name}
                  price={item.price}
                  key={item.id}
                  category={item.category}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
