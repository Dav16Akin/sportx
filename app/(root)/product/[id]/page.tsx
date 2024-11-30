import ProductCard from "@/components/shared/ProductCard";
import { shopData } from "@/constants";

const page = async ({ params }: { params: { id: string } }) => {
  const product = await params;

  const data = shopData.filter((item) => item.id === parseInt(product.id));

  return (
    <div className="p-24 m-10 bg-white">
      {data.map((info) => {
        return (
          <ProductCard
            key={info.id}
            id={info.id}
            name={info.name}
            price={info.price}
            imgUrl={info.imgUrl}
            category={info.category}
          />
        );
      })}
    </div>
  );
};

export default page;
