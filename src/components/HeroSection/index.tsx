import Controller from "./Controller";
import useHeroSection from "./useHeroSection";

const HeroSection = () => {
  const {
    images,
    currentIndex,
    previousIndex,
    key,
    welcomeText,
    heroTitle1,
    heroTitle2,
    handleNextSlide,
  } = useHeroSection();

  return (
    <div className="h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${images[previousIndex]})` }}
      />
      <div
        key={key}
        className="absolute inset-0 bg-cover bg-center animate-expand-vertical"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      />

      <div className="relative h-full flex items-center px-[25px] md:px-[135px] ">
        <div className="flex flex-col text-light font-normal gap-6">
          <p className="text-sm md:text-base overflow-hidden">{welcomeText}</p>
          <h1 className="text-[46px] md:text-[64px] capitalize overflow-hidden leading-[43px] md:leading-16">
            {heroTitle1}
            <br />
            {heroTitle2}
          </h1>
        </div>

        <Controller
          images={images}
          currentIndex={currentIndex}
          onNextSlide={handleNextSlide}
          resetKey={key}
        />
      </div>
    </div>
  );
};

export default HeroSection;
