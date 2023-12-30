import { assets } from "@/lib/asset-utils";
import { type Platform, platforms } from "@/lib/platform-utils";
import { cn } from "@/lib/tailwind-utils";
import Image from "next/image";

export const PlatformRotation = ({
  currentPlatform,
}: {
  currentPlatform: Platform;
}) => {
  return (
    <div className="w-[80px] h-[80px] mx-2 -mt-2 align-middle inline-flex relative">
      {platforms.map((name, index) => (
        <Image
          key={name}
          src={assets[name]}
          alt="Platform logo"
          width="80"
          height="80"
          className={cn(
            "w-full h-full object-contain absolute top-0 left-0 transition-all duration-300",
            currentPlatform === name
              ? "opacity-100 transform-none"
              : index > platforms.indexOf(currentPlatform)
              ? "opacity-0 -translate-y-2"
              : "opacity-0 -translate-y-2"
          )}
        />
      ))}
    </div>
  );
};
