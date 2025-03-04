import Image from "next/image"


export function ProfileAvatar({ name, imageUrl }) {
 if (imageUrl) {
    return (
      <Image
        src={imageUrl}
        alt={name}
        width={50}
        height={50}
        className="rounded-full"
      />
    )
  }

  const initial = name.charAt(0).toUpperCase()

  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full andai:bg-black light:bg-black dark:bg-white andai:text-white light:text-white dark:text-black  text-primary-foreground font-semibold">
      {initial}
    </div>
  )
}

