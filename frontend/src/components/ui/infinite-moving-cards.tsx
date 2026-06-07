"use client";

import { cn } from "@/lib/utils";
import React from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
    image?: string;
    width?: number;
    height?: number;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const loopItems = [...items, ...items];
  const animationDuration =
    speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
  const animationDirection = direction === "left" ? "forwards" : "reverse";

  return (
    <div
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
      style={
        {
          "--animation-duration": animationDuration,
          "--animation-direction": animationDirection,
        } as React.CSSProperties
      }>
      <ul
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}>
        {loopItems.map((item, idx) => (
          <li
            className="relative w-[350px] max-w-full shrink-0 rounded-2xl px-1 py-1 md:w-[450px] content-visibility-auto [contain-intrinsic-size:450px_200px]"
            key={`${item.name}-${idx}`}>
            {item.image && (
              <div className="relative w-full h-[200px] overflow-hidden rounded-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  loading={idx < 2 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={idx < 2 ? "high" : "low"}
                  sizes="(max-width: 768px) 70vw, 450px"
                  width={item.width}
                  height={item.height}
                />
              </div>
            )}
            <div className="relative z-20 mt-4 flex flex-row items-center">
              <span className="flex flex-col gap-1">
                <span className="text-sm leading-[1.6] font-normal text-neutral-500 dark:text-gray-400">
                  {item.name}
                </span>
                <span className="text-sm leading-[1.6] font-normal text-neutral-500 dark:text-gray-400">
                  {item.title}
                </span>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
