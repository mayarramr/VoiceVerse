import React, { useContext, useEffect, useState } from 'react'
import Style from './Favorites.module.css'
import axios from 'axios'
import { starredContext } from '../../../Context/StarredContext'
import { useQuery } from 'react-query'
import { IoHeartDislike } from "react-icons/io5";
import { toast } from 'react-hot-toast'
import { IoIosCheckmarkCircle } from "react-icons/io";

export default function Favorites() {
  const [dataDetails, setdataDetails] = useState(null)
  let {  removeFromStarred, bearerToken , getUserStarredVideos} = useContext(starredContext)


const {data , refetch} = useQuery("getFavoriteVideos" , getFavoriteVideos)
  async function getFavoriteVideos() {
    return await axios.get(`http://ec2-51-20-141-173.eu-north-1.compute.amazonaws.com/video/favorites/`, {
      headers: { token: `${bearerToken}${localStorage.getItem("userToken")}` }
    });

  }

async function removeVideo(id) {
  await removeFromStarred(id);
  await refetch(); 
}

const notify = () => toast(<>
  <div className="d-flex align-items-center fs-5">
  <IoIosCheckmarkCircle className="textBlue mx-2"/>
   Video removed 
  </div>
</>
);


  useEffect(() => {
    getFavoriteVideos()
  }, [])

  return <>
  <div className="bgDark d-flex justify-content-center">
  <div className="row my-5 w-75 gy-3">
      {data?.data.results?.videos.map((video) =>
        <div key={video.id._id} className="col-md-3" style={{height:"400px"}}>
          <div className="bg-black borderBlue h-100 rounded-3 position-relative overflow-hidden">
          <video controls src={video.id.video.url} className="w-100 h-100"></video>
   
          <button className="btn" onClick={() => {removeVideo(video.id._id);notify()}}> <IoHeartDislike className="position-absolute fs-2 text-danger top-0 end-0 m-2 pointer" /></button>
        
          </div>
        </div>
      )}

    </div>
  </div>
  </>
}
