"use client";
import React from "react"
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { AiTwotoneHome } from "react-icons/ai";
import { BsFillBookmarksFill } from "react-icons/bs";
import { BsFire } from "react-icons/bs";
import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/router"; // Import the useRouter hook
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function MinSidebar({
  toggle,
  HandleToggle,
  setIstoggle
}: {
  toggle: boolean;
  HandleToggle: () => void;
  setIstoggle: React.Dispatch<React.SetStateAction<boolean>>,
}) {
  const pathname = usePathname();


  // useEffect(() => {
  //   const handleResize = () => {
  //      if(typeof window !== "undefined"){

  //        const isDesktop = window.innerWidth >= 1024; // You can adjust the threshold as needed
  //        if(isDesktop){

  //         const localStorageKey = 'istoggle';
  //         localStorage.setItem(localStorageKey, `${!toggle}`);
  //        }
  //      }
  //   };

  //   // Call the function once to set the initial state
  //   handleResize();

  //    if(typeof window !== "undefined"){

  //      // Add a resize event listener
  //      window.addEventListener("resize", handleResize);
   
  //      // Clean up the event listener on component unmount
  //      return () => {
  //        window.removeEventListener("resize", handleResize);
  //      };
  //    }
  // }, [setIstoggle]);

  
  const Nav_animation = {
    open: {
      width: "15rem",
      transition: {
        damping: 40,
      },
    },

    close: {
      width: "0",
      transition: {
        damping: 40,
      },
    },
  };


  return (
    <>
      <div className="flex">
        <div
          className={` fixed inset-0 w-[100%] max-h-screen z-[55] bg-black/50 ${
            toggle ? "block" : "hidden" 
          }`}
          onClick={HandleToggle}
        ></div>
        <motion.aside
          variants={Nav_animation}
          animate={toggle ? "open" : "close"}
          className={` ${"sidebar h-full sidebar-fixed-left justify-start "} bg-[#1C1C1C] hidden sidebar-transition `}
          data-toggle={toggle}
        >
          <section className="sidebar-title items-center p-4">
            <svg
              fill="none"
              height="42"
              viewBox="0 0 32 32"
              width="42"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect height="100%" rx="16" width="100%"></rect>
              <path
                clipRule="evenodd"
                d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                fill="#E8E8E8"
                fillRule="evenodd"
              ></path>
            </svg>
            <div className="flex flex-col text-[#E8E8E8]">
              <motion.span
                animate={
                  toggle
                    ? {
                        fontSize: ".75rem",
                        fontWeight: 400,
                        lineHeight: "1rem",
                      }
                    : {
                        fontSize: "0px",
                      }
                }
              >
                CineWaves
              </motion.span>
              {/* <span className={iscollapse ? `hidden` : `text-xs font-normal text-content2`}>Team Plan</span> */}
            </div>
          </section>
          <section className="sidebar-content h-fit min-h-[20rem] overflow-visible">
            <motion.nav
              animate={
                toggle
                  ? {
                      display: "flex",
                      flexDirection: "column",
                      gap: ".5rem",
                      borderRadius: "0.375rem",
                    }
                  : {
                      display: "none",
                    }
              }
            >
              <section className="menu-section px-4 mt-[20px]">
                <ul className="menu-items gap-[30px]">
                  <li className="menu-item text-[#E8E8E8] hover:bg-white/10">
                    <MdOutlineKeyboardDoubleArrowRight className="h-5 w-5 opacity-15 flex items-center justify-center text-[#E8E8E8]" />
                    <span className={`menu-title text-[#E8E8E8]`}>Expand</span>
                  </li>
                  <Link href="/">
                    <li
                      className={`menu-item hover:bg-white/10 ${
                        pathname === "/" ? "bg-white/10" : ""
                      } li-children `}
                      onClick={HandleToggle} >
                      <AiTwotoneHome className="text-[#E8E8E8] h-5 w-5 opacity-75 flex items-center justify-center" />
                      <span className={`menu-title text-[#E8E8E8]`}>Home</span>
                    </li>
                  </Link>
                  <Link href="trending">
                    <li
                      className={`menu-item hover:bg-white/10 ${
                     pathname === "/trending" ? "bg-white/10" : ""
                      } li-children`}
                      onClick={HandleToggle} >
                      <BsFire className="h-5 w-5 opacity-15 flex items-center justify-center text-[#E8E8E8]" />
                      <span className={`menu-title text-[#E8E8E8]`}>Trending</span>
                    </li>
                  </Link>
                  <Link href="bookmark">
                    <li
                      className={`menu-item hover:bg-white/10 ${
                  pathname === "/bookmark" ? "bg-white/10" : ""
                      } li-children`}
                      onClick={HandleToggle}  >
                      <BsFillBookmarksFill className="h-5 w-5 opacity-15 flex items-center justify-center text-[#E8E8E8]" />
                      <span className={`menu-title text-[#E8E8E8]`}>All BookMarks</span>
                    </li>
                  </Link>
                </ul>
              </section>
            </motion.nav>
          </section>
        </motion.aside>
      </div>
    </>
  );
}
