"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { BsFire } from "react-icons/bs";
import { PiMonitorFill } from "react-icons/pi";
import { PiBookmarksFill } from "react-icons/pi";
import { IoIosArrowBack } from "react-icons/io";
import { Input, Button } from "@material-tailwind/react";
import {usePathname }from "next/navigation";
import { TbMenuDeep } from "react-icons/tb";
import { useParams } from "next/navigation.js";

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter();
  const {id } = useParams()
  //use history 
  const HandleBack = () => {
     router.back()
  }
  return (
    <>
      <div className="navbar bg-[#1C1C1C] rounded-lg lg:gap-0 gap-[1rem] navbar-sticky z-[55]">
        <div className="navbar-start  lg:pl-[100px] pl-[10px] whitespace-nowrap ">
          {pathname === "/" ?
          
            <>
              <a className="navbar-item lg:text-[20px] w-auto font-[500] sm:text-[15px] flex items-center gap-2">
                <span className="line-clamp-2">Popular Movies</span>
                <PiMonitorFill className="text-[30px]" />
              </a>

              <a className="h-[fit-content] w-[100px] lg:px-[30px] py-[8px] text-center rounded-md bg-[#E50914]">
                Genre
              </a>
            </>
            : <></>
        }
            {pathname.includes(`/${id}`) ? (
      <div
      className="h-[fit-content] w-[100px]   py-[8px] text-center rounded-md bg-[#E50914] flex items-center justify-center cursor-pointer"
      onClick={HandleBack}
    >
      <IoIosArrowBack className="text-[#fff] lg:text-[20px] text-[20px]" />
      <span>Back</span>
    </div>
            ) : <></>
        
            }
        
        </div>
        <div className="flex justify-evenly items-end pr-[8px]">
          <TbMenuDeep
            htmlFor="sidebar-mobile-fixed"
            className="text-[2.3rem]  lg:hidden cursor-pointer "
    
          />
        </div>
      </div>

    </>
  );
}
