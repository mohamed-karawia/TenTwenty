import { useState, useEffect } from "react";
import { BREAKPOINTS } from "../constants";

export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const newIsMobile = window.innerWidth < BREAKPOINTS.MOBILE;
      setIsMobile((prev) => (prev === newIsMobile ? prev : newIsMobile));
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return isMobile;
};
