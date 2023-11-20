import { useContext } from "react";
import { CollapseContext } from "@/context/CollapseContext";

export function UseCollapse() {
    const contextValue =   useContext(CollapseContext)
   if(!contextValue){
    throw new Error ('no CollapseContext defined')
   }

    const {iscollapse, setIscollapse,isLocalStorageAvailable,size, setSize, Handlecollapse, handleOpen, search, setSearch } =contextValue;
    return{
        iscollapse, setIscollapse,isLocalStorageAvailable,size, setSize, Handlecollapse, handleOpen, search, setSearch 
    }
}