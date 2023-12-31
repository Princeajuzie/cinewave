"use client";
import Footer from "@/components/FooterComp/Footer";
import Leftsidebar from "@/components/LeftsidebarComp/LeftSidebar";
import Navbar from "@/components/NavbarComp/Navbar";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Page() {
  interface Data {
    id: number;
    name: string;
    poster_path: string;
  }

  const [data, setData] = useState<Data[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const savedBookmarks =
      JSON.parse(localStorage.getItem("bookmark") ?? "[]") || [];
    if (savedBookmarks) {
      setData(savedBookmarks);
      setLoading(false);
    }
  }, []);

  return (
    <>
      <div>
        <div>
          <Navbar />
        </div>

        <div>
          <Leftsidebar />
        </div>

        <div className=" px-[1rem] md:pt-[5rem] lg:pl-[7rem] pt-[5rem] lg:pr-[1rem] h-[100%]">
          {loading ? (
            <></>
          ) : (
            <div>
              {data?.length === 0? (
                <div className="h-[60vh] w-auto flex items-center justify-center m-auto">
                  <h1 className=" text-red-600 text-center">
                    No BookMark found
                  </h1>
                </div>
              ) : (
                <ul className=" grid-cols-2 md:grid-col-3 grid lg:grid-cols-4  gap-[1rem]">
                  {data?.map((item) => {
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
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

//
