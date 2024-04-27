import React, { useState } from 'react'
import Style from './Startup.module.css'
import { useNavigate } from 'react-router-dom'
import logo from "../../Assets/Images/navbarlogo.png"



export default function Startup() {
    let navigate = useNavigate()
  
    function navigateToLogin() {
      navigate('/login')
    }
    function navigatetoRegister(){
        navigate('/signup')
    }

    return <>
         <div className={`bgDark`}>
         <div className={`vh-100 ${Style.bgwhite} container-fluid`}>
                <div className="row justify-content-end py-3">
                    <div className="col-md-3 d-flex">
                    <button onClick={()=>navigatetoRegister()} className={`${Style.btn} mx-3`}>Sign Up</button>
                    <button onClick={()=>navigateToLogin()} className={`${Style.btn} bgBlue text-white`}>Login</button>
                    
                    </div>
     
                </div>
           
             <div className={`flex-column d-flex justify-content-center align-items-center mt-5`}>
             <div className="w-50 d-flex align-items-center justify-content-center flex-column">
              
                    <img src={logo} className="w-75" alt="" />
                    <h1 className={`${Style.textBg} display-1 fw-bold`}>Voice Verse</h1>
                </div>
                <div className="my-3">
                <h1 className={`${Style.textBg} text-capitalize text-center `}>we bring your characters in life with any language</h1>
                   
                </div>
                    <div>
                    <button className={`${Style.btn}`} style={{fontSize:'20px'}} onClick={()=>navigatetoRegister()}>Explore</button>

                    </div>
                    
             </div>
             </div>
         </div>
            
    </>
}