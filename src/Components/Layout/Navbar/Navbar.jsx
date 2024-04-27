import React, { useContext, useEffect, useState } from 'react'
import Style from './Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../../../Context/UserContext'
import axios from 'axios'
import { FaBars } from "react-icons/fa6";
import { FaHome, FaUser } from "react-icons/fa";
import { PiWaveformBold } from "react-icons/pi";
import { LuLogOut } from "react-icons/lu";

export default function Navbar() {
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setisOpen] = useState(true)
  let { userToken, userName, newImage, getUserData } = useContext(userContext)
  const firstName = userName.split(' ')[0];


  const NavContents = [
    { title: "Home", icon: <FaHome />, to: '/home' },
    { title: "Dubbing", icon: <PiWaveformBold />, to: '/home' },
    { title: "Avatar", icon: <FaUser />, to: '/create-your-song' },

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
    <div className={`bgDark ${isOpen ? "col-md-2" : "col-md-1"} ${Style.openTransition}   position-relative`}>
      <div className={`${isOpen ? "w-100" : "w-50"} ${Style.openTransition}  borderBlueEnd top-0 bottom-0 position-absolute`}>
        <div className={`d-flex position-relative bottom-0 top-0 end-0  start-0  align-items-center justify-content-center `}>
          <div><FaBars className="textBlue fs-3 ms-3 my-4 position-fixed top-0 start-0 pointer" onClick={() => setisOpen(!isOpen)} /></div>
          <h2 className={`${!isOpen ? Style.ClosingScale : Style.OpenningScale} w-50 textBlue my-3`}>VoiceVerse</h2>

        </div>
        <ul className={`w-100 text-white list-unstyled`}>
          {NavContents.map((content, index) => (
            <li key={index} className="me-3 rounded-end-3">
              <Link to={content.to} className="d-flex fs-5 my-3 py-2 text-decoration-none text-white align-items-center">
                <div className="ms-3 me-4  textBlue">{content.icon}</div>
                <span className={`${!isOpen ? Style.ClosingScale : Style.OpenningScale} mt-2`}>{content.title}</span>
              </Link>
            </li>

          ))}
        </ul>
      </div>
      <div className="position-fixed bottom-0">
        <Link to={'/profile'} className="d-flex align-items-center text-decoration-none">
          <img src={newImage} className="rounded-pill mx-2" width={'40px'} alt="" />
          <h5 className={`${!isOpen ? Style.ClosingScale : Style.OpenningScale} text-white m-0 `}>{firstName}</h5>
        </Link>
        <Link onClick={logout} className="d-flex fs-5 my-3 py-2 text-decoration-none text-white align-items-center">
          <LuLogOut className="ms-3 me-4  textBlue" />
          <h5 className={`${!isOpen ? Style.ClosingScale : Style.OpenningScale} m-0 `}>Logout</h5>
        </Link>
      </div>
    </div>
  </>
}
