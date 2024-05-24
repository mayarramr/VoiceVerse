import React, { useContext, useEffect, useRef, useState } from 'react'
import Style from './Profile.module.css'
import { userContext } from '../../Context/UserContext'
import EditProfile from './EditProfile/EditProfile'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Favorites from './Favorites/Favorites'
import UserVideos from './UserVideos/UserVideos'
import DubbingResults from '../Dubbing/DubbingResults/DubbingResults'
import { MdDashboard } from "react-icons/md";
import { FaHeart } from 'react-icons/fa'
import { HiTranslate } from 'react-icons/hi'
import { TbWaveSine } from 'react-icons/tb'
import { PiWaveformBold } from 'react-icons/pi'
import ClonningResult from '../Clonning/ClonningResult/ClonningResult'
import { useMediaQuery } from 'react-responsive'

export default function Profile() {
  const isScreenSmall = useMediaQuery({ minWidth: 0, maxWidth: 768 })
  let { email, userName, newImage, deleteAccount } = useContext(userContext)
  const navigate = useNavigate()
  const [activeView, setActiveView] = useState('favorites') // New state variable

  const handleViewChange = (view) => (event) => {
    event.preventDefault() 
    setActiveView(view)
  }

  const deleteUserAccount = async () => {
    await deleteAccount()
    navigate('/signup')
    window.location.reload();
  }



  return <>
    <div className="bgDark pt-5">
      <div className="mt-5 ">
        <div className="row justify-content-center ">
          <div className={`${isScreenSmall ? "justify-content-between" : "justify-content-evenly"} col-md-4 d-flex  align-items-center `}>
            <div className="position-relative">
              <img src={newImage} className="rounded-pill  borderBlue border-4" style={{ width: isScreenSmall ? "100px" :"170px" , height: isScreenSmall ? "100px" :"170px" }} />
              <div>
              </div>
            </div>
            <div className="text-white">
              <h3>{userName}</h3>
              <p>{email}</p>
              <button type="button" className="btn text-white bgBlue mx-3" data-bs-target="#exampleModalToggle3" data-bs-toggle="modal">
                Edit Profile
              </button>
              <button type="button" className="btn border-danger text-danger" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">
                Delete Account
              </button>
              <div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content bgDark">
                    <div className="modal-header border-0">
                      <h1 className="modal-title fs-5 text-danger fs-3 fw-bold" id="exampleModalToggleLabel2">Delete Account</h1>
                      <button type="button" className="btn-close bg-danger" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body fs-5 text-center">
                      Are you sure you want to delete your account ?
                    </div>
                    <div className="modal-footer border-0">
                      <button onClick={deleteUserAccount} className="btn text-danger border-danger">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <EditProfile />
        </div>
        <div className={`${ isScreenSmall ? "" : "w-75"} border-bottom mx-auto my-4 text-white`}>
          <div className={`${isScreenSmall? "justify-content-evenly" : "mx-auto w-75 justify-content-between"} d-flex  `}>
            <button className={` btn text-decoration-none text-white`} onClick={handleViewChange('favorites')}>
              <h2 className={`${activeView === 'favorites' ? 'textBlue' : 'text-white'}`}><FaHeart /></h2>
            </button>
            <button className={` btn text-decoration-none text-white`} onClick={handleViewChange('uservideos')}>
              <h2 className={`${activeView === 'uservideos' ? 'textBlue' : 'text-white'} fs-1`}><MdDashboard /></h2>
            </button>
            <button className={` btn text-decoration-none text-white`} onClick={handleViewChange('dubbing-results')}>
              <h2 className={`${activeView === 'dubbing-results' ? 'textBlue' : 'text-white'}`}><HiTranslate /></h2>
            </button>
            <button className={` btn text-decoration-none text-white`} onClick={handleViewChange('clonning-results')}>
              <h2 className={`${activeView === 'clonning-results' ? 'textBlue' : 'text-white'}`}><TbWaveSine /></h2>
            </button>
          </div>
        </div>
        <div className="bgDark py-2 vh-100">
          {activeView === 'favorites' && <Favorites />}
          {activeView === 'uservideos' && <UserVideos />}
          {activeView === 'dubbing-results' && <DubbingResults />}
          {activeView === 'clonning-results' && <ClonningResult />}
        </div>
      </div>
    </div>
  </>
}
