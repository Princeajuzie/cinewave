"use client";
import Image from "next/image";
import { Carousel } from "@material-tailwind/react";
import test from "@/assets/images/lord.jpg";
import Marvel from "@/assets/images/marvels.jpg";
import flash from "@/assets/images/flash.jpeg";
import spider from "@/assets/images/spider.jpg";
import fast from "@/assets/images/fast.jpg";
import { useEffect, useState } from "react";

export default function HeroCarousel() {
  const data = [
    { id: 5, img: spider },
    { id: 1, img: Marvel },
    { id: 2, img: flash },
    { id: 3, img: test },
    { id: 4, img: fast },
  ];

  return (
    <>
      <div className="h-[20%]">
        <Carousel
          autoplay={true}
          loop={true}
          className="rounded-xl lg:h-[87vh]"
          navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
              {new Array(length).fill("").map((_, i) => (
                <span
                  key={i}
                  className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                    activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                  }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )}
        >
          {data.map((item) => {
            return (
              <Image
                key={item.id}
                src={item.img}
                alt="image 3"
                
                className="h-full w-full object-cover"
              />
            );
          })}
        </Carousel>
      </div>
    </>
  );
}
