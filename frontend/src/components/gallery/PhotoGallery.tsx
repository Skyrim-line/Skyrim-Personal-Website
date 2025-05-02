import { useState, useEffect } from "react";
import img1 from "./photos/1.jpg";
import img2 from "./photos/2.jpg";
import img3 from "./photos/3.jpg";
import img4 from "./photos/4.jpg";
// import img5 from "./photos/5.jpg";
// import img6 from "./photos/6.jpg";
// import img7 from "./photos/7.jpg";
// import img8 from "./photos/8.jpeg";
// import img9 from "./photos/9.jpg";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const images = [
  {
    src: img1,
    info: "Sydney Opera House, 2023",
    description:
      "The Sydney Opera House is a multi-venue performing arts centre at Sydney Harbour. It is one of Australia's most famous landmarks.",
  },
  {
    src: img2,
    info: "Blue Mountains, 2023",
    description:
      "The Blue Mountains is a mountainous region in New South Wales, Australia. It is known for its dramatic scenery and cultural significance.",
  },
  {
    src: img3,
    info: "Bondi Beach, 2024",
    description:
      "Bondi Beach is a popular beach and the name of the surrounding suburb in Sydney. Bondi Beach is one of Australia's most famous beaches and is located 7 km east of the Sydney central business district.",
  },
  {
    src: img4,
    info: "Melbourne Skyline, 2023",
    description:
      "Melbourne is the coastal capital of the southeastern Australian state of Victoria. It has a vibrant cultural scene and is known for its graffiti laneways, excellent restaurants, and major sports venues.",
  },
];

export default function PhotoGallery() {
  const doubleImages = [...images, ...images]; // 实现无限滚动
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    setOpenPopoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setOpenPopoverIndex(null);
  };

  useEffect(() => {
    // 当hoveredIndex发生变化时，控制滚动暂停状态
    const slidingElement = document.querySelector(".animate-slide");
    if (slidingElement instanceof HTMLElement) {
      if (hoveredIndex !== null) {
        slidingElement.style.animationPlayState = "paused";
      } else {
        slidingElement.style.animationPlayState = "running";
      }
    }
  }, [hoveredIndex]);

  return (
    <div className="overflow-hidden w-full py-10 group">
      <div
        className={`whitespace-nowrap animate-slide ${
          hoveredIndex !== null ? "[animation-play-state:paused]" : ""
        } group-hover:[animation-play-state:paused] flex gap-4`}>
        {doubleImages.map((img, index) => (
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
                className="relative inline-block"
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
