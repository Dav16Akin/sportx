import ProductCard from "@/components/shared/ProductCard";
import { shopData } from "@/constants";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  // Filter the product data based on the `id` from params
  const data = shopData.filter((item) => String(item.id) === id);

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
