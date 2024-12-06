"use client";

import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { RootState } from "@/state/store";
import Image from "next/image";
import {
  addItemToCart,
  reduceItemQuantityFromCart,
} from "@/state/Features/cart/cartSlice";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Card from "./Card";
import { shopData } from "@/constants";

interface Props {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
  category: string;
}

const ProductCard = ({ id, imgUrl, name, price, category }: Props) => {
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

  const reduceQuantity = () => {
    dispatch(reduceItemQuantityFromCart({ cartItems, itemToReduce: { id } }));
  };

  const increaseQuantity = () => {
    dispatch(
      addItemToCart({ cartItems, productToAdd: { id, name, imgUrl, price } })
    );
  };

  const quantity = cartItems.find((item) => {
    if (Number(item.id) === Number(id)) {
      return item.quantity;
    }
  });

  return (
    <div>
      <div className="flex flex-row justify-evenly gap-4">
        <div className="w-96 h-96 relative">
          <Image
            src={imgUrl}
            alt={name}
            layout="fill"
            className="border w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col w-7/12">
          <div className="border-b pb-4">
            <p>Home/{name}</p>
            <h1 className="text-4xl my-4">{name}</h1>
            <h2 className="text-2xl font-semibold">{"$" + price}</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptates libero autem fugiat dignissimos magni minus temporibus
              eligendi eius molestiae nostrum consectetur sint explicabo, aut
              quo quisquam sunt incidunt voluptas? Dolorum esse itaque officia
              cumque adipisci. Iure impedit id amet tempora, ea modi! Amet iste
              autem quis ducimus eum culpa, reprehenderit magnam, quaerat
              aliquid repellendus ut blanditiis praesentium sit, delectus vero
              nam nemo nostrum officia quam eligendi explicabo maxime
              exercitationem iure. Hic in quibusdam dolorem, minima error natus
              ducimus!
            </p>
          </div>
          <div className="flex gap-10 py-4">
            <div className="flex">
              <Button
                onClick={reduceQuantity}
                variant="outline"
                className="rounded-none border-gray-700 text-lg"
              >
                -
              </Button>
              <p className="border-y text-black border-gray-700 w-10 flex justify-center items-center text-lg">
                {quantity ? quantity.quantity : 0}
              </p>
              <Button
                onClick={increaseQuantity}
                variant="outline"
                className="rounded-none border-gray-700 text-lg"
              >
                +
              </Button>
            </div>
            <Button
              className="rounded-full uppercase text-lg font-semibold bg-red-500"
              onClick={addProductToCart}
            >
              Add to cart
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Tabs defaultValue="description" className="w-full">
          <TabsList>
            <TabsTrigger className="font-bold" value="description">
              Description
            </TabsTrigger>
            <TabsTrigger className="font-bold" value="reviews">
              Reviews
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
              beatae deleniti hic sapiente, temporibus dolores labore natus
              aliquid adipisci consectetur nisi nulla nemo, maxime ad
              cupiditate! Quod nobis eum facilis temporibus aspernatur rerum
              doloremque aliquid doloribus velit! Facere nostrum beatae
              molestias maiores consequuntur magnam repellendus accusantium
              expedita ipsum quasi. Sit consequuntur iste consectetur placeat
              nesciunt, neque nam! Laborum, asperiores sunt?
            </p>
            <br />
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea quia
              suscipit placeat blanditiis? Ullam repellat laboriosam non
              asperiores?
            </p>
          </TabsContent>
          <TabsContent value="reviews">Coming soon</TabsContent>
        </Tabs>
      </div>

      <div className="mt-12 w-full">
        <h1 className="text-6xl">Related Products</h1>
        <div className="flex flex-wrap gap-8 mt-12">
          {shopData
            .filter(
              (product) => product.category === category && product.id !== id
            )
            .slice(0, 4)
            .map((relatedProduct) => (
              <Card
                key={relatedProduct.id}
                id={relatedProduct.id}
                label={relatedProduct.name}
                price={relatedProduct.price}
                imgUrl={relatedProduct.imgUrl}
                category={relatedProduct.category}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
