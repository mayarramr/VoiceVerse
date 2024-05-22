import React, { useContext, useEffect } from 'react'
import Style from './UserVideos.module.css'
import { userContext } from '../../../Context/UserContext'
import { useQuery } from 'react-query'
import axios from 'axios'

export default function UserVideos() {
    let { bearerToken } = useContext(userContext)
    const {data} = useQuery("getUserVideos" , getUserVideos)
    async function getUserVideos() {
      return await axios.get(`http://ec2-51-20-141-173.eu-north-1.compute.amazonaws.com/video/user`, {
        headers: { token: `${bearerToken}${localStorage.getItem("userToken")}` }
      });
  
    }
    useEffect(() => {
      getUserVideos()
    }, [])
    
    return <>
        <div className="bgDark d-flex justify-content-center">
            <div className="row my-4 w-75 gy-3">
                {data?.data.results?.map((video) =>
                    <div key={video._id} className="col-md-3" style={{ height: "400px" }}>
                        <div className="bg-black borderBlue h-100 rounded-3 position-relative overflow-hidden">
                            <video controls src={video.video.url} className="w-100 h-100"></video>
                        </div>
                    </div>
                )}

            </div>
        </div>
    </>
}
