import { Loader } from "lucide-react";

interface ImageInterface extends React.ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
  height?: number | string;
  lazy?: boolean;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  objectPosition?: string;
  sizes?: string;
  src: string;
  width?: number | string;
}

export function Image({
  src,
  alt,
  width,
  height,
  lazy = true,
  objectFit = "cover",
  objectPosition = "center",
  sizes = "100vw",
  className,
  style,
  ...rest
}: ImageInterface) {
  const finalStyle = {
    ...style,
    objectFit,
    objectPosition,
  };

  return src ? (
    /** biome-ignore lint/performance/noImgElement: Image Component. Process all images in the application. */
    <img
      alt={alt}
      className={className}
      height={height}
      loading={lazy ? "lazy" : "eager"}
      sizes={sizes}
      src={src}
      style={finalStyle}
      width={width}
      {...rest}
    />
  ) : (
    <div
      aria-label="Loading image..."
      className={`${className || ""} flex items-center justify-center bg-gray-200 text-gray-500`}
      role="img"
      style={{
        width: width || "100%",
        height: height || "auto",
        ...finalStyle,
      }}
      {...rest}
    >
      <Loader className="animate-spin text-xl" />
    </div>
  );
}
