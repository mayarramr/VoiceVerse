import React, { useState } from 'react'
import Style from './Startup.module.css'
import { useNavigate } from 'react-router-dom'
import logo from "../../Assets/Images/navbarlogo.png"
import { useMediaQuery } from 'react-responsive'


export default function Startup() {
    const isScreenSmall = useMediaQuery({minWidth:0 , maxWidth:768})
    let navigate = useNavigate()
    function navigateToLogin() {
        navigate('/login')
    }
    function navigatetoRegister() {
        navigate('/signup')
    }

    return <>
        <div className={`bgDark`}>
            <div className={`vh-100 ${Style.bgwhite} container-fluid`}>
                <div className="row justify-content-end py-3">
                    <div className="col-md-3 d-flex justify-content-evenly">
                        <button onClick={() => navigatetoRegister()} className={`${Style.btn}`}>Sign Up</button>
                        <button onClick={() => navigateToLogin()} className={`${Style.btn} bgBlue text-white`}>Login</button>

                    </div>

                </div>

                <div className={`flex-column d-flex justify-content-center align-items-center mt-5`}>
                    <div className={`${isScreenSmall ? "w-75" : "w-50"} d-flex align-items-center justify-content-center flex-column`}>

                        <img src={logo} className={`${isScreenSmall ? "w-100" : "w-50"}`} alt="" />
                        <h1 className={`${Style.textBg} display-1 fw-bold`}>Voice Verse</h1>
                    </div>
                    <div className="my-3">
                        <h1 className={`${Style.textBg} text-capitalize text-center `}>we bring your characters in life with any language</h1>

                    </div>
                    <div>
                        <button className={`${Style.btn}`} style={{ fontSize: '20px' }} onClick={() => navigatetoRegister()}>Explore</button>

                    </div>

                </div>
            </div>
        </div>

    </>
}