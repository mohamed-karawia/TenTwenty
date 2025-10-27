import HeroSection from "../../components/features/HeroSection";
import ProductsSection from "../../components/features/ProductsSection";
import { products } from "../../data";

const Landing = () => {
  return (
    <div>
      <HeroSection />
      <ProductsSection products={products} />
    </div>
  );
};

export default Landing;
