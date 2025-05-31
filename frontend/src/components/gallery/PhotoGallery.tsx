import { useState, useMemo } from "react";
import { photoData } from "./PhotoData";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

export default function PhotoGallery() {
  const doubleImages = useMemo(() => [...photoData, ...photoData], []);
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);

  return (
    <div className="logo-container">
      <div className="logo-scroll">
        <div className="logo-scroll__wrapper">
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
              <Tooltip>
                <TooltipTrigger asChild>
                  <PopoverTrigger asChild>
                    <div className="logo-item cursor-pointer">
                      <img
                        src={img.src}
                        alt={`photo-${index}`}
                        className="w-full h-full object-cover rounded transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                        decoding="async"
                        sizes="(max-width: 768px) 50vw, 25vw"
                        width={300}
                        height={200}
                        style={{
                          contentVisibility: "auto",
                          containIntrinsicSize: "300px 200px",
                        }}
                      />
                    </div>
                  </PopoverTrigger>
                </TooltipTrigger>
                <TooltipContent side="top">
                  Click to view details
                </TooltipContent>
              </Tooltip>

              {openPopoverIndex === index && (
                <PopoverContent
                  className="w-[95vw] md:w-[1000px] p-0"
                  side="top">
                  <div className="flex flex-col md:flex-row overflow-hidden">
                    <div className="md:w-1/2 max-h-60 md:max-h-none overflow-hidden">
                      <img
                        src={img.src}
                        alt={img.info}
                        className="w-full h-full object-cover rounded-l-lg"
                        loading="eager"
                        decoding="async"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        width={500}
                        height={400}
                        style={{
                          contentVisibility: "auto",
                          containIntrinsicSize: "500px 400px",
                        }}
                      />
                    </div>
                    <div className="md:w-1/2 p-4">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {img.info}
                      </h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                        {img.description}
                      </p>
                      <div className="text-xs space-y-2">
                        <div>
                          <strong>Date Taken:</strong> {img.date}
                        </div>
                        <div>
                          <strong>Location:</strong> {img.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              )}
            </Popover>
          ))}
        </div>
      </div>
    </div>
  );
}
