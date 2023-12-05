"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Virtual, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FiTrendingUp } from "react-icons/fi";
import Link from "next/link";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FaPlay } from "react-icons/fa";
import { UseCollapse } from "@/hooks/UseCollapse";
import TmdpConfig from "@/utils/TmdpConfig";
import UseMovieDialog from "@/hooks/UseMovieDialog";

export default function HomeTrailer(): JSX.Element {
  interface Movie {
    id: number;
    original_title: string;
    name: string;
    backdrop_path: string;
  }
  interface SelectedMovie {
    backdrop_path?: string;

  }
  interface Movie2 {
    setSelectedMovie2: React.Dispatch<React.SetStateAction<any>>
    selectedMovies2: any
  }
  const [MoviesData, setMoviesData] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedMovies, setSelectedMovie] = useState<SelectedMovie>({});
  const [selectedMovies2, setSelectedMovie2] = useState<Movie2 | any>('');

  const { size, setSize, handleOpen } = UseCollapse();
  const HandleFetch = async (params: number) => {
    try {
      const response = await TmdpConfig.get(
        `discover/movie?language=en-US&page=${params}`
      );

      const Data = await response.data.results; // Access .data to get the response content


      setMoviesData(Data);
      setSelectedMovie(Data[0]);
      setSelectedMovie2(Data[0]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const randomValue = Math.floor(Math.random() * 100) + 1;

    HandleFetch(randomValue);
  }, []);


  
  return (
    <div className=" flex flex-col items-center justify-center   w-[100%] ">
      {loading ? (
        <div className="w-[100%]">
          <div className="flex items-center mt-6  bg-[#777676] animate-pulse h-[15px] w-[18%] rounded-[6px] "></div>
          <ul className=" mt-5">
     
              <li
                className="w-[85vw] h-[324px] rounded-lg p-[80px] animate-pulse bg-[#777676] placeholder-shimmer"
          
              ></li>

          </ul>
        </div>
      ) : (
        <div className="w-[100%] ">
          <div className="flex items-center mt-6 gap-2 font-[700] hover:text-gray-200  cursor-pointer  text-[20px] ">
            <h1 className="">Movie Trailers</h1>
            <FiTrendingUp />
          </div>

          <div
            className="h-[80%]  flex justify-center items-center w-auto m-auto  bg-[cover] ease-in-out rounded-xl bg-transition bg-image-transition"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://www.themoviedb.org/t/p/w1280/${selectedMovies.backdrop_path})`,
              backgroundPosition: "top center",
              transition: " all .5s",
            }}
          >
            <div></div>
            <Swiper
              modules={[Virtual, Navigation, Pagination]}
              className="text-[#E8E8E8]"
              slidesPerView={3}
              centeredSlides={false}
              spaceBetween={15}
              color="#E8E8E8"
              width={900}
              autoplay={true}
              pagination={{
                type: "fraction",
              }}
              navigation={false}
              virtual
            >
              {MoviesData.map((data) => (
                <SwiperSlide key={data.id} virtualIndex={data.id}>
                  <a href={`#${data.id}`}>
                    <div
                      className="relative cursor-pointer hover:transform hover:scale-105 transition duration-200 ease-in-out"
                      onClick={() => {
                        handleOpen("md")
                        setSelectedMovie2(data as any);
                      }}
                    >
                      <abbr title={data.original_title}>
                        <div className="relative">
                          <div className="flex flex-col items-center">
                            <img
                              src={`https://www.themoviedb.org/t/p/w710_and_h400_multi_faces/${data.backdrop_path}`}
                              alt=""
                              className="rounded-lg h-[100%] w-[100%] object-cover flex items-center justify-center mt-[120px]"
                              onMouseEnter={() => {
                                setSelectedMovie(data);
                              }}
                            />
                          </div>
                          <FaPlay className="absolute text-[#fff] top-[12rem] left-[8rem] text-[2rem] transform scale-1 transition duration-200 ease-in-out" />
                        </div>
                      </abbr>
                      <p className="text-[#fff] text-[1rem] border-[none]">
                        {data.name}
                      </p>
                    </div>
                  </a>
                </SwiperSlide>
              ))}
              <UseMovieDialog size={size} handleOpen={handleOpen}   selectedMovies2={selectedMovies2} />
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
}
