import React, { useContext, useState } from 'react'
import Style from './Dubbing.module.css'
import { IoIosCreate } from "react-icons/io";
import { TbWaveSine } from "react-icons/tb";
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';
import { userContext } from '../../Context/UserContext';
import { useFormik } from 'formik';
import { Bars } from 'react-loader-spinner'
import DubbingResults from './DubbingResults/DubbingResults';
import { PiWaveformBold } from 'react-icons/pi';
import { FaRegCheckCircle } from "react-icons/fa";
import { useMediaQuery } from 'react-responsive';

export default function Dubbing() {
    const { bearerToken } = useContext(userContext)
    const isScreenSmall = useMediaQuery({ minWidth: 0, maxWidth: 768 })
    const [isLoading, setisLoading] = useState(false)
    const [successMsg, setsuccessMsg] = useState(null)

    const dubbing = async (values) => {
        setisLoading(true)
        try {
            let { data } = await axios.post(`http://ec2-51-20-141-173.eu-north-1.compute.amazonaws.com/video/dubbing`, values,
                { headers: { "token": `${bearerToken}${localStorage.getItem("userToken")}` } }
            )
            console.log(data);
            setisLoading(false)
            setsuccessMsg("Audio dubbed successfully")
        } catch (error) {
            setisLoading(true)
            console.log(error);
            setisLoading(false)
        }
    }
    const validateSchema = Yup.object({
        description: Yup.string().required('Description is required.'),
        title: Yup.string().required('Title is required'),
        original_video: Yup.string().required('Video Url is required.'),
    })
    const dubbingFormik = useFormik({
        initialValues: {
            description: '',
            title: '',
            original_video: ''
        },
        onSubmit: dubbing,
        validationSchema: validateSchema
    })
    return <>
        <div className="bgDark py-5">
            <div className="container pt-5">
                <div className="row text-white">
                    <h1 className="display-4">Dubbing</h1>
                    <h4>Simply upload a link, and receive an audio file that seamlessly dubs the original speech into fluent Arabic</h4>
                </div>
                <div className="row justify-content-center mx-1">
                    <div className={`${Style.gradientBg} col-md-7 rounded-4 py-4 my-5`}>
                        <div className="d-flex flex-column align-items-center justify-content-center">
                            <IoIosCreate className="display-3 my-4 border p-2 rounded-3 text-white" />
                            <h3 className="text-white">Create your first project</h3>
                            {successMsg ? <div className="alert alert-success fs-5 py-1 d-flex align-items-center justify-content-between">
                                < FaRegCheckCircle />
                                <p className="m-0 mx-1"> Audio dubbed successfully</p>
                                <Link to={'/profile'} className="btn bg-success text-white">View</Link>
                            </div> : null}

                        </div>
                        <form action="" onSubmit={dubbingFormik.handleSubmit} className="">
                            <div className="row">
                                <div className="col-md-12 w-100 d-flex flex-column align-items-center">
                                    <div className={`${isScreenSmall ? "w-100":"w-75"} d-flex justify-content-center flex-column align-items-center text-white`}>
                                        <label htmlFor="" className="w-100 fs-5">Video Description</label>
                                        <input type="text" name="description" className="bg-transparent rounded-3 p-2 my-1 text-white w-100" placeholder="Description" value={dubbingFormik.values.description} onChange={dubbingFormik.handleChange} onBlur={dubbingFormik.handleBlur} />
                                        {dubbingFormik.errors.description && dubbingFormik.touched.description ? <div className="alert alert-danger w-100 py-2">{dubbingFormik.errors.description}</div> : null}
                                    </div>
                                    <div className={`${isScreenSmall ? "w-100 my-3":"w-75"} d-flex justify-content-center flex-column align-items-center text-white`}>
                                        <label htmlFor="" className="w-100 fs-5">Video Title</label>
                                        <input type="text" name="title" className="bg-transparent rounded-3 p-2 w-100 my-1 text-white" placeholder="Title" value={dubbingFormik.values.title} onChange={dubbingFormik.handleChange} onBlur={dubbingFormik.handleBlur} />
                                        {dubbingFormik.errors.title && dubbingFormik.touched.title ? <div className="alert alert-danger w-100 py-2">{dubbingFormik.errors.title}</div> : null}
                                    </div>

                                    <div className={`${isScreenSmall ? "w-100":"w-75"} d-flex justify-content-center flex-column align-items-center text-white`}>
                                        <label htmlFor="" className="w-100 fs-5">Video Url</label>
                                        <input type="text" name="original_video" className="bg-transparent rounded-3 p-2 w-100 text-white" placeholder="Video Url" value={dubbingFormik.values.original_video} onChange={dubbingFormik.handleChange} onBlur={dubbingFormik.handleBlur} />
                                        {dubbingFormik.errors.original_video && dubbingFormik.touched.original_video ? <div className="alert alert-danger w-100 py-2 my-1">{dubbingFormik.errors.original_video}</div> : null}
                                    </div>
                                    <div className="d-flex justify-content-end w-75 mx-auto">
                                        {isLoading ? <>
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
                                        </> : <>
                                            <button type="submit" className="btn btn-lg text-white bgBlue my-4" disabled={!dubbingFormik.isValid || !dubbingFormik.dirty} >Create</button>
                                        </>}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="my-3">
                    <h4 className="text-white">You can also try</h4>
                    <div className={`${isScreenSmall ? "flex-column" : ""} d-flex`}>
                        <Link className="text-decoration-none">
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

                        <Link className="text-decoration-none">
                            <div className={`${Style.hovering} rounded-3 p-3 text-white ${isScreenSmall ? "my-4" : "mx-4"}`}>
                                <div className="d-flex align-items-center">
                                    <TbWaveSine className="display-2 mx-1" />
                                    <div>
                                        <p className="fs-4 m-0">Clonning</p>
                                        <p className="m-0">Experince seamless voice transformation.</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </>
}
