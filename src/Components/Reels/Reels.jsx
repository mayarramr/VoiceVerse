import React, { useContext, useEffect, useRef, useState } from 'react'
import Style from './Reels.module.css'
import { userContext } from '../../Context/UserContext';
import { useQuery } from 'react-query';
import axios from 'axios';
import { starredContext } from '../../Context/StarredContext';
import { Bars } from 'react-loader-spinner';
import { FaHeart } from "react-icons/fa";
import { useMediaQuery } from 'react-responsive';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

export default function Home() {
  const isScreenSmall = useMediaQuery({ minWidth: 0, maxWidth: 768 })
  let { getUserData } = useContext(userContext)
  let { bearerToken, starredVideos, addToStarred } = useContext(starredContext)
  const { data, isLoading } = useQuery('allVideos', getAllVideos);


   function getAllVideos() {
    return axios.get('http://ec2-51-20-141-173.eu-north-1.compute.amazonaws.com/video/all', {
      headers: { token: `${bearerToken}${localStorage.getItem("userToken")}` }
    });
  }


  async function handleFav(id) {
    await addToStarred(id)
  }
  useEffect(() => {
    getAllVideos()
    getUserData()
  }, [])

  useEffect(() => {
    localStorage.setItem('starredVideos', JSON.stringify(starredVideos));
  }, [starredVideos]);

  return <>
    <div className="bgDark vh-100">
      <div className="container">
        {isLoading ? (
          <div className="position-fixed bottom-0 top-0 start-0 end-0 bgDark d-flex align-items-center justify-content-center">
            <Bars
              height="50"
              width="50"
              color="#5756d5"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        ) : (
          <>
            <div className="row justify-content-center" style={{ height: "100vh" }}>
              <div className="col-md-4 col-12 h-100">
                <div className="d-flex align-items-end pb-4 h-100">
                  <AwesomeSlider style={{ height: "90%" }} className="borderBlue rounded-4 overflow-hidden w-100" bullets={false} organicArrows={true} mobileTouch={true}>
                    {data?.data.results.map((video) => (
                      <div className="my-4 d-flex align-items-end h-100" key={video._id}>
                        <video
                          className="w-100 h-100"
                          controls
                          src={video.video.url}></video>
                        <div className="position-absolute bottom-0 my-5 end-0 w-100 d-flex justify-content-between align-items-center">
                          <div className="d-flex flex-column mx-3">
                            <div className="d-flex align-items-center justify-content-between">
                              <img src={video.user?.profileImage.url} className="rounded-pill" style={{ width: '35px' , height:'35px' }} alt="" />
                              <p className="text-white m-0 mx-2 text-capitalize">{video.user?.userName}</p>
                            </div>
                            <div className="">
                              <p className="text-white text-capitalize m-0">{video.title}</p>
                              <p className="text-white m-0">{video.description}</p>
                            </div>
                          </div>
                          <button className="btn" onClick={() => handleFav(video._id)}>
                            <FaHeart
                              className={`fs-1 pointer ${starredVideos.includes(video._id) ? 'text-danger' : 'text-white'}`}
                            />
                          </button>
                        </div>
                      </div>
                    ))}
                  </AwesomeSlider>
                </div>
              </div>
            </div>

          </>
        )}
      </div>
    </div>
  </>
}
