export const MaskedIcon = ({
  imgUrl,
  className,
  full,
}: {
  imgUrl: string;
  className?: string;
  full?: boolean;
}) => {
  let styles: unknown = {
    mask: `url(${imgUrl}) no-repeat center`,
    WebkitMask: `url(${imgUrl}) no-repeat center`,
  };
  if (full) styles = { ...styles, maskSize: "60%" };
  return <div className={className} style={styles}></div>;
};
