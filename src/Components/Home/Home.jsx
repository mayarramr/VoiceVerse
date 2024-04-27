import React, { useContext, useEffect, useRef, useState } from 'react'
import Style from './Home.module.css'
import { MdOutlineUpload } from "react-icons/md";
import { userContext } from '../../Context/UserContext';
import { useQuery } from 'react-query';
import axios from 'axios';
import { starredContext } from '../../Context/StarredContext';
import { Bars } from 'react-loader-spinner';
import { FaHeart, FaShare } from "react-icons/fa";
import { toast } from 'react-toastify';

export default function Home() {
  let { getUserData } = useContext(userContext)
  let { headers, bearerToken } = useContext(starredContext)
  const [isOpen, setisOpen] = useState(false)
  const { data, isLoading, error } = useQuery('allVideos', getAllVideos);

  async function getAllVideos() {
    return await axios.get('https://voice-verse-livid.vercel.app/video/all', {
      headers: { token: `${bearerToken}${headers.token}` }
    }); // Return the data from the API response

  }

  async function addToStarred(videoUrl) {
    let { data } = await axios.post(`https://voice-verse-livid.vercel.app/video/favorites/add`,
      { url: videoUrl },
     { headers: { token: `${bearerToken}${headers.token}` }}
         )
         console.log(data);
  }



  const containerRef = useRef(null);
  const handleScroll = () => {
    if (containerRef.current) {
      const scrollPos = containerRef.current.scrollTop;
      const videoHeight = containerRef.current.scrollHeight / data?.data.results.length;
      const currentIndex = Math.floor(scrollPos / videoHeight);
      const middleOfVideo = currentIndex * videoHeight + videoHeight / 3;
      const startOfVideo = currentIndex * videoHeight;
      if (scrollPos < startOfVideo + videoHeight / 2) {
        const scrollToPos = startOfVideo;
        containerRef.current.scrollTo({ top: scrollToPos, behavior: 'smooth' });
      } else if (scrollPos >= middleOfVideo) {
        const scrollToPos = (currentIndex + 1) * videoHeight;
        containerRef.current.scrollTo({ top: scrollToPos, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    getUserData();
    getAllVideos();
  }, []);


  const favnotify = () => toast(<>
    <i className="fa-solid fa-circle-check text-main mt-1 me-1"></i>
    Video Added to Favourites !
</>
)

  return <>
    <div className={`${!isOpen ? "col-md-11" : "col-md-10"}`}>
      <div className="bgDark">
        <div className="container">
          {isLoading ?
            <>
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
            </> :
            <>
              <div className={`${Style.scrollbar} row d-flex justify-content-center`} ref={containerRef} style={{ overflowY: 'scroll', WebkitOverflowScrolling: "touch" }} onScroll={handleScroll}>
                <div className={`col-md-4`}  >
                  {data?.data.results.map((video) => (
                    <div className="my-4 d-flex align-items-end" key={video._id} style={{ height: '55%' }}>
                      <div className="bg-black overflow-hidden rounded-4 d-flex flex-column justify-content-center position-relative" style={{ height: '100%' }}>
                        <video className="w-100 flex-grow-1" controls src={video.url}></video>
                        <div className="position-absolute bottom-0 mb-4 mx-2">
                          <div className="d-flex align-items-center justify-content-between">
                            <img src={video.user?.profileImage.url} className="rounded-pill" style={{ width: '30px' }} alt="" />
                            <p className="text-white m-0 mx-2 text-capitalize">{video.user?.userName}</p>
                          </div>
                          <div className="mx-2">
                            <p className="text-white text-capitalize m-0">{video.title}</p>
                            <p className="text-white">{video.description}</p>
                          </div>
                        </div>
                      </div>

                      <div className="pb-5">
                        <FaHeart className="text-white fs-2 m-2 pointer" onClick={()=>{addToStarred(video.url);favnotify()}} />
                      </div>
                    </div>

                  ))}
                </div>
              </div>

            </>}

        </div>
      </div>
    </div>

  </>
}
