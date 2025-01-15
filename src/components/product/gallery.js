import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function Gallery({ image, isLoading , baseColor,
  highlightColor }) {
  return (
    <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
      {isLoading ? (
        <Skeleton
       baseColor={baseColor}
      highlightColor={highlightColor}
          containerClassName="h-full w-full"
          className="h-full w-full object-contain"
        />
      ) : (
        <Image
          className="h-full w-full object-contain rounded-md"
          fill
          sizes="(min-width: 1024px) 66vw, 100vw"
          alt={"plugin-img"}
          src={image}
          priority={true}
        />
      )}
    </div>
  );
}
