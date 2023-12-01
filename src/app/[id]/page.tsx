"use client";
import { useParams } from "next/navigation.js";
import { useRouter } from "next/navigation.js";
import { useState, useEffect } from "react";
import React from "react";
import { Button } from "@material-tailwind/react";
import { UseCollapse } from "../../hooks/UseCollapse";
import { BsPlayFill } from "react-icons/bs";
import { BiSolidBookBookmark } from "react-icons/bi";
import Link from "next/link.js";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { BsFillBookmarksFill } from "react-icons/bs";
import TmdpConfig from "@/utils/TmdpConfig";
import Navbar from "@/components/NavbarComp/Navbar";
import Leftsidebar from "@/components/LeftsidebarComp/LeftSidebar";
import UseMovieDialog from "@/hooks/UseMovieDialog";
export default function Page() {
  //Property 'cast' does not exist on type '{ id: number; profile_path: string | null; original_name: string; cast: any; }[]'.t

  interface Cast {
    id: number;
    profile_path: string | null;
    original_name: string;
  }
  interface Data {
    id: number;
    original_title: string;
    name: string;
    backdrop_path: string;
    release_date: string;
    status: string;
    setData: React.Dispatch<React.SetStateAction<null>>;
    setSelectedMovie2: React.Dispatch<React.SetStateAction<any>>
    handleOpen: (value: string) => void;
    casts: {
      cast: Cast;
    }[];
    genres: { id: number; name: string }[];
    vote_average: number;
    vote_count: number;
    runtime: number;
    overview: string;
  }

  const router = useParams();
  const { size, setSize, handleOpen } = UseCollapse();
  const [data, setData] = useState<Data | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [loading2, setLoading2] = useState<boolean>(true);
  const [bookmark, setBookmark] = useState<boolean>(false);
  const [cast, setcast] = useState<Cast[]>([]);
  const [datakey, setDatakey] = useState<null | any>(null);

  const FetchVideoDetails = async function () {
    try {
      const response = await TmdpConfig.get(`movie/${router.id}`);
      const value = response.data;
      const sub = response.data.casts.cast;
      setcast(sub);
      console.log("sub", sub);

      if (value.id === parseInt(router.id as string)) {
        setData(value);
        setLoading(false);
      } else {
        setData(null);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // fetch video data

  const paginationVariants = {
    hidden: {
      opacity: 0,
      y: 200,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 2,
      },
    },
  };

  //bookmark id interface

  interface Bookmark {
    id: number;
  }
  // pagination

  //bookmark function
  const HandleSetBookMark = () => {
    if (bookmark) {
      // Remove the video data from bookmarks
      const bookmarkedVideos =
        JSON.parse(localStorage.getItem("bookmark") ?? "[]") || [];
      const updatedBookmarks = bookmarkedVideos.filter(
        (item: Bookmark) => item.id !== parseInt(router.id as string)
      );
      localStorage.setItem("bookmark", JSON.stringify(updatedBookmarks));
      setBookmark(false);
    } else {
      // Add the video data to bookmarks
      const bookmarkedVideos =
        JSON.parse(localStorage.getItem("bookmark") ?? "[]") || [];
      bookmarkedVideos.push(data);
      localStorage.setItem("bookmark", JSON.stringify(bookmarkedVideos));
      setBookmark(true);
    }
  };



  // fetch my video
  useEffect(() => {
    if (router) {
      FetchVideoDetails();
      const bookmarkedVideos =
        JSON.parse(localStorage.getItem("bookmark") ?? "[]") || [];
      const isBookmarked = bookmarkedVideos.some(
        (item: Bookmark) => item.id === parseInt(router.id as string)
      );
      console.log("all bookmark id ", isBookmarked);
      console.log("all bookmark BOOKMARK ", bookmarkedVideos);
      setBookmark(isBookmarked);
    }
  }, [router, , router.id]);
  return (
    <>
      {data ? (
        <>
          <div>
            <Navbar HandleSearch={handleOpen} />
          </div>
          <div>
            <Leftsidebar />
          </div>
          <div></div>
          {loading ? (
            <div className=" flex justify-center items-center lg:ml-[100px] lgLmx-[20px] mt-[80px]  min-h-[500px] lg:max-w-[78%] max-w-[100%] bg-[#777676] rounded-3xl animate-pulse"></div>
          ) : (
            <div className=" flex flex-col justify-center items-center gap-5 lg:pl-[10%] pl-[10px] pt-[80px] max-w-[97%]  lg:max-w-[85%] ">
              <div
                className="  bg-cover w-[100%]  min-h-[250px] lg:min-h-[500px] object-contain rounded-[15px]  bg-center"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://www.themoviedb.org/t/p/w1280/${data.backdrop_path})`,
                  backgroundPosition: "top center",
                  transition: "background-image 0.3s ease-in-out",
                }}
              >
                <div className="flex flex-col justify-start items-start gap-[8px] ml-10 mt-[32%] w-[80%] ">
                  <h2 className="text-[#fff] text-[3.5vw] font-[600] ">
                    {data.original_title}
                  </h2>

                  <Button
                    onClick={() => handleOpen("md")}
                    variant="gradient"
                    className="flex items-center "
                  >
                    <BsPlayFill className="text-[20px]" />{" "}
                    <span className="lg:block hidden">Watch trailer</span>
                  </Button>

                  <UseMovieDialog
                    size={size}
                    handleOpen={handleOpen}
                    selectedMovies2={data}
                  />
                </div>
              </div>
              <div className=" w-[100%] ">
                <div className="flex flex-col mb-[10px] gap-7">
                  <div className="flex items-center gap-2">
                    {data.genres.map((items) => {
                      return (
                        <button
                          className="h-[fit-content] lg:w-[auto] w-[auto] px-[10px] lg:px-[30px]  py-[5px]  rounded-md bg-[#E50914]"
                          key={items.id}
                        >
                          {items.name}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-start flex-wrap gap-[1rem]  justify-between ">
                    <div className="flex justify-between  items-center gap-5 ">
                      <div className="lg:h-[7rem] lg:w-[7rem] h-[5rem] w-[5rem] px-[3rem] flex justify-center flex-col items-center text-center rounded-lg border-[2px] border-[#E50914]">
                        <h2 className="text-[1.7rem] text-[#E50914]">
                          {data.vote_average}
                        </h2>
                        <p className="text-[.6rem]">{data.vote_count}</p>
                      </div>

                      <div className="w-[200%]">
                        <span className="flex items-center gap-[5px] lg:text-[1rem] text-[12px] ">
                          {" "}
                          <mark className="text-[#E50914] bg-[transparent]">
                            {" "}
                            Release Date:{" "}
                          </mark>
                          {data.release_date}{" "}
                        </span>
                        <span className="flex items-center gap-[5px]lg:text-[1rem] text-[12px]">
                          {" "}
                          <mark className="text-[#E50914] bg-[transparent]">
                            {" "}
                            Duration:{" "}
                          </mark>{" "}
                          <p> {data.runtime}min </p>{" "}
                        </span>
                        <span className="flex items-center gap-[5px] lg:text-[1rem] text-[12px]">
                          {" "}
                          <mark className="text-[#E50914] bg-[transparent]">
                            status:{" "}
                          </mark>{" "}
                          <p> {data.status}</p>{" "}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div
                        className={`flex items-center justify-end gap-2 rounded-md py-[10px] lg:px-9 px-[23px] border-[2px] border-[#E50914] cursor-pointer ${
                          bookmark ? "bg-[#E50914]" : "bg-[transparent]"
                        }`}
                        onClick={HandleSetBookMark}
                      >
                        <span className="lg:text-[1rem] text-[12px]">
                          {bookmark ? "Bookmarked" : "BookMark"}
                        </span>
                        <BsFillBookmarksFill
                          className={` lg:text-[1rem] text-[12px] text-${
                            bookmark ? "#fff" : "#E50914"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sec2">
                  <div>
                    <p className="text-[1rem] leading-[1.5]">{data.overview}</p>
                  </div>
                  <div className="flex flex-col items-start">
                    <h1 className="text-[2rem]">Casts</h1>
                    <div>
                      <div>
                        <motion.div
                          variants={paginationVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          <ul className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 lg:gap-[2.5rem] md:gap-[2.5rem] gap-[2.5rem] ">
                            {cast &&
                              cast.map((data: any) => {
                                return (
                                  <Link
                                    href={`https://www.google.com/search?q=${data.name}`}
                                    target="_blank"
                                    key={data.id}
                                  >
                                    <div className="  h-[auto]  w-[auto] lg:h-[17rem] lg:w-[100%]  flex flex-col gap-[10px] ">
                                      <div className="relative rounded-lg border-[2px] border-[#E50914] cursor-pointer transition duration-500 group ">
                                        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent hover:rounded-lg to-black opacity-0 group-hover:opacity-100 "></div>
                                        {data.profile_path === null ? (
                                          <div className="lg:h-[14rem]  h-[20rem] w-[auto]  animate-pulse flex items-center text-center justify-center rounded-s-lg ">
                                            <div></div>
                                            <p className="text-[#fff] text-[20px]">
                                              no image found
                                            </p>
                                          </div>
                                        ) : (
                                          <img
                                            src={`https://www.themoviedb.org/t/p/w440_and_h660_face/${data.profile_path}`}
                                            className="rounded-lg lg:h-auto lg:w-auto h-[150%]"
                                            alt={data.name}
                                          ></img>
                                        )}
                                      </div>
                                      <p>{data.original_name}</p>
                                    </div>
                                  </Link>
                                );
                              })}
                          </ul>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
}
