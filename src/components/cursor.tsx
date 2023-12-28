import { assets } from "@/utils/asset-utils";
import Image from "next/image";
import { useEffect, useState, RefObject } from "react";

export const Cursor = ({
  buttonRef,
}: {
  buttonRef: RefObject<HTMLButtonElement>;
}) => {
  const [cursorPosition, setCursorPosition] = useState({
    x: -100,
    y: -100,
  });

  useEffect(() => {
    async function animateCursor() {
      if (!buttonRef.current) return;

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const buttonRect = buttonRef.current.getBoundingClientRect();
      const x = buttonRect.x + buttonRect.width / 2;
      const y = buttonRect.y + buttonRect.height / 2;

      setCursorPosition({ x, y });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setCursorPosition({ x: x - 150, y });

      buttonRef.current.style.transition = "transform 600ms ease-in-out";
      buttonRef.current.style.transform = "translateX(-150px)";

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setCursorPosition({ x: x + 150, y });

      buttonRef.current.style.transition = "transform 600ms ease-in-out";
      buttonRef.current.style.transform = "translateX(150px)";

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setCursorPosition({ x, y });

      buttonRef.current.style.transition = "transform 600ms ease-in-out";
      buttonRef.current.style.transform = "translateX(0px)";

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setCursorPosition({ x: window.innerWidth - 100, y: -100 });
    }

    animateCursor();
  }, []);

  return (
    <Image
      style={{ top: `${cursorPosition.y}px`, left: `${cursorPosition.x}px` }}
      className="absolute transition-all duration-[600ms] ease-in-out z-50"
      alt="Cursor"
      src={assets.cursor}
      width={80}
      height={50}
    />
  );
};
