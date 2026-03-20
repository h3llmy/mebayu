import { HeroSection } from "@/components/organisms/Home/heroSection";
import { AboutSection } from "@/components/organisms/Home/aboutSection";
import { FeaturesSection } from "@/components/organisms/Home/featuresSection";
import { ProductSection } from "@/components/organisms/Home/productSection";
import { TestimonialsSection } from "@/components/organisms/Home/testimonialsSection";
import { CraftsmanshipSection } from "@/components/organisms/Home/craftsmanshipSection";
import { CtaSection } from "@/components/organisms/Home/ctaSection";
import { ProductService } from "@/lib/service/product/productService";

const Home = async () => {
  const productsResponse = await ProductService.getAllPagination({
    page: 1,
    limit: 4,
  });

  console.log(productsResponse);

  const products = productsResponse?.data || [];

  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <ProductSection products={products} />
      <TestimonialsSection />
      <CraftsmanshipSection />
      <CtaSection />
    </>
  );
};

export default Home;
