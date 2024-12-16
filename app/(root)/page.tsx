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
        <div className="w-full min-h-screen max-sm:h-98 relative flex items-center justify-center">
          <div className="w-full h-screen max-sm:h-98 bg-black opacity-45 z-10 absolute"></div>
          <Image src={banner} alt="Banner" layout="fill" className="max-sm:object-cover" />
          <div className="z-20 absolute text-white  top-1/4 max-sm:top-32 text-center flex flex-col items-center gap-8">
            <h1 className="font-bold text-8xl max-sm:text-4xl">Let's Level Up Your Game</h1>
            <p className="w-1/2 max-sm:text-[10px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              iure explicabo sint numquam tempore, doloremque obcaecati ipsum 
              quidem omnis iste dolorem praesentium. Qui maxime dolor veniam
              laborum ducimus aliquam dolores.
            </p>

            <Link href="/shop">
              <Button className="rounded-full text-xl max-sm:text-sm text-black bg-white font-semibold hover:bg-slate-100">
                Shop now
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col w-full h-full p-12 max-sm:p-4">
          <h1 className="text-3xl py-12">Shop by Category</h1>
          <div className="flex flex-wrap-reverse gap-3 justify-center w-full h-full">
            {categoryData.map((category) => {
              return (
                <div className="h-full relative  max-sm:h-[200px]">
                  <Image
                    src={category.imgUrl}
                    alt={category.name}
                    width={610}
                    height={100}
                    className="object-cover h-[500px] max-sm:h-[200px]"
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

        <div className="p-12 max-sm:p-2">
          <h1 className="text-2xl p-12 max-sm:p-2">The Latest drop</h1>
          <div className="flex max-sm:grid max-sm:grid-cols-2 max-sm:gap-4 justify-evenly p-4">
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
