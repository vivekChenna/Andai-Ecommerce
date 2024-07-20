import Image from "next/image";

export function Gallery({ image }) {
  return (
    <>
      <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
        <Image
          className="h-full w-full object-contain"
          fill
          sizes="(min-width: 1024px) 66vw, 100vw"
          alt={"plugin-img"}
          src={image}
          priority={true}
        />
      </div>
    </>
  );
}
