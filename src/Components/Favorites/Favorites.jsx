import React, { useContext, useEffect, useState } from 'react'
import Style from './Favorites.module.css'
import axios from 'axios'
import { starredContext } from '../../Context/StarredContext'
import { useQuery } from 'react-query'
import { IoHeartDislike } from "react-icons/io5";

export default function Favorites() {
    const [dataDetails, setdataDetails] = useState(null)
    let {getUserStarredVideos ,removeVideoFromStarred , headers , bearerToken} = useContext(starredContext)
    
async function getStarred(){
let {data} = await getUserStarredVideos()
setdataDetails(data)
}

async function removeFromStarred(videoUrl) {
    let { data } = await axios.delete(`https://voice-verse-livid.vercel.app/video/favorites/delete`,
      { url: videoUrl },
     { headers: { token: `${bearerToken}${headers.token}` }}
         )
         console.log(data);
  }
  
  
 

useEffect(() => {
  getStarred()
}, [])

return <>
    <div className="row m-5">
           {dataDetails?.results?.videos.map((video) => 
           <div key={video._id} className="col-md-2 bg-black borderBlue d-flex align-items-center p-0 m-1 rounded-3 overflow-hidden position-relative" style={{"height" : "350px"}}>
           <IoHeartDislike onClick={()=> removeFromStarred(video.url)} className="position-absolute fs-2 text-danger top-0 end-0 m-2 pointer" />
        <video controls src={video.url} className="w-100 h-100"></video>
      </div>
        )}
           
    </div>
    </>
}
