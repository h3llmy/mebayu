import {
  AboutSection,
  CraftsmanshipSection,
  CtaSection,
  HeroSection,
  ProductSection,
  FeaturesSection,
  TestimonialsSection
} from "@/components/section/home";
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
}

export default Home;
