import { useState, useEffect, useRef } from "react";
import { photoData } from "./PhotoData";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function PhotoGallery() {
  // 为了实现无缝循环，我们需要三份数据
  const tripleImages = [...photoData, ...photoData, ...photoData];
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);

  // 使用ref代替state来存储滚动位置，避免频繁重渲染
  const positionRef = useRef(0);
  const galleryRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const isPausedRef = useRef(false);

  const handleMouseEnter = (index: number): void => {
    setHoveredIndex(index);
    setOpenPopoverIndex(index);
    isPausedRef.current = true;
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setOpenPopoverIndex(null);
    isPausedRef.current = false;
  };

  useEffect(() => {
    // 直接使用固定宽度而非动态计算
    // w-64 = 16rem = 256px, 加上16px间距 = 272px
    const imageFullWidth = 272; // 256px (w-64) + 16px (gap-4)
    const setWidth = photoData.length * imageFullWidth;

    // 更新DOM而不是状态
    const updatePosition = () => {
      if (!galleryRef.current) return;
      galleryRef.current.style.transform = `translateX(-${positionRef.current}px)`;
    };

    const animate = () => {
      // 只有在非暂停状态下才移动
      if (!isPausedRef.current) {
        // 递增位置
        positionRef.current += 0.5; // 速度可以根据需要调整

        // 当第一组照片完全滚出时，重置到第二组开始位置
        if (positionRef.current >= setWidth) {
          positionRef.current = 0;
        }

        // 直接更新DOM
        updatePosition();
      }

      // 持续动画
      animationRef.current = requestAnimationFrame(animate);
    };

    // 启动动画
    animationRef.current = requestAnimationFrame(animate);

    // 清理
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="overflow-hidden w-full mt-12 py-1 group">
      <div
        ref={galleryRef}
        className="whitespace-nowrap flex gap-4 will-change-transform">
        {tripleImages.map((img, index) => (
          <Popover
            key={index}
            open={openPopoverIndex === index}
            onOpenChange={(open) => {
              if (open) {
                setOpenPopoverIndex(index);
              } else if (openPopoverIndex === index) {
                setOpenPopoverIndex(null);
              }
            }}>
            <PopoverTrigger asChild>
              <div
                className="relative inline-block image-container"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}>
                <div className="transition-all duration-300 ease-in-out rounded-lg shadow-md cursor-pointer w-64 h-40 overflow-hidden">
                  <img
                    src={img.src}
                    alt={`gallery-${index}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                {/* 拍摄信息 */}
                <div
                  className={`mt-2 text-center text-sm text-gray-700 dark:text-gray-300 transition-opacity duration-300 ${
                    hoveredIndex === index ? "opacity-100" : "opacity-0"
                  }`}>
                  {img.info}
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-96 md:w-[600px] p-0" side="top">
              <div className="flex flex-col md:flex-row overflow-hidden">
                {/* Left side - Image */}
                <div className="md:w-1/2 flex-shrink-0">
                  <div className="h-48 md:h-64 overflow-hidden">
                    <img
                      src={img.src}
                      alt={img.info}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Right side - Details */}
                <div className="md:w-1/2 p-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {img.info}
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                    {img.description}
                  </p>
                  <div className="space-y-2">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        拍摄日期
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {img.info.split(", ")[1]}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        拍摄地点
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {img.info.split(", ")[0]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        ))}
      </div>
    </div>
  );
}
