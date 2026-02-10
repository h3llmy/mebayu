import { ProductCard } from "@/components/card";
import { FadeIn } from "@/components/ui/fade-in";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
}

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
      {products.map((product, index) => (
        <FadeIn
          key={product.id}
          direction="up"
          delay={0.1 * (index % 4)}
          duration={0.6}
        >
          <ProductCard product={product} />
        </FadeIn>
      ))}
    </div>
  );
};
