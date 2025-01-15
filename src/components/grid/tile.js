import clsx from "clsx";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Label from "../label";

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  ...props
}) {
  return (
    <div
      className={clsx(
        "group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-black hover:border-blue-600 andai:bg-black dark:bg-black dark:border-zinc-700 dark:border ",
        {
          relative: label,
          "border-2 border-blue-600": active,
          "border-neutral-200 dark:border-neutral-800": !active,
        }
      )}
    >
      {props.src ? (
        <div
          className={clsx("relative h-full w-full overflow-hidden ", {
            "transition-transform duration-500 ease-in-out group-hover:scale-105":
              isInteractive,
          })}
        >
          <LazyLoadImage
            className="h-full w-full object-contain"
            effect="blur"
            placeholderSrc={props?.src}
            wrapperClassName="w-full h-full" 
            {...props}
          />
        </div>
      ) : null}
      {label ? (
        <Label
          title={label.title}
          amount={label.amount}
          currencyCode={label.currencyCode}
          position={label.position}
        />
      ) : null}
    </div>
  );
}
