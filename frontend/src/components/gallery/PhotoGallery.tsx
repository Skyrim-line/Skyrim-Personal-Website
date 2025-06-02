import { useMemo, useEffect } from "react";
import { photoData } from "./PhotoData";

export default function PhotoGallery() {
  const doubleImages = useMemo(() => [...photoData, ...photoData], []);

  // 预加载图片
  useEffect(() => {
    doubleImages.forEach((img) => {
      const image = new Image();
      image.src = img.src;
      image.loading = "eager";
      image.decoding = "async";
      image.fetchPriority = "high";
    });
  }, [doubleImages]);

  return (
    <div className="logo-container">
      <div className="logo-scroll">
        <div className="logo-scroll__wrapper">
          {doubleImages.map((img, index) => (
            <div key={index} className="logo-item">
              <img
                src={img.src}
                alt={`photo-${index}`}
                className="w-full h-full object-cover rounded"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                sizes="(max-width: 640px) 160px, (max-width: 1024px) 224px, 256px"
                width={300}
                height={200}
                style={{
                  contentVisibility: "auto",
                  containIntrinsicSize: "300px 200px",
                  willChange: "transform",
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden",
                  perspective: "1000px",
                  WebkitBackfaceVisibility: "hidden",
                  WebkitPerspective: "1000px",
                  WebkitTransform: "translateZ(0)",
                  position: "relative",
                  zIndex: 1,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
