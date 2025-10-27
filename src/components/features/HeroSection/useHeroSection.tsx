import { useState, useEffect, useRef } from "react";
import { useWordAnimation } from "@hooks/useWordAnimation";
import { ANIMATION_CONFIG, HERO_ANIMATION } from "../../../constants";
import { preloadImages } from "../../../utils";
import bgImage1 from "@images/bg-1.png";
import bgImage2 from "@images/bg-2.png";
import bgImage3 from "@images/bg-3.png";
import bgImage4 from "@images/bg-4.png";

const useHeroSection = () => {
  const images = [bgImage1, bgImage2, bgImage3, bgImage4];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);
  const [key, setKey] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    preloadImages(images).then(() => {
      setImagesLoaded(true);
    });
  }, []);

  const welcomeText = useWordAnimation({
    text: "Welcome To TenTwenty Farms",
    delayBetweenWords: ANIMATION_CONFIG.WORD_ANIMATION_DELAY,
    startDelay: HERO_ANIMATION.WELCOME_TEXT_START_DELAY,
  });
  const heroTitle1 = useWordAnimation({
    text: "From our Farms",
    delayBetweenWords: ANIMATION_CONFIG.WORD_ANIMATION_DELAY,
    startDelay: HERO_ANIMATION.TITLE_LINE_1_START_DELAY,
  });
  const heroTitle2 = useWordAnimation({
    text: "To your hands",
    delayBetweenWords: ANIMATION_CONFIG.WORD_ANIMATION_DELAY,
    startDelay: HERO_ANIMATION.TITLE_LINE_2_START_DELAY,
  });

  const handleNextSlide = () => {
    setPreviousIndex(currentIndex);
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setKey((prev) => prev + 1);

    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        setPreviousIndex(prev);
        return (prev + 1) % images.length;
      });
      setKey((prev) => prev + 1);
    }, ANIMATION_CONFIG.HERO_ROTATION_INTERVAL);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        setPreviousIndex(prev);
        return (prev + 1) % images.length;
      });
      setKey((prev) => prev + 1);
    }, ANIMATION_CONFIG.HERO_ROTATION_INTERVAL);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
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
    imagesLoaded,
  };
};

export default useHeroSection;
