import { useState, useEffect, useRef } from "react";
import { useWordAnimation } from "@hooks/useWordAnimation";
import bgImage1 from "@images/bg-1.png";
import bgImage2 from "@images/bg-2.png";
import bgImage3 from "@images/bg-3.png";
import bgImage4 from "@images/bg-4.png";

const useHeroSection = () => {
  const images = [bgImage1, bgImage2, bgImage3, bgImage4];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);
  const [key, setKey] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const welcomeText = useWordAnimation({
    text: "Welcome To TenTwenty Farms",
    delayBetweenWords: 0.15,
    startDelay: 0,
  });
  const heroTitle1 = useWordAnimation({
    text: "From our Farms",
    delayBetweenWords: 0.15,
    startDelay: 0.6,
  });
  const heroTitle2 = useWordAnimation({
    text: "To your hands",
    delayBetweenWords: 0.15,
    startDelay: 1.05,
  });

  const handleNextSlide = () => {
    setPreviousIndex(currentIndex);
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setKey((prev) => prev + 1);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        setPreviousIndex(prev);
        return (prev + 1) % images.length;
      });
      setKey((prev) => prev + 1);
    }, 5000);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        setPreviousIndex(prev);
        return (prev + 1) % images.length;
      });
      setKey((prev) => prev + 1);
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [images.length]);

  return {
    images,
    currentIndex,
    previousIndex,
    key,
    welcomeText,
    heroTitle1,
    heroTitle2,
    handleNextSlide,
  };
};

export default useHeroSection;
