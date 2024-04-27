import React, { useContext, useEffect, useRef, useState } from 'react'
import Style from './EditProfile.module.css'
import { FaCamera } from "react-icons/fa";
import { userContext } from '../../Context/UserContext'
import { Bars } from 'react-loader-spinner';
import { useFormik } from 'formik';
import axios from 'axios';


export default function EditProfile() {
    let { handleImageUpload, handleImageChange, userName, Msg, getUserData, newImage, headers, bearerToken} = useContext(userContext)
    const [inputHandled, setInputHandled] = useState(false);
    const [usernameHandled, setusernameHandled] = useState(false)
    const [loading, setloading] = useState(false)
    const inputRef = useRef()

    const handleInput = async (event) => {
        await handleImageChange(event);
        setInputHandled(true);
    };
    const fetchUserData = async () => {
        await getUserData();
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleUpload = async () => {
        setloading(true)
        await handleImageUpload();
        await fetchUserData();
        setloading(false)
        setInputHandled(false)
    };

    async function changeUsername(values) {
        setusernameHandled(true)
        try {
            let { data } = await axios.patch(`https://voice-verse-livid.vercel.app/auth/username/edit`, values,
                {
                    headers: {
                        "token": `${bearerToken}${headers.token}`
                    }
                })
            console.log(data);
            fetchUserData()
            setusernameHandled(false)
        } catch (error) {
            console.log(error);
        }
    }
    let changeUsernameFormik = useFormik({
        initialValues: {
            userName: '',
        },
        onSubmit: changeUsername
    })

    

    return <>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bgDark">
                    <div className="modal-header border-0">
                        <h1 className="modal-title fs-3 text-white" id="exampleModalLabel">Edit Profile</h1>
                        <button type="button" className="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row justify-content-evenly">
                            <div className="col-md-4">
                                <h5 className="text-white">Profile Photo</h5>
                            </div>
                            <div className="col-md-6 p-0 d-flex flex-column align-items-center">
                                <div className="d-flex position-relative flex-column">
                                    <img src={newImage} className="rounded-pill" style={{ width: '80px', height: '80px' }} />

                                    <div className={`${Style.profile}`}>
                                        <button onClick={() => inputRef.current.click()} className="position-absolute start-50 bg-white border-1 border bottom-0 btn p-1 textBlue rounded-5 d-flex align-items-center justify-content-center" style={{ width: "35px", height: "35px" }}>
                                            <FaCamera className="textBlue fs-5" />
                                        </button>
                                    </div>
                                </div>
                                <input ref={inputRef} onChange={handleInput} type="file" style={{ display: 'none' }} />
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
                                    <button onClick={handleUpload} disabled={!inputHandled} className="btn bgBlue text-white my-3">Set New Photo</button>

                                }
                                <p className="text-white">{Msg}</p>
                            </div>
                        </div>

                        <div className="row justify-content-evenly my-4">
                            <div className="col-md-4">
                                <h5 className="text-white">Username</h5>
                            </div>
                            <div className="col-md-6 p-0">
                                <form action="" onSubmit={changeUsernameFormik.handleSubmit} className="d-flex flex-column align-items-center">
                                    <input type="text" id="userName" name="userName" className="w-100 form-control rounded-3 bgDark text-white" placeholder={userName} value={changeUsernameFormik.values.username} onChange={changeUsernameFormik.handleChange} />
                                    {usernameHandled ?
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
                                        <button type="submit" disabled={!(changeUsernameFormik.dirty)} className="btn bgBlue text-white my-3">Save Username</button>
                                    }
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
