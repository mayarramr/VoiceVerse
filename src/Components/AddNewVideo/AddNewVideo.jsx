import React, { useContext, useRef, useState } from 'react'
import Style from './AddNewVideo.module.css'
import { userContext } from '../../Context/UserContext'
import { Bars } from 'react-loader-spinner'

export default function AddNewVideo() {
    let { addNewVideo, handleVideoChange, videoAddedMessage, settitle, setdescription, description, title, video } = useContext(userContext)
    const [loading, setloading] = useState(false)
    let inputRef = useRef()
    async function addVideo() {
        setloading(true)
        await addNewVideo()
        setloading(false)
    }

    const handleChooseVideo = () => {
        inputRef.current.click();
    };

    function handleChangeVideo(e) {
        return handleVideoChange(e)
    }

    return <>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className={`${Style.gradientBg} modal-content`}>
                    <div className="modal-header">
                        <h1 className="modal-title fs-4 text-white" id="exampleModalLabel">Add Video</h1>
                        <button type="button" className="btn-close bgBlue" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body my-4 fs-5 text-white">
                        {videoAddedMessage ? <><div className="alert alert-success text-capitalize text-center">{videoAddedMessage}</div></> : ''}
                        <div className="d-flex align-items-center w-50 justify-content-between">
                            <p className="m-0">Video</p>
                            <button className="btn bgBlue text-white" onClick={handleChooseVideo}>Choose Video</button>
                            <input type="file" ref={inputRef} style={{ display: "none" }} onChange={handleChangeVideo} />
                        </div>
                        <div className="d-flex align-items-center justify-content-between my-4">
                            <p className=" m-0">Title</p>
                            <input type="text" name="title" className="form-control w-75 bg-transparent text-white" onChange={(e) => setdescription(e.target.value)} />
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                            <p className=" m-0">Description</p>
                            <input type="text" name="description" className="form-control w-75 bg-transparent text-white" onChange={(e) => settitle(e.target.value)} />
                        </div>
                    </div>
                    <div className="modal-footer">
                        {loading ?
                            <button className="btn bgBlue my-3">
                                <Bars
                                    height="30"
                                    width="30"
                                    color="#ffffff"
                                    ariaLabel="bars-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true}
                                /></button>
                            :
                            <button type="button" className="btn bgBlue text-white" onClick={addVideo} disabled={!video || !title || !description}>Upload Video</button>
                        }
                    </div>
                </div>
            </div>
        </div>

    </>
}
