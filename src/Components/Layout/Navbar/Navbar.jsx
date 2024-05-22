import React, { useContext, useEffect, useState } from 'react'
import Style from './Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../../../Context/UserContext'
import { FaBars } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { PiWaveformBold } from "react-icons/pi";
import { LuLogOut } from "react-icons/lu";
import { useMediaQuery } from 'react-responsive'
import { RiVideoUploadFill , RiCloseLine } from "react-icons/ri";
import { HiTranslate } from "react-icons/hi";
import { TbWaveSine } from "react-icons/tb";
import { FaVideo } from "react-icons/fa6";
import AddNewVideo from '../../AddNewVideo/AddNewVideo';
import navlogo from '../../../Assets/Images/navbarlogo.png'

export default function Navbar() {
  const isScreenSmall = useMediaQuery({ minWidth: 0, maxWidth: 768 })
  const navigate = useNavigate()
  const [isOpen, setisOpen] = useState(true)
  let { userName, newImage, getUserData } = useContext(userContext)
  const firstName = userName.split(' ')[0];

  const handleToggle = () => {
    setisOpen(!isOpen);
  };

  const navbarData = [
    { icon: <FaHome />, title: "Home", to: "/home" },
    { icon: <FaVideo />, title: "Reels", to: "/reels" },
    { icon: <HiTranslate />, title: "Dubbing", to: "/dubbing" },
    { icon: <PiWaveformBold />, title: "Avatar", to: "/avatar" },
    { icon: <TbWaveSine />, title: "Clonning", to: "/clonning" },
  ]

  async function fetchUserData() {
    await getUserData()
  }

  useEffect(() => {
    fetchUserData()
  }, [userName])



  function logout() {
    localStorage.clear();
    navigate('/login')
  }




  return <>
    <nav className="navbar fixed-top bgDark pb-0">
      <div className={`${isScreenSmall ? "justify-content-evenly " : "justify-content-between "} container d-flex`}>
        
      <Link>
      <img src={navlogo} style={{width :"140px"}} alt="" />
      </Link>
      <div className="d-flex align-items-center">
        
      <button className={`${isScreenSmall ? "me-2" : "me-4"} btn bgBlue text-white fs-5`} type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"><RiVideoUploadFill /> {isScreenSmall ? "" : "Add New Video"}</button>
        <div className="dropdown">
          <img src={newImage} className={`${isScreenSmall ? "d-none" : "rounded-pill"}`} style={{ width: "40px" , height:"40px" }} alt="" />
          <button className="btn text-white dropdown-toggle fs-5" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            {firstName}
          </button>
          <ul className="dropdown-menu bgDark borderBlue fs-5 text-center dropdown-menu-end dropdown-menu-lg-start">
            <Link to={'/profile'} className="text-decoration-none dropdown-item textBlue">Profile</Link>
            <Link to={'/change-your-password'}  className="text-decoration-none dropdown-item textBlue">Change Password</Link>
            <Link onClick={logout} className="text-decoration-none dropdown-item textBlue">Logout</Link>
          </ul>
        </div>
      </div>
      </div>
    </nav>
    <button className={`${isScreenSmall ? "rounded-3 my-3 mx-2" : "top-0 bottom-0 fs-4 "} btn ${Style.gradientBg} border-end  text-white position-fixed rounded-0 index`} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling" onClick={handleToggle}>{isOpen ? <FaBars className="fs-3 "/> : <RiCloseLine className="fs-4"/>}</button>
    <div>
      <div className={`${isScreenSmall ? "" : "mx-5"} offcanvas offcanvas-start bgDark border-end`} style={{ width: isScreenSmall ? "270px" : "300px" }} data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
        <div className={`${isScreenSmall ? "p-2" : ""} offcanvas-header`}>
          <h5 className={`${isScreenSmall ? "display-3 ms-auto" : "fs-2 mx-2"} offcanvas-title textBlue fw-bold `} id="offcanvasScrollingLabel">Voice Verse</h5>
        </div>
        <div className={`${isScreenSmall ?"" : "mx-2"} offcanvas-body d-flex flex-column justify-content-between`}>
          <div>
            {navbarData.map((item, index) => (
              <Link to={item.to} key={index} className={`${Style.hover} ${isScreenSmall ? "fs-1" : "fs-4"} text-decoration-none d-flex align-items-center text-white my-2 rounded-3 p-2`}>
                <div>{item.icon}</div>
                <p className="m-0 mx-3">{item.title}</p>
              </Link>
            ))}
          </div>
          <div>

            
          </div>

        </div>
      </div>
    </div>
    <AddNewVideo />
  </>
}
