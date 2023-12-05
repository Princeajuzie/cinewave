"use client"
import { Typography } from "@material-tailwind/react";
import Link from "next/link.js";
export default function Footer() {
  return (
    <div>
      

 

     <footer className="w-[auto]  bg-[#000] ">
       <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-[#000] text-center md:justify-between lg:pr-[50px]">
         {/* <img src="/img/logo-ct-dark.png" alt="logo-ct" className="w-10" /> */}
         <svg fill="none" height="42" viewBox="0 0 32 32" width="42" xmlns="http://www.w3.org/2000/svg" className="w-10 bg-[#000]" >
            <rect height="100%" rx="16" width="100%"></rect>
            <path
              clipRule="evenodd"
              d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
              fill="#E8E8E8"
              fillRule="evenodd"
            ></path>
          </svg>
         <ul className="flex flex-wrap items-center gap-y-2 gap-x-8  ">
           <li>
             <Typography
               as="a"
               href="#"
               className="font-normal transition-colors hover:text-[#E50914] focus:text-[#e5091497] text-[#E8E8E8]"
             >
               About Us
             </Typography>
           </li>
           <li>
             <Typography
               as="a"
               href="#"
              //  style={{ color: "#161616" }}
               className="font-normal transition-colors text-[#E8E8E8] hover:text-[#E50914] focus:text-[#e5091497]"
             >
               License
             </Typography>
           </li>
           <li>
             <Typography
               as="a"
               href="#"
               className="font-normal transition-colors text-[#E8E8E8] hover:text-[#E50914] focus:text-[#e5091497]"
             >
               Contribute
             </Typography>
           </li>
           <li>
             <Typography
               as="a"
               href="#"
             
               className="font-normal transition-colors text-[#E8E8E8] hover:text-[#E50914] focus:text-[#e5091497]"
             >
               Contact Us
             </Typography>
           </li>
         </ul>
       </div>
       <hr className="my-8 border-blue-gray-50" />
       <Link href="https://bio.link/princeaj">


       <Typography    className="text-center font-normal text-[#E8E8E8]">
         &copy; 2023 Prince Ajuzie
       </Typography>
       </Link>
     </footer>


    </div>
  )
}
