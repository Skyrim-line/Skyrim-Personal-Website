import { useMemo } from "react";
import { photoData } from "./PhotoData";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

export default function PhotoGallery() {
  const images = useMemo(() => photoData, []);

  const items = images.map((img) => ({
    quote: "",
    name: img.info || "",
    title: img.location || "",
    image: img.src,
  }));

  return (
    <div className="w-full overflow-y-hidden">
      <div className="rounded-md flex flex-col antialiased dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={items}
          direction="right"
          speed="slow"
          pauseOnHover={true}
        />
      </div>
    </div>
  );
}
