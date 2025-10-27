import { useState, useRef, useEffect } from "react";
import { useIsMobile } from "../../../hooks/useIsMobile";
import { useWordAnimation } from "@hooks/useWordAnimation";
import { Product } from "../../../types";
import { lerp } from "../../../utils";
import {
  ANIMATION_CONFIG,
  CAROUSEL_CONFIG,
  CAROUSEL_DIMENSIONS,
  INTERSECTION_OBSERVER_CONFIG,
} from "../../../constants";

interface UseProductsSectionProps {
  products: Product[];
}

const useProductsSection = ({ products }: UseProductsSectionProps) => {
  const productCount = products.length;
  const isMobile = useIsMobile();
  const arcSize = isMobile
    ? CAROUSEL_DIMENSIONS.MOBILE.ARC_SIZE
    : CAROUSEL_DIMENSIONS.DESKTOP.ARC_SIZE;

  const initialDeg = -(arcSize / productCount) * 1;

  const [currentIndex, setCurrentIndex] = useState(1);
  const [prevIndex, setPrevIndex] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [titleAnimated, setTitleAnimated] = useState(false);
  const [deg, setDeg] = useState(initialDeg);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(1);
  const prevRef = useRef(initialDeg);
  const nextRef = useRef(initialDeg);
  const rendering = useRef(false);

  const qualityProductsText = useWordAnimation({
    text: "Quality Products",
    delayBetweenWords: ANIMATION_CONFIG.WORD_ANIMATION_DELAY,
    shouldAnimate: isVisible,
  });
  const descriptionText = useWordAnimation({
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    delayBetweenWords: 0.03,
    shouldAnimate: titleAnimated,
  });

  const cardWidth = isMobile
    ? CAROUSEL_DIMENSIONS.MOBILE.CARD_WIDTH
    : CAROUSEL_DIMENSIONS.DESKTOP.CARD_WIDTH;
  const cardHeight = isMobile
    ? CAROUSEL_DIMENSIONS.MOBILE.CARD_HEIGHT
    : CAROUSEL_DIMENSIONS.DESKTOP.CARD_HEIGHT;
  const carouselHeight = isMobile
    ? CAROUSEL_DIMENSIONS.MOBILE.CAROUSEL_HEIGHT
    : CAROUSEL_DIMENSIONS.DESKTOP.CAROUSEL_HEIGHT;

  prevRef.current = deg;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            setTimeout(() => {
              setTitleAnimated(true);
            }, ANIMATION_CONFIG.TITLE_ANIMATION_DELAY);
          }
        });
      },
      { threshold: INTERSECTION_OBSERVER_CONFIG.THRESHOLD }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [isVisible]);

  const move = () => {
    const next = nextRef.current;
    const prev = prevRef.current;
    const newDeg = lerp(prev, next, ANIMATION_CONFIG.LERP_AMOUNT);

    if (newDeg !== prev) {
      setDeg(newDeg);
      requestAnimationFrame(move);
    } else {
      rendering.current = false;
    }

    const index = Math.round(
      Math.abs(((newDeg / arcSize) * productCount) % productCount)
    );
    if (index !== indexRef.current) {
      setPrevIndex(indexRef.current);
      indexRef.current = index;
      setIsTransitioning(true);
      setCurrentIndex(index);

      setTimeout(() => {
        setIsTransitioning(false);
      }, ANIMATION_CONFIG.TRANSITION_DURATION);
    }
  };

  const onMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    const isTouch = e.type === "touchstart";
    let _deg = deg;

    const tryMove = (next: number) => {
      _deg = nextRef.current += next;
      _deg = nextRef.current = Math.min(_deg, CAROUSEL_CONFIG.BOUNDARY_OFFSET);
      _deg = nextRef.current = Math.max(
        _deg,
        -arcSize + CAROUSEL_CONFIG.BOUNDARY_OFFSET
      );
      if (!rendering.current) {
        rendering.current = true;
        requestAnimationFrame(move);
      }
    };

    const onMouseMove = ({ movementX }: MouseEvent) => {
      tryMove(movementX / CAROUSEL_CONFIG.MOUSE_SENSITIVITY);
    };

    let prevTouchPageX: number | undefined;
    const onTouchMove = ({ touches }: TouchEvent) => {
      const pageX = touches[0].pageX;
      if (prevTouchPageX) {
        const movementX = pageX - prevTouchPageX;
        tryMove(movementX / CAROUSEL_CONFIG.TOUCH_SENSITIVITY);
      }
      prevTouchPageX = pageX;
    };

    const onMouseUp = () => {
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("touchend", onMouseUp);

      const angle = arcSize / productCount;
      const mod = _deg % angle;
      const diff = angle - Math.abs(mod);
      const sign = Math.sign(_deg);
      const max = angle * (productCount - 1);

      if (_deg > 0) {
        tryMove(-_deg);
      } else if (-_deg > max) {
        tryMove(-_deg - max);
      } else {
        const moveAmount = (diff <= angle / 2 ? diff : mod) * sign;
        tryMove(moveAmount);
      }
    };

    if (isTouch) {
      document.addEventListener("touchmove", onTouchMove);
      document.addEventListener("touchend", onMouseUp);
    } else {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    }
  };

  return {
    currentIndex,
    prevIndex,
    isVisible,
    titleAnimated,
    deg,
    isTransitioning,
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
  };
};

export default useProductsSection;
