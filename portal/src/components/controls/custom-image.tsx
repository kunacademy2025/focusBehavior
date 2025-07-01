import Image, { StaticImageData } from "next/image";
import cn from "classnames";

interface ImageProps {
  src: string | StaticImageData;
  width?: number;
  height?: number;
  resizeWidth?: number;
  resizeHeight?: number;
  alt: string;
  className?: string;
  style?: any;
  loading?: "lazy" | "eager" | undefined;
  onClick?: () => void;
  center?: boolean;
  variant?: string;
  pullRight?: boolean;
  optimize?: boolean;
  priority?: boolean;
  sizes?: string;
  [x: string]: any;
}

const generateParams = (width: number, height: number): string => {
  if (width && height) return `resize=${width}x${height}&embed`;
  if (width) return `width=${width}`;
  if (height) return `height=${height}`;
  return "";
};

export const CustomImage: React.FC<ImageProps> = ({
  src,
  width = 0,
  height = 0,
  resizeWidth = 0,
  resizeHeight = 0,
  alt,
  className,
  style,
  loading = "eager",
  onClick,
  center,
  variant,
  pullRight = false,
  optimize = false,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  ...props
}) => {
  const params = generateParams(resizeWidth, resizeHeight);
  const fullImageUrl = src
    ? params
      ? `${src}?format=webp&${params}`
      : src
    : "";

  const ratio = width / height;

  const renderWidth = (() => {
    if (resizeHeight && resizeWidth) return resizeWidth;
    if (resizeWidth) return resizeWidth;
    if (resizeHeight) return resizeHeight * ratio;
    return width;
  })();
  const renderHeight = (() => {
    if (resizeHeight && resizeWidth) return resizeHeight;
    if (resizeHeight) return resizeHeight;
    if (resizeWidth) return resizeWidth / ratio;
    return height;
  })();

  return (
    fullImageUrl && (
      <Image
        src={fullImageUrl}
        alt={alt}
        className={cn(className)}
        height={renderHeight}
        width={renderWidth}
        sizes="100vw"
        style={style}
        {...(optimize ? {} : { unoptimized: true })}
        onClick={onClick}
        // blurDataURL={fullImageUrl}
        // {...(priority ? { priority: true, loading: "eager" } : { loading })}
        {...props}
      />
    )
  );
};
