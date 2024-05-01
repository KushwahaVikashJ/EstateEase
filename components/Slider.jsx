import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

function Slider({ imageList }) {
  return (
    <div>
      {imageList ? (
        <Carousel>
          <CarouselContent>
            {imageList?.map((item, index) => (
              <CarouselItem key={index}>
                <Image
                  src={item?.url}
                  width={800}
                  height={300}
                  alt="image"
                  className="rounded-xl object-cover w-full h-[360px]"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <div className="w-full h-[200px] bg-slate-200 animate-pulse" />
      )}
    </div>
  );
}

export default Slider;
