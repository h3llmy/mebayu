import { HeroSection } from "@/components/organisms/Home/heroSection";
import { AboutSection } from "@/components/organisms/Home/aboutSection";
import { FeaturesSection } from "@/components/organisms/Home/featuresSection";
import { ProductSection } from "@/components/organisms/Home/productSection";
import { TestimonialsSection } from "@/components/organisms/Home/testimonialsSection";
import { CraftsmanshipSection } from "@/components/organisms/Home/craftsmanshipSection";
import { CtaSection } from "@/components/organisms/Home/ctaSection";
import { ProductService } from "@/lib/service/product/productService";
import { SettingService } from "@/lib/service/setting/settingService";

const Home = async () => {
  const [productsResponse, settings] = await Promise.all([
    ProductService.getAllPagination({
      page: 1,
      limit: 4,
    }),
    SettingService.get(),
  ]);

  const products = productsResponse?.data || [];
  const heroImages = settings?.hero_images?.map(img => img.image_url) || [];

  return (
    <>
      <HeroSection images={heroImages} />
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
