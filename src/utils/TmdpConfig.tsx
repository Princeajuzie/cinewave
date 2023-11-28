import axios from "axios";

const Acesstoken =process.env.NEXT_PUBLIC_ACESS_TOKEN;
// add your Acesstoken credentials here

export default axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    Accept: "application/json",
    "content-type": "application/json",
    Authorization: `Bearer ${Acesstoken}`,
  },
  params: {
    // Append your Api key to url parameters 
    API_KEY: process.env.NEXT_PUBLIC_API_KEY,
    // Append videos and cast to the URL parameters 
    append_to_response: "videos,casts",
    
  },
});

