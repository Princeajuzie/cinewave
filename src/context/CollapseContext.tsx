"use client"
import React, { createContext, useState, useCallback, ReactNode } from "react";

type CollapseContextProps  = {
  iscollapse: boolean,
  setIscollapse:React.Dispatch<React.SetStateAction<boolean>>,
  isLocalStorageAvailable: boolean,
  setSize: React.Dispatch<React.SetStateAction<number | null>>,
  Handlecollapse: ()=> void,
  search: string,
  size: number | null, 
  setSearch: React.Dispatch<React.SetStateAction<string>>,
  handleOpen : (value:number | null)=> void,

} | undefined
export const CollapseContext  = createContext<CollapseContextProps | undefined>(undefined)


export  const CollapseProvider = ({children}: {children : React.ReactNode})=>{
    const isLocalStorageAvailable = typeof window !== 'undefined';
    const [size, setSize] = useState<number | null>(null);
    const [search, setSearch] = useState("")
 
    const handleOpen = (value: number | null) => setSize(value);
  
	const [iscollapse, setIscollapse] = useState(
	  isLocalStorageAvailable
		? localStorage.getItem('iscollapse') === 'true'
		: true
	);


      const Handlecollapse = useCallback(()=>{
        setIscollapse((prev) => !prev);
        // Check if window is defined (client-side) before using localStorage
        if (isLocalStorageAvailable) {
          localStorage.setItem('iscollapse', !iscollapse? "true" : "false");
        }
      },[iscollapse])
    return(
        <CollapseContext.Provider value={{iscollapse, setIscollapse,isLocalStorageAvailable,size, setSize, Handlecollapse, handleOpen, search, setSearch }}>
            {children}
        </CollapseContext.Provider>
    )
}

