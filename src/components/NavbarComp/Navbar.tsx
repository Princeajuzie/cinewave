"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { BsFire } from "react-icons/bs";
import { PiMonitorFill } from "react-icons/pi";
import { PiBookmarksFill } from "react-icons/pi";
import { IoIosArrowBack } from "react-icons/io";
import { Input, Button } from "@material-tailwind/react";
import { usePathname } from "next/navigation";
import { TbMenuDeep } from "react-icons/tb";
import { useParams } from "next/navigation.js";
import MinSidebar from "@/components/MinSidebar/MinSidebar";
import { UseCollapse } from "@/hooks/UseCollapse";
declare module "@material-tailwind/react" {
  interface InputProps {
    crossOrigin?: string;
  }
}
export default function Navbar({HandleSearch}: {
  HandleSearch?: (searchKey: string) => void | null
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { id } = useParams();
  //use history

  const { search, setSearch } = UseCollapse();

  const isLocalStorageAvailable = typeof window !== "undefined";

  // const [toggle, setIstoggle] = useState<boolean>(
  //   isLocalStorageAvailable ? localStorage.getItem("istoggle") === "true" : true
  // );

  // ...

  const [toggle, setIstoggle] = useState(() => {
    const localStorageKey = 'istoggle';
    if (isLocalStorageAvailable) {
      const storedValue = localStorage.getItem(localStorageKey);
      return storedValue !== null ? storedValue === 'true' : false;
    }
    return false;
  });
  
  // ...
  
  const HandleToggle = useCallback(() => {
    setIstoggle((prev) => !prev);
    if (isLocalStorageAvailable) {
      const localStorageKey = 'istoggle';
      localStorage.setItem(localStorageKey, `${!toggle}`);
    }
  }, [toggle, isLocalStorageAvailable]);
  
  console.log(search);
  useEffect(() => {
    if (router) {
      
    }
  }, [router]);

  const handleSubmit = () => {
    if (HandleSearch) {
      HandleSearch(search);
    }
  };
  const HandleBack = () => {
    router.back();
  };
  return (
    <>
      <div className="navbar bg-[#1C1C1C] rounded-lg lg:gap-0 gap-[1rem] navbar-sticky z-[55]">
        <div className="navbar-start  lg:pl-[100px] pl-[10px] whitespace-nowrap ">
          {/* home page navbar  */}
          {pathname === "/" ? (
            <>
              <a className="navbar-item lg:text-[20px] w-auto font-[500] sm:text-[15px] flex items-center gap-2 ">
                <span className="line-clamp-2 text-[#E8E8E8]">Popular Movies</span>
                <PiMonitorFill className="text-[30px] text-[#E8E8E8]" />
              </a>

              <a className="h-[fit-content] w-[100px] lg:px-[30px] py-[8px] text-center rounded-md bg-[#E50914] text-[#E8E8E8]">
                Genre
              </a>
            </>
          ) : (
            <></>
          )}
          {/* bookmark page navbar  */}
          {pathname === "/bookmark" ? (
            <>
              <div className="navbar-item lg:text-[20px] font-[500] sm:text-[15px] flex items-center gap-2">
                <span className="text-[#E8E8E8]">Bookmarks</span>
                <PiBookmarksFill className="text-[30px] text-[#E8E8E8]" />
              </div>

              <button className="w-[100%] py-[8px] px-[10px] h-[fit-content] lg:w-[auto] lg:px-[30px] lg:py-[8px]  rounded-md bg-[#E50914] text-[#E8E8E8]">
                All BookMarks
              </button>
            </>
          ) : (
            ""
          )}
          {/* trending page navbar  */}
          {pathname === "/trending" ? (
            <>
              <a className="navbar-item lg:text-[20px] font-[500] sm:text-[15px] flex items-center gap-2">
                <span className="text-[#E8E8E8] hidden lg:block">discover Movies</span>
                <BsFire className="text-[30px] text-[#E8E8E8]" />
              </a>

              <a className="h-[fit-content] w-[100px] lg:px-[30px] hidden lg:block py-[8px] text-center rounded-md bg-[#E50914] text-[#E8E8E8]">
                Genre
              </a>

              <div className="items-center gap-x-2 lg:flex">
                <div className="relative flex w-full gap-2 md:w-max">
                  <Input
                    type="search"
                    placeholder="Search"
                    onChange={(e) => {
                      setSearch(e.target.value);
                      handleSubmit();
                    }}
                    containerProps={{
                      className: "min-w-[288px]",
                    }}
                    // onKeyDown={HandleSubmit}
                    className=" !border-t-blue-gray-300 pl-9 placeholder:text-blue-gray-300 focus:!border-blue-gray-300"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  <Button size="md" className="rounded-lg text-[#E8E8E8] hidden">
                    Search
                  </Button>

                  <div className="!absolute left-3 top-[13px] text-[#E8E8E8]">
                    <svg
                      width="13"
                      height="14"
                      viewBox="0 0 14 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.97811 7.95252C10.2126 7.38634 10.3333 6.7795 10.3333 6.16667C10.3333 4.92899 9.84167 3.742 8.9665 2.86683C8.09133 1.99167 6.90434 1.5 5.66667 1.5C4.42899 1.5 3.242 1.99167 2.36683 2.86683C1.49167 3.742 1 4.92899 1 6.16667C1 6.7795 1.12071 7.38634 1.35523 7.95252C1.58975 8.51871 1.93349 9.03316 2.36683 9.4665C2.80018 9.89984 3.31462 10.2436 3.88081 10.4781C4.447 10.7126 5.05383 10.8333 5.66667 10.8333C6.2795 10.8333 6.88634 10.7126 7.45252 10.4781C8.01871 10.2436 8.53316 9.89984 8.9665 9.4665C9.39984 9.03316 9.74358 8.51871 9.97811 7.95252Z"
                        fill="#CFD8DC"
                      />
                      <path
                        d="M13 13.5L9 9.5M10.3333 6.16667C10.3333 6.7795 10.2126 7.38634 9.97811 7.95252C9.74358 8.51871 9.39984 9.03316 8.9665 9.4665C8.53316 9.89984 8.01871 10.2436 7.45252 10.4781C6.88634 10.7126 6.2795 10.8333 5.66667 10.8333C5.05383 10.8333 4.447 10.7126 3.88081 10.4781C3.31462 10.2436 2.80018 9.89984 2.36683 9.4665C1.93349 9.03316 1.58975 8.51871 1.35523 7.95252C1.12071 7.38634 1 6.7795 1 6.16667C1 4.92899 1.49167 3.742 2.36683 2.86683C3.242 1.99167 4.42899 1.5 5.66667 1.5C6.90434 1.5 8.09133 1.99167 8.9665 2.86683C9.84167 3.742 10.3333 4.92899 10.3333 6.16667Z"
                        stroke="#CFD8DC"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
          {pathname.includes(`/${id}`) ? (
            <div
              className="h-[fit-content] w-[100px]   py-[8px] text-center rounded-md bg-[#E50914] flex items-center justify-center cursor-pointer text-[#E8E8E8]"
              onClick={HandleBack}
            >
              <IoIosArrowBack className="text-[#fff] lg:text-[20px] text-[20px]" />
              <span>Back</span>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="flex justify-evenly items-end pr-[8px] text-[#E8E8E8]">
          <TbMenuDeep
            htmlFor="sidebar-mobile-fixed"
            onClick={HandleToggle}
            className="text-[2.3rem]  lg:hidden cursor-pointer text-[#E8E8E8]"
          />
        </div>
      </div>
      <MinSidebar toggle={toggle} HandleToggle={HandleToggle} setIstoggle={setIstoggle} />
    </>
  );
}
