import React, { useContext, useEffect, useRef, useState } from 'react';
import Style from './ClonningResult.module.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import { userContext } from '../../../Context/UserContext';
import { FaPause, FaPlay } from "react-icons/fa";
import { useMediaQuery } from 'react-responsive';

export default function ClonningResults() {
    let { bearerToken } = useContext(userContext);

    const isScreenSmall = useMediaQuery({ minWidth: 0, maxWidth: 768 })
    const { data } = useQuery("getUserVideos", getUserVideos);

    async function getUserVideos() {
        return await axios.get(`http://ec2-51-20-141-173.eu-north-1.compute.amazonaws.com/video/soundCloning/data`, {
            headers: { token: `${bearerToken}${localStorage.getItem("userToken")}` }
        });
    }

    useEffect(() => {
        getUserVideos();
    }, []);

    const audioRefs = useRef([]);
    const [isPlaying, setIsPlaying] = useState([]);
    const [progress, setProgress] = useState([]);

    const togglePlayPause = (index) => {
        const updatedIsPlaying = [...isPlaying];

        if (updatedIsPlaying[index]) {
            audioRefs.current[index].pause();
        } else {
            audioRefs.current.forEach((audio, idx) => {
                if (audio && idx !== index) {
                    audio.pause();
                    updatedIsPlaying[idx] = false;
                }
            });
            audioRefs.current[index].play();
        }
        updatedIsPlaying[index] = !updatedIsPlaying[index];
        setIsPlaying(updatedIsPlaying);
    };

    const handleTimeUpdate = (index) => {
        const updatedProgress = [...progress];
        updatedProgress[index] = (audioRefs.current[index].currentTime / audioRefs.current[index].duration) * 100;
        setProgress(updatedProgress);
    };

    return (
       <div className="d-flex justify-content-center bgDark">
         <div className={`${isScreenSmall ? "mx-2 py-3" : "my-5 w-75"} row gy-3`}>
            {data?.data?.clonedAudio?.map((audio, index) => (
                <div key={audio._id} className="col-md-4">
                    <div className={`${Style.audioPlayer}`}>
                        <div className={`${Style.albumArt} d-flex align-items-center justify-content-center`}>
                            <button className={`${Style.playPause}`} onClick={() => togglePlayPause(index)}>
                                {isPlaying[index] ? <FaPause /> : <FaPlay />}
                            </button>
                        </div>
                        <div className="w-100 text-white">
                            <div className="text-capitalize fs-5"><p className="m-0">{audio.title}</p></div>
                            <div className="text-capitalize"><p>{audio.description}</p></div>
                            <div className={`${Style.progressBarContainer}`}>
                                <div
                                    className={`${Style.progressBar}`}
                                    style={{ width: `${progress[index] || 0}%` }}
                                ></div>
                            </div>
                        </div>
                        <audio
                            ref={el => audioRefs.current[index] = el}
                            src={audio.audioUrl}
                            onPlay={() => {
                                const updatedIsPlaying = [...isPlaying];
                                updatedIsPlaying[index] = true;
                                setIsPlaying(updatedIsPlaying);
                            }}
                            onPause={() => {
                                const updatedIsPlaying = [...isPlaying];
                                updatedIsPlaying[index] = false;
                                setIsPlaying(updatedIsPlaying);
                            }}
                            onEnded={() => {
                                const updatedIsPlaying = [...isPlaying];
                                updatedIsPlaying[index] = false;
                                setIsPlaying(updatedIsPlaying);
                            }}
                            onTimeUpdate={() => handleTimeUpdate(index)}
                        ></audio>
                    </div>
                </div>
            ))}
        </div>
       </div>
    );
}
