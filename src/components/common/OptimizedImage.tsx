interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  draggable?: boolean;
  style?: React.CSSProperties;
}

const OptimizedImage = ({
  src,
  alt,
  className,
  loading = "lazy",
  draggable = false,
  style,
}: OptimizedImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      draggable={draggable}
      style={style}
    />
  );
};

export default OptimizedImage;
