import { useMemo, useEffect, useCallback, useRef } from "react";
import { photoData } from "./PhotoData";

export default function PhotoGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const doubleImages = useMemo(() => [...photoData, ...photoData], []);

  // 优化图片预加载
  const preloadImages = useCallback(() => {
    doubleImages.forEach((img, index) => {
      setTimeout(() => {
        const image = new Image();
        image.src = img.src;
        image.loading = "lazy";
        image.decoding = "async";
      }, index * 50);
    });
  }, [doubleImages]);

  // 处理滚动优化
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let isScrolling = false;

    const handleScroll = () => {
      if (!isScrolling && containerRef.current) {
        isScrolling = true;
        containerRef.current.style.animationPlayState = "paused";

        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.style.animationPlayState = "running";
            isScrolling = false;
          }
        }, 150);
      }
    };

    // 预加载图片
    preloadImages();

    // 监听页面滚动
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [preloadImages]);

  return (
    <div className="logo-container">
      <div className="logo-scroll">
        <div
          ref={containerRef}
          className="logo-scroll__wrapper"
          style={
            {
              "--gap": "1rem",
              "--duration": "60s",
              "--scroll-start": "0",
              "--scroll-end": "calc(-100% - var(--gap))",
            } as React.CSSProperties
          }>
          {doubleImages.map((img, index) => (
            <div key={`photo-${index}`} className="logo-item">
              <img
                src={img.src}
                alt={`Gallery photo ${index + 1}`}
                className="w-full h-full object-cover rounded no-drag"
                loading={index < 6 ? "eager" : "lazy"}
                decoding="async"
                sizes="(max-width: 640px) 160px, (max-width: 1024px) 224px, 256px"
                width={300}
                height={200}
                style={{
                  contentVisibility: "auto",
                  containIntrinsicSize: "300px 200px",
                  imageRendering: "crisp-edges",
                }}
                onLoad={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  e.currentTarget.style.opacity = "1";
                }}
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  console.warn(`Failed to load image: ${img.src}`);
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
