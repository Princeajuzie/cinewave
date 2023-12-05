"use client";
import { useEffect, useState } from "react";
import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import TmdpConfig from "@/utils/TmdpConfig";
import { useRouter } from "next/navigation";
import { UseCollapse } from "./UseCollapse";

interface Props {
  size: null |string;
  handleOpen : (value: string)=> void,
  selectedMovies2:  any
  // setSelectedMovie2: React.Dispatch<React.SetStateAction<any>>
}


interface Trailer {
  original_title: string,
  videos: string,
  key: string,
  site: string,
}
const UseMovieDialog: React.FC<Props> = ({
  size,
  handleOpen,
  selectedMovies2,

}) => {
  const [loading2, setLoading2] = useState<boolean>(true);
  const [vidinfo, setvidinfo] = useState<any | null>(null);


   
  const router = useRouter();
  const fetchData = async () => {
    try {
      const response = await TmdpConfig.get(`movie/${selectedMovies2?.id}`);
      const value = response.data.videos.results;
      setvidinfo(value)
      console.log("value movie ", value);
      setLoading2(false);
    } catch (error) {
      console.error("Error fetching trailer data:", error);
      setLoading2(false);
    }
  };

  // fetch data for the selected movie

  useEffect(() => {
    if (router) {
      fetchData();
    }
  }, [selectedMovies2, router]);

  // Render trailer function
  

  // console.log("data find ", vidinfo?.map((item:any)=>{
  //   return item
  // }) );
  const datFind = vidinfo?.find((vid:any )=> vid.site === "YouTube" )
  const RendeTrailer = () => {

    console.log("data find", datFind);
    
    return (
      <>
        {datFind?.key ? (
          <div className="video-responsive">
            <iframe
              width="853"
              height="480"
              src={`https://www.youtube.com/embed/${datFind.key}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </div>
        ) : (
          <p className="text-[30px] text-[#E50914]">no trailer found</p>
        )}

   </>
    );
  };

  // Rest of your component code...

  return(
    <>
      
    
    <Dialog
      open={
       
        size === "md" 
       
      }
      handler={handleOpen}
      className="bg-[#1C1C1C] border-[transparent] px-2"
    >
      
      {loading2? 
      
      <div>  
      <p  className="text-[30px] text-[#E50914]">no trailer found</p>
      </div>
      : 

      <>
      
      
      <DialogHeader className="text-[#efefef] flex text-center items-center m-[auto] justify-center" >Tittle: {selectedMovies2?.original_title}.</DialogHeader>
      <DialogBody >
        <div className="flex items-center justify-center m-auto ">


       {vidinfo ? RendeTrailer() : null}
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={() => {
          
              handleOpen("");}}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
   
      </DialogFooter>
      </>
  }
    </Dialog>
  </>
  );
};

export default UseMovieDialog;
