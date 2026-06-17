type PictureProps = {
  image: string;
  alt: string;
  className?: string;
  eager?: boolean;
  sizes?: string;
};

const widths = [720, 1200, 1800];

function srcSet(image: string, format: "avif" | "webp") {
  return widths
    .map((width) => `/media/${image}-${width}.${format} ${width}w`)
    .join(", ");
}

export function Picture({
  image,
  alt,
  className,
  eager = false,
  sizes = "100vw",
}: PictureProps) {
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={srcSet(image, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(image, "webp")} sizes={sizes} />
      <img
        src={`/media/${image}-1200.webp`}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        decoding="async"
      />
    </picture>
  );
}
