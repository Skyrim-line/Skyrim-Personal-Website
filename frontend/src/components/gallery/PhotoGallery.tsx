import { useEffect, useMemo, useRef, useState } from "react";
import { photoData } from "./PhotoData";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

export default function PhotoGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const images = useMemo(() => photoData, []);

  const items = images.map((img) => ({
    quote: "",
    name: img.info || "",
    title: img.location || "",
    image: img.src,
    width: img.width,
    height: img.height,
  }));

  return (
    <div ref={sectionRef} className="w-full overflow-y-hidden">
      <div className="rounded-md flex flex-col antialiased dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        {isNearViewport ? (
          <InfiniteMovingCards
            items={items}
            direction="right"
            speed="slow"
            pauseOnHover={true}
          />
        ) : (
          <div className="w-full h-[248px] rounded-2xl bg-slate-100/80 dark:bg-slate-800/60 animate-pulse" />
        )}
      </div>
    </div>
  );
}
