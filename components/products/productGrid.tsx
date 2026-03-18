import { ProductCard } from "@/components/card";
import { FadeIn } from "@/components/ui/fade-in";
import { Product } from "@/lib/service/product";

interface ProductGridProps {
  products: Product[];
}



export const ProductGrid = ({ products }: ProductGridProps) => {
  // 🔍 DEBUG: Log incoming products count
  console.log("🛒 Rendering ProductGrid with", products?.length, "products");

  const formattedProducts = products.map((product) => ({
    id: product.id,
    name: product.name,
    price: typeof product.price === "number" 
      ? `Rp ${product.price.toLocaleString("id-ID")}`
      : product.price || "Contact for Price",
    image: product.images?.[0]?.url || "/leather-hero.png",
    description: product.description || "Handcrafted in Bali",
  }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
      {formattedProducts.map((product, index) => (
        <FadeIn
          key={`${product.id}-${index}`}
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
