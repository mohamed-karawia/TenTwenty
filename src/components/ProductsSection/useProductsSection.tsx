import { useState, useRef, useEffect } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useWordAnimation } from "@hooks/useWordAnimation";

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface UseProductsSectionProps {
  products: Product[];
}

function lerp(start: number, stop: number, amt: number): number {
  return (1 - amt) * start + amt * stop;
}

const useProductsSection = ({ products }: UseProductsSectionProps) => {
  const len = products.length;
  const isMobile = useIsMobile();
  const ARC_SIZE = isMobile ? 70 : 150;

  // Calculate initial degree for second slide (index 1)
  const initialDeg = -(ARC_SIZE / len) * 1;

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
    delayBetweenWords: 0.15,
    shouldAnimate: isVisible,
  });
  const descriptionText = useWordAnimation({
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    delayBetweenWords: 0.03,
    shouldAnimate: titleAnimated,
  });

  const cardWidth = isMobile ? 232.67 : 434.9;
  const cardHeight = isMobile ? 331.27 : 619.21;
  const carouselHeight = isMobile ? 400 : 650;

  prevRef.current = deg;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            setTimeout(() => {
              setTitleAnimated(true);
            }, 300);
          }
        });
      },
      { threshold: 0.2 }
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
    const newDeg = lerp(prev, next, 0.2);

    if (newDeg !== prev) {
      setDeg(newDeg);
      requestAnimationFrame(move);
    } else {
      rendering.current = false;
    }

    const index = Math.round(Math.abs(((newDeg / ARC_SIZE) * len) % len));
    if (index !== indexRef.current) {
      setPrevIndex(indexRef.current);
      indexRef.current = index;
      setIsTransitioning(true);
      setCurrentIndex(index);

      setTimeout(() => {
        setIsTransitioning(false);
      }, 800);
    }
  };

  const onMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    const isTouch = e.type === "touchstart";
    let _deg = deg;

    const tryMove = (next: number) => {
      _deg = nextRef.current += next;
      _deg = nextRef.current = Math.min(_deg, 3);
      _deg = nextRef.current = Math.max(_deg, -ARC_SIZE + 3);
      if (!rendering.current) {
        rendering.current = true;
        requestAnimationFrame(move);
      }
    };

    const onMouseMove = ({ movementX }: MouseEvent) => {
      tryMove(movementX / 30);
    };

    let prevTouchPageX: number | undefined;
    const onTouchMove = ({ touches }: TouchEvent) => {
      const pageX = touches[0].pageX;
      if (prevTouchPageX) {
        const movementX = pageX - prevTouchPageX;
        tryMove(movementX / 10);
      }
      prevTouchPageX = pageX;
    };

    const onMouseUp = () => {
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("touchend", onMouseUp);

      const angle = ARC_SIZE / len;
      const mod = _deg % angle;
      const diff = angle - Math.abs(mod);
      const sign = Math.sign(_deg);
      const max = angle * (len - 1);

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
    ARC_SIZE,
    cardWidth,
    cardHeight,
    carouselHeight,
    len,
    onMouseDown,
  };
};

export default useProductsSection;
