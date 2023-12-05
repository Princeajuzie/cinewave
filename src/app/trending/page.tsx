"use client";

import Footer from "@/components/FooterComp/Footer";
import Navbar from "@/components/NavbarComp/Navbar";
import Leftsidebar from "@/components/LeftsidebarComp/LeftSidebar";
import ReactPaginate from "react-paginate";
import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { motion } from "framer-motion";
import Link from "next/link";
import TmdpConfig from "@/utils/TmdpConfig";
import axios from "axios";
import { UseCollapse } from "@/hooks/UseCollapse";
import UseMovieDialog from "@/hooks/UseMovieDialog";

export default function Page() {
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

    genres: { id: number; name: string }[];
    vote_average: number;
    vote_count: number;
    runtime: number;
    overview: string;
  }


  interface Paginate {
    selected: number;
  }
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loading2, setLoading2] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchResult, setSearchResult] = useState<Data[]>([]);
  const [recordsPerPage] = useState<number>(5);
  const { search, setSearch } = UseCollapse();
  
  const [ImageValue, setImageValue] = useState<Data | null>(null);
  const { size, setSize, handleOpen } = UseCollapse();
  const HandleFetch = async (page: number) => {
    const type = "discover";
    try {
      const response = await TmdpConfig.get(
        `${type}/movie?language=en-US&page=${page}`
      );
      console.log("searching");
      const randomIndex = Math.floor(Math.random() * 20);
      // const randomItem = ImageValue[randomIndex];
      const Valueget = response.data.results;
      setData(Valueget);
      setImageValue(Valueget[randomIndex]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("ImageValue", ImageValue);
  const HandleSearch: any = async (searchKey: string) => {
    try {
      const response = await TmdpConfig.get(`search/movie?language=en-US`, {
        params: {
          query: searchKey,
        },
      });

      console.log("searching");
      const Valueget = response.data.results;
      setSearchResult(Valueget);
      setLoading2(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    HandleFetch(currentPage);
  }, [currentPage]);

  const handlePageClick = (selected: Paginate) => {
    setCurrentPage(selected.selected + 1);
  };

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


  const showNextButton = currentPage !== recordsPerPage - 1;
  const showPrevButton = currentPage !== 0;
  return (
    <>
      <div className="lg:pl-[7rem] px-2 ">
        <div>
          <Navbar HandleSearch={HandleSearch} />
        </div>
        <div>
          <Leftsidebar />
        </div>

        <div className="pt-[5rem]  lg:pr-[30px] flex flex-col gap-[20px] justify-center">
          <div>

             
                <>
                  <div
                    className="  bg-cover w-[100%] flex flex-col items-start justify-end  min-h-[400px] object-contain rounded-3xl  bg-center"
                    style={{
                      backgroundImage: ImageValue
                        ? `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://www.themoviedb.org/t/p/w1280/${ImageValue.backdrop_path})`
                        : "",
                      backgroundPosition: "top center",
                      transition: "background-image 0.3s ease-in-out",
                    }}
                    
                    
                  >
                    <div className="mb-[30px]  flex flex-col ml-3 items-start justify-end">
                      <h2 className="text-[2rem] font-semibold min-w-full">
                        {ImageValue?.original_title}
                      </h2>
                      <Button variant="gradient" className="w-[fitcontent]"     onClick={() => handleOpen("md")}>
                        {" "}
                        watch Trailer
                      </Button>
                      <UseMovieDialog    size={size}
                    handleOpen={handleOpen}
                    selectedMovies2={ImageValue}/>
                    </div>
                  </div>
                </>
            
          </div>

          {search === "" ? (
            <>
              {loading ? (
                <div className="">
                  <ul className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 autofill:grid-cols-4 gap-[1rem]">
                    {Array.from({ length: 20 }, (_, index) => (
                      <li
                        key={index}
                        className="h-[19rem] w-[auto] bg-[#777676] rounded animate-pulse"
                      ></li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="">
                  <ul className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 autofill:grid-cols-4 gap-[1rem]">
                    {data &&
                      data?.map((item: any) => {
                        return (
                          <Link href={`/${item.id}`} key={item.id}>
                            <li key={item.id} className="  ">
                              <img
                                src={`https://www.themoviedb.org/t/p/w440_and_h660_face/${item.poster_path}`}
                                alt=""
                                className="rounded-lg  mb-[] h-[auto] w-[16rem]"
                              />
                            </li>
                          </Link>
                        );
                      })}
                  </ul>
                </div>
              )}

              <div className="w-full max-w-[100%] overflow-x-auto">
                <motion.div
                  variants={paginationVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <ReactPaginate
                    breakLabel={
                      <span className="mr-4 text-[#e5091489]">...</span>
                    }
                    nextLabel={
                      showNextButton ? (
                        <span className="w-10 h-10 flex items-center justify-center bg-[#E50914] rounded-md">
                          <BsChevronRight />
                        </span>
                      ) : (
                        <span className="w-10 h-10 flex  items-center justify-center bg-[#e5091489] rounded-md mr-4">
                          <BsChevronRight />
                        </span>
                      )
                    }
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={500}
                    previousLabel={
                      showPrevButton ? (
                        <span className="w-10 h-10 flex  items-center justify-center bg-[#E50914] rounded-md mr-4">
                          <BsChevronLeft />
                        </span>
                      ) : (
                        <span className="w-10 h-10 flex  items-center justify-center bg-[#e5091489] rounded-md mr-4">
                          <BsChevronRight />
                        </span>
                      )
                    }
                    containerClassName="flex items-center justify-center mt-8 mb-4"
                    pageClassName="block border- border-solid border-lightGray hover:bg-[#e5091489] w-10 h-10 flex items-center justify-center rounded-md mr-4"
                    activeClassName="bg-[#E50914] text-[white]"
                  />
                </motion.div>
              </div>
            </>
          ) : (
            <>
              {loading2 ? (
                <div className="">
                  <ul className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 autofill:grid-cols-4 gap-[1rem]">
                    {Array.from({ length: 20 }, (_, index) => (
                      <li
                        key={index}
                        className="h-[19rem] w-[auto] bg-[#777676] rounded animate-pulse"
                      ></li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="">
                  <ul className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 autofill:grid-cols-4 gap-[1rem]">
                    {searchResult &&
                      searchResult.map((item: any) => {
                        return (
                          <Link href={`/${item.id}`} key={item.id}>
                            <li className="  ">
                              <img
                                src={`https://www.themoviedb.org/t/p/w440_and_h660_face/${item.poster_path}`}
                                alt=""
                                className="rounded-lg  mb-[] h-[auto] w-[16rem]"
                              />
                            </li>
                          </Link>
                        );
                      })}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>

        <div className="">
          <Footer />
        </div>
      </div>
    </>
  );
}
