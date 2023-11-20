
"use client"
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Virtual, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {FiTrendingUp} from "react-icons/fi";
import TmdpConfig from "@/utils/TmdpConfig";
import Link from "next/link";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function SubCarousel() {

    interface Movies {
        id: number;
        poster_path: string;
    }
    const [MoviesData, setMoviesData] = useState<Movies[]>([]);
    const [MoviesData2, setMoviesData2] = useState<Movies[]>([]);
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [size, setSize] = useState(null);


    const HandleFetch = async () => {
        try {
          const response = await TmdpConfig.get(`trending/movie/day?language=en-US`);
           
          const Data = await response.data.results; // Access .data to get the response content
    
          const res =  await response.data
    
          setMoviesData(Data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      const HandleFetch2 = async (params:number) => {
 
        try {
          const response = await TmdpConfig.get(`movie/upcoming?language=en-US&page=${params}`);
           
          const Data  = await response.data.results; // Access .data to get the response content
    
          setMoviesData2(Data);
          setLoading2(false)
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      useEffect(() => {
        const randomValue = Math.floor(Math.random() * 20) + 1;
        HandleFetch();
        console.log(MoviesData && MoviesData);
        HandleFetch2(randomValue);
      }, []);
      
    
  return (
    <>

    {/* first children carousel  */}
{loading ?
<div className="w-[100%]">

       <div className="flex items-center mt-6  bg-[#777676] animate-pulse h-[15px] w-[18%] rounded-[6px] ">
      </div>
  <ul className="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-2 gap-[18px] mt-5">
{Array.from({ length: 5 }, (_, index) => (
  <li
    className="w-[100%] h-[300px] rounded-lg p-[80px] animate-pulse bg-[#777676] placeholder-shimmer"
    key={index}
  >

  </li>
))}
</ul>
</div>

:  
    <div className="w-[100%]">

      <div className="flex items-center mt-6 gap-2 font-[700] hover:text-gray-200  cursor-pointer  text-[20px] " >
        <h1 className="">Popular Movies </h1> 
        <FiTrendingUp />
      </div>

      <Swiper
        modules={[Virtual, Navigation, Pagination]}
        slidesPerView={4}
        centeredSlides={false}
        spaceBetween={5}
        width={1000}
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        virtual
      >
        { MoviesData.map((data) => (
              <SwiperSlide key={data.id} virtualIndex={data.id}>

              {
                <>
                <Link href={`/${data.id}`}>
                
                  <img
                    src={`https://www.themoviedb.org/t/p/w440_and_h660_face/${data.poster_path}`}
                    alt=""
                    className="rounded-lg "
                  />
                </Link>
                </>
              }
            </SwiperSlide>
        ))}
      </Swiper>
    </div>
}


  {/* second children carousel */}
 
  {loading2 ?
    <div className="w-[100%]">

<div className="flex items-center mt-6  bg-[#777676] animate-pulse h-[15px] w-[18%] rounded-[6px] ">
</div>
<ul className="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-2 gap-[18px] mt-5">
{Array.from({ length: 5 }, (_, index) => (
<li
className="w-[100%] h-[300px] rounded-lg p-[80px] animate-pulse bg-[#777676] placeholder-shimmer"
key={index}
>

</li>
))}
</ul>
</div>

: 
   
   
   <div className="w-[100%] mt-[40px]">
   
      <div className="flex items-center mt-6 gap-2 font-[700] hover:text-gray-200  cursor-pointer  text-[20px] "  >
        <h1 className="">Trending TV series</h1> 
        <FiTrendingUp />
      </div>

      <Swiper
       modules={[Virtual, Navigation, Pagination]}
       slidesPerView={4}
       centeredSlides={false}
       spaceBetween={5}
       width={1000}
       pagination={{
         type: "fraction",
       }}
       navigation={true}
       virtual
      >
        {MoviesData2 && MoviesData2.map((data) => (
          <SwiperSlide key={data.id} virtualIndex={data.id}>

            {
              <>
              <Link href={`/${data.id}`}>
              
                <img
                  src={`https://www.themoviedb.org/t/p/w440_and_h660_face/${data.poster_path}`}
                  alt=""
                  className="w-[auto] h-[300px] rounded-lg "
                />
              </Link>
              </>
            }
          </SwiperSlide>
        ))}
      </Swiper>
    </div>}
    </>
  )
}
