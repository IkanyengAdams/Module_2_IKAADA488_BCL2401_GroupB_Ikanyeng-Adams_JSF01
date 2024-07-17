import ProductCard from "./ProductCard";
import CardSkeleton from "./CardSkeleton";
import { useProductStore } from "../../store/productStore";
import Error from "../Error";

export default function ProductList() {
  const { products, loading, error } = useProductStore((state) => ({
    products: state.products,
    loading: state.loading,
    error: state.error,
  }));

  if (loading && !error) {
    return (
      <div className="grid justify-center">
        <div className="lg:max-h-[130rem] max-w-xl mx-auto grid gap-4 grid-cols-1 lg:grid-cols-4 md:grid-cols-2 items-center lg:max-w-none my-4">
          {new Array(20).fill(null).map((item, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="grid justify-center">
        <Error {...error} />;
      </div>
    );
  }

  return (
    <div className="grid justify-center">
      <div className="lg:max-h-[130rem] max-w-xl mx-auto grid gap-4 grid-cols-1 lg:grid-cols-4 md:grid-cols-2 items-center lg:max-w-none my-4">
        {products.map((product) => {
          return <ProductCard key={product.id} {...product} />;
        })}
      </div>
    </div>
  );
}
