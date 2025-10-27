import useProductsSection from "./useProductsSection";
import OptimizedImage from "../../common/OptimizedImage";
import { Product } from "../../../types";

interface ProductsSectionProps {
  products: Product[];
}

const ProductsSection = ({ products }: ProductsSectionProps) => {
  const {
    currentIndex,
    prevIndex,
    isTransitioning,
    deg,
    containerRef,
    wrapperRef,
    qualityProductsText,
    descriptionText,
    arcSize,
    cardWidth,
    cardHeight,
    carouselHeight,
    productCount,
    onMouseDown,
  } = useProductsSection({ products });

  return (
    <section
      ref={containerRef}
      className="py-[53px] px-[49px] bg-white overflow-hidden mb-5"
    >
      <div>
        <div className="text-center mb-16 flex flex-col gap-[30px]">
          <h2 className="text-3xl md:text-[56px] font-normal  text-black overflow-hidden">
            {qualityProductsText}
          </h2>
          <p className="text-gray max-w-2xl mx-auto font-normal overflow-hidden">
            {descriptionText}
          </p>
        </div>

        <div
          ref={wrapperRef}
          className="relative w-full mb-20"
          style={{
            height: `${carouselHeight}px`,
          }}
        >
          <div
            className="w-full h-[300%] absolute left-0 cursor-grab active:cursor-grabbing"
            onMouseDown={onMouseDown}
            onTouchStart={onMouseDown}
          >
            <div className="h-screen absolute left-1/2 -translate-x-1/2">
              <div
                className="transition-transform duration-0"
                style={{
                  transformOrigin: `center calc(40vh * 5)`,
                  transform: `rotate(${deg}deg)`,
                }}
              >
                {products.map((product, i) => (
                  <div
                    key={product.id}
                    className="absolute top-0 left-0"
                    style={{
                      height: "40vh",
                      transformOrigin: `center calc(40vh * 5)`,
                      transform: `translateX(-50%) rotate(${
                        i * (arcSize / productCount)
                      }deg)`,
                    }}
                  >
                    <div
                      className="bg-white shadow-2xl overflow-hidden pointer-events-none select-none flex flex-col"
                      style={{
                        width: `${cardWidth}px`,
                        height: `${cardHeight}px`,
                      }}
                    >
                      <div className="flex-1 overflow-hidden">
                        <OptimizedImage
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          draggable={false}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center w-full max-w-md mx-auto">
          <div className="relative min-h-15">
            {products.map((product, index) => {
              const isActive = index === currentIndex;
              const wasActive = index === prevIndex;
              const shouldRender = isActive || (wasActive && isTransitioning);

              if (!shouldRender) return null;

              const showExitAnimation =
                wasActive && isTransitioning && !isActive;
              const showEnterAnimation = isActive && isTransitioning;

              const titleLines = product.title.split(" ");
              const descriptionLines = product.description.match(
                /.{1,50}(\s|$)/g
              ) || [product.description];

              return (
                <div
                  key={`info-${product.id}`}
                  className="absolute inset-0"
                  style={{
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  <div className="overflow-hidden mb-5">
                    <h3 className="text-2xl md:text-4xl font-medium md:font-normal text-black">
                      {titleLines.map((word, i) => (
                        <span
                          key={i}
                          className="inline-block transition-all duration-300 ease-out"
                          style={{
                            opacity: showExitAnimation ? 0 : 1,
                            transform: showExitAnimation
                              ? `translateY(-${(i + 1) * 100}%)`
                              : showEnterAnimation
                              ? `translateY(${(titleLines.length - i) * 100}%)`
                              : "translateY(0)",
                            transitionDelay: showExitAnimation
                              ? `${i * 50}ms`
                              : showEnterAnimation
                              ? `${400 + i * 50}ms`
                              : "0ms",
                          }}
                        >
                          {word}
                          {i < titleLines.length - 1 ? " " : ""}
                        </span>
                      ))}
                    </h3>
                  </div>
                  <div className="overflow-hidden mb-5">
                    <div className="text-gray text-[22px] md:text-base font-medium md:font-normal">
                      {descriptionLines.map((line, i) => (
                        <div
                          key={i}
                          className="transition-all duration-300 ease-out"
                          style={{
                            opacity: showExitAnimation ? 0 : 1,
                            transform: showExitAnimation
                              ? `translateY(-${(i + 1) * 100}%)`
                              : showEnterAnimation
                              ? `translateY(${
                                  (descriptionLines.length - i) * 100
                                }%)`
                              : "translateY(0)",
                            transitionDelay: showExitAnimation
                              ? `${i * 50}ms`
                              : showEnterAnimation
                              ? `${400 + i * 50}ms`
                              : "0ms",
                          }}
                        >
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
