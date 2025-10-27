export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

export const preloadImages = (sources: string[]): Promise<void[]> => {
  return Promise.all(sources.map(preloadImage));
};

export const getOptimizedImagePath = (
  imagePath: string,
  format: "webp" | "avif" | "png" = "png"
): string => {
  const pathWithoutExtension = imagePath.replace(/\.(png|jpg|jpeg)$/, "");
  return `${pathWithoutExtension}.${format}`;
};
