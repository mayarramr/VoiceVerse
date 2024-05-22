import React, { useContext, useState, useEffect } from 'react';
import Style from './Clonning.module.css';
import { userContext } from '../../Context/UserContext';
import axios from 'axios';
import { IoIosCreate } from 'react-icons/io';
import { Bars } from 'react-loader-spinner';
import { PiWaveformBold } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { AiFillAudio } from "react-icons/ai";
import { FaRegCheckCircle, FaMicrophoneAltSlash } from "react-icons/fa";
import { HiTranslate } from 'react-icons/hi';

export default function Clonning() {
    const { bearerToken } = useContext(userContext);
    const [title, setTitle] = useState('');
    const [textToSpeech, setTextToSpeech] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const [recordedAudio, setRecordedAudio] = useState(null);
    const [audioURL, setAudioURL] = useState(null);

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        let chunks = [];

        recorder.ondataavailable = event => {
            chunks.push(event.data);
        };

        recorder.onstop = () => {
            const audioBlob = new Blob(chunks, { type: 'audio/wave' });
            const audioFile = new File([audioBlob], 'recorded_audio.wav', {
                type: 'audio/wave',
            });
            setRecordedAudio(audioFile);
            setAudioChunks(chunks);
            setAudioURL(URL.createObjectURL(audioBlob));
        };

        recorder.start();
        setMediaRecorder(recorder);
        setIsRecording(true);
    };

    const stopRecording = async () => {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
            setIsRecording(false);
        }
    };

    const clonning = async () => {
        const formData = new FormData();
        formData.append("audio_file", recordedAudio);
        formData.append("title", title);
        formData.append("textToSpeech", textToSpeech);
        setIsLoading(true);

        try {
            let { data } = await axios.post(`http://ec2-51-20-141-173.eu-north-1.compute.amazonaws.com/video/soundCloning`, formData, {
                headers: { "token": `${bearerToken}${localStorage.getItem("userToken")}` }
            });
            setIsLoading(false);
            setSuccessMsg("Audio cloned successfully");
        } catch (error) {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (recordedAudio) {
            console.log(recordedAudio);
        }
    }, [recordedAudio]);

    return (
        <div className="bgDark py-5">
            <div className="container pt-5">
                <div className="row text-white">
                    <h1 className="display-4">Clonning</h1>
                    <h4>Record an audio, write any text you want, and witness the magic!</h4>
                </div>
                <div className="row justify-content-center">
                    <div className={`${Style.gradientBg} col-md-7 rounded-4 py-4 my-5`}>
                        <div className="d-flex flex-column align-items-center justify-content-center">
                            <IoIosCreate className="display-3 my-4 border p-2 rounded-3 text-white" />
                            <h3 className="text-white">Create your first clone project</h3>
                            {successMsg ? <div className="alert alert-success fs-5 py-1 d-flex align-items-center justify-content-between">
                                < FaRegCheckCircle />
                                <p className="m-0 mx-1"> Audio cloned successfully</p>
                                <Link to={'/profile'} className="btn bg-success text-white">View</Link>
                            </div> : null}
                        </div>
                        <div className="row">
                            <div className="col-md-12 w-100 d-flex flex-column align-items-center">
                                <div className="row w-100 justify-content-center">
                                    <div className="col-md-10">
                                        <div className="d-flex align-items-center justify-content-center text-white">
                                            <div className="my-3 d-flex align-items-center w-100">
                                                <div className="d-flex align-items-center w-75 mx-auto justify-content-between">
                                                    <button onClick={startRecording} disabled={isRecording} className="btn bg-white btn-lg text-black d-flex align-items-center">
                                                        <AiFillAudio />
                                                        <p className="m-0">Start recording</p>
                                                    </button>
                                                    <button className="btn btn-lg bg-white text-black d-flex align-items-center" onClick={stopRecording} disabled={!isRecording}>
                                                        <FaMicrophoneAltSlash />
                                                        <p className="m-0">Stop recording</p>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        {audioURL && (
                                            <div className="mb-3">
                                                <audio controls src={audioURL} className="w-100" />
                                            </div>
                                        )}
                                        <div className="mb-3">
                                            <h5 className="text-white">Audio Description</h5>
                                            <input
                                                type="text"
                                                name="description"
                                                className="bg-transparent rounded-3 p-2 w-75 my-1 text-white w-100"
                                                placeholder="Description"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <h5 className="text-white">Text to Speech</h5>
                                            <input
                                                type="text"
                                                name="textToSpeech"
                                                className="bg-transparent rounded-3 p-2 w-75 my-1 text-white w-100"
                                                placeholder="Text"
                                                value={textToSpeech}
                                                onChange={(e) => setTextToSpeech(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end w-75 mx-auto">
                                    {isLoading ? (
                                        <button className="btn bgBlue my-3">
                                            <Bars
                                                height="30"
                                                width="30"
                                                color="#ffffff"
                                                ariaLabel="bars-loading"
                                                wrapperStyle={{}}
                                                wrapperClass=""
                                                visible={true}
                                            />
                                        </button>
                                    ) : (
                                        <button type="submit" className="btn btn-lg text-white bgBlue my-4" onClick={clonning}>
                                            Create
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-3">
                    <h4 className="text-white">You can also try</h4>
                    <div className="d-flex">
                        <Link to="#" className="text-decoration-none">
                            <div className={`${Style.hovering} rounded-3 p-3 text-white`}>
                                <div className="d-flex align-items-center">
                                    <PiWaveformBold className="display-2 mx-1" />
                                    <div>
                                        <p className="fs-4 m-0">Avatar</p>
                                        <p className="m-0">Turn any photo into a talking portrait.</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to="#" className="text-decoration-none">
                            <div className={`${Style.hovering} rounded-3 p-3 text-white mx-4`}>
                                <div className="d-flex align-items-center">
                                    <HiTranslate className="display-2 mx-1" />
                                    <div>
                                        <p className="fs-4 m-0">Dubbing</p>
                                        <p className="m-0">Experience seamless voice transformation.</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
