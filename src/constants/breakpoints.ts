export const BREAKPOINTS = {
  MOBILE: 768,
} as const;

export const CAROUSEL_DIMENSIONS = {
  MOBILE: {
    ARC_SIZE: 70,
    CARD_WIDTH: 232.67,
    CARD_HEIGHT: 331.27,
    CAROUSEL_HEIGHT: 400,
  },
  DESKTOP: {
    ARC_SIZE: 150,
    CARD_WIDTH: 434.9,
    CARD_HEIGHT: 619.21,
    CAROUSEL_HEIGHT: 650,
  },
} as const;

export const INTERSECTION_OBSERVER_CONFIG = {
  THRESHOLD: 0.2,
} as const;
