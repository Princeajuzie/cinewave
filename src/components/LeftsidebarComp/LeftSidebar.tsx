"use client"
import { UseCollapse } from "@/hooks/UseCollapse";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { AiTwotoneHome } from "react-icons/ai";
import { BsFillBookmarksFill } from "react-icons/bs";
import { BsFire } from "react-icons/bs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect} from "react";
import { useRouter } from "next/router"; // Import the useRouter hook


export default function Leftsidebar() {
  const { iscollapse, Handlecollapse } = UseCollapse();
  const pathname = usePathname(); 




  return (
    <>
      <aside className={`sidebar h-full sidebar-fixed-left justify-start tablet:hidden bg-[#1C1C1C] `}  data-collapse={iscollapse}>
        <section className="sidebar-title items-center p-4">
          <svg fill="none" height="42" viewBox="0 0 32 32" width="42" xmlns="http://www.w3.org/2000/svg">
            <rect height="100%" rx="16" width="100%"></rect>
            <path
              clipRule="evenodd"
              d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
              fill="#E8E8E8"
              fillRule="evenodd"
            ></path>
          </svg>
          <div className="flex flex-col">
            <span className={iscollapse ? `hidden` : `menu-title text-[#E8E8E8] `}>CineWaves</span>
            {/* <span className={iscollapse ? `hidden` : `text-xs font-normal text-content2`}>Team Plan</span> */}
          </div>
        </section>
        <section className="sidebar-content h-fit min-h-[20rem] overflow-visible">
          <nav className="menu rounded-md">
            <section className="menu-section px-4 mt-[20px]">
              <ul className="menu-items gap-[30px]">
                <li className="menu-item hover:bg-white/10" onClick={Handlecollapse}>
                  <MdOutlineKeyboardDoubleArrowRight className="h-5 w-5 opacity-15 flex items-center justify-center text-[#E8E8E8]" />
                  <span className={iscollapse ? `hidden` : `menu-title text-[#E8E8E8]`}>Expand</span>
                </li>
					<Link href="/">
                <li className={`menu-item hover:bg-white/10 ${pathname === "/" ? "bg-white/10" : ""} li-children`} >
					
                  <AiTwotoneHome className="h-5 w-5 opacity-75 flex items-center justify-center text-[#E8E8E8]" />
                  <span className={iscollapse ? `hidden` : `menu-title text-[#E8E8E8]`}>Home</span>
                </li>
					</Link>
                  <Link href="trending">
                <li className={`menu-item hover:bg-white/10 ${pathname === "/trending" ? "bg-white/10" : ""} li-children`}>
                    <BsFire className="h-5 w-5 opacity-15 flex items-center justify-center text-[#E8E8E8]" />
                    <span className={iscollapse ? `hidden` : `menu-title text-[#E8E8E8]`}>Trending</span>
                </li>
                  </Link>
                  <Link href="bookmark">
                <li className={`menu-item hover:bg-white/10 ${pathname === "/bookmark" ? "bg-white/10" : ""} li-children`}>
                    <BsFillBookmarksFill className="h-5 w-5 opacity-15 flex items-center justify-center text-[#E8E8E8]" />
                    <span className={iscollapse ? `hidden` : `menu-title text-[#E8E8E8]`}>All BookMarks</span>
                </li>
                  </Link>
         
              </ul>
            </section>
          </nav>
        </section>
      </aside>
    </>
  );
}
