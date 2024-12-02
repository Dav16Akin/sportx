import ProductCard from "@/components/shared/ProductCard";
import { shopData } from "@/constants";

interface PageProps {
  params: {
    id: string;
  };
}

const page = ({ params }: PageProps) => {
  // Filter the product data based on the `id` from params
  const data = shopData.filter((item) => String(item.id) === params.id);

  return (
    <div className="p-24 m-10 bg-white">
      {data.map((info) => (
        <ProductCard
          key={info.id}
          id={info.id}
          name={info.name}
          price={info.price}
          imgUrl={info.imgUrl}
          category={info.category}
        />
      ))}
    </div>
  );
};

export default page;
