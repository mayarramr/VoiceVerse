import React, { useState } from 'react'
import Style from './Home.module.css'
import { MdOutlineUpload } from "react-icons/md";
import { IoMaleSharp, IoFemale } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import navlogo from '../../Assets/Images/logo.png'
import { HiTranslate } from 'react-icons/hi';
import { PiWaveformBold } from 'react-icons/pi';
import { TbWaveSine } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
export default function CreateUrSong() {
  const isScreenSmall = useMediaQuery({minWidth:0 , maxWidth:768})

  const icons = [
    { icon: <HiTranslate className="display-1 mb-3" />, title: 'Dubbing' , to :'/dubbing'},
    { icon: <PiWaveformBold  className="display-1 mb-3" />, title: 'Avatar' , to :'/avatar'},
    { icon: <TbWaveSine className="display-1 mb-3" />, title: 'Clonning' , to :'/clonning'}, 
  ];



  return <>

    <div className={`${Style.bgwhite} ${isScreenSmall ? " py-4 " : "overflow-hidden"} bgDark vh-100 `}>
      <div className={` container h-100 py-4 mt-5 d-flex flex-column justify-content-center align-items-center `}>
        <img src={navlogo} className={`${isScreenSmall ? "w-100" : "w-50"} z-3`} alt="" />
        <div className="row justify-content-evenly my-4 w-100">
          {icons.map((item) => (
            <div className={`${Style.blur} ${Style.customLink} ${isScreenSmall ? "my-3" : ""} my-3 col-md-3 col-8 text-center text-white d-flex flex-column align-items-center rounded-4 py-4 border`} key={item.title}>
              <Link to={item.to} className={` text-decoration-none text-white w-100 `}>
              <div>
                {item.icon}
              </div>
              <div className="fs-1">
                {item.title}
              </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>



    
    {/* <div className="bgDark vh-100">
      <div className="container pt-5">
        <div className="row justify-content-center ">
          <div className="col-md-7 text-center">
          <img src={navlogo} className="w-50 my-4" alt="" />
                       
            <div className={`${Style.InputContainer} w-100 position-relative`}>
              <input placeholder="Upload song's link to change voice" id="input" className={`${Style.input}`} name="text" type="text" />
              <MdOutlineUpload className="position-absolute text-white end-0 me-4 fs-5" />

            </div>
          </div>
        </div>
        <div className="mt-5">
          <h2 className="text-white">Choose Voice</h2>
        </div>
        <div className="row my-4">
          {icons.map((item) => (
            <div key={item.title} className="col-md-2 text-center text-white d-flex flex-column align-items-center">
              <div className={`${Style.customBorder} w-100`}>
                <div className={`${Style.borderModule}`}>
                  {item.icon}
                  <h2 className={`fw-light ${item.className || ''}`}>{item.title}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div> */}

  </>
}
