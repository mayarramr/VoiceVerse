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

export default function Profile() {
  let { email, userName, newImage, deleteAccount, getUserVideos } = useContext(userContext)
  const navigate = useNavigate()
  const location = useLocation()
  const [activeView, setActiveView] = useState('favorites') // New state variable

  const handleViewChange = (view) => (event) => {
    event.preventDefault() // Prevent default link behavior
    setActiveView(view)
  }

  const deleteUserAccount = async () => {
    await deleteAccount()
    navigate('/signup')
    window.location.reload();
  }



  return <>
    <div className="bgDark vh-100 pt-5">
      <div className="mt-5 ">
        <div className="row justify-content-center ">
          <div className="col-md-4 d-flex justify-content-evenly align-items-center ">
            <div className="position-relative">
              <img src={newImage} className="rounded-pill  borderBlue border-4" style={{ width: '170px', height: '170px' }} />
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
        <div className="border-bottom w-75 mx-auto my-4 text-white">
          <div className="d-flex justify-content-between w-75 mx-auto">
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
            <button className={` btn text-decoration-none text-white`} onClick={handleViewChange('avatar-results')}>
              <h2 className={`${activeView === 'avatar-results' ? 'textBlue' : 'text-white'}`}><PiWaveformBold /></h2>
            </button>
          </div>
        </div>
        <div>
          {activeView === 'favorites' && <Favorites />}
          {activeView === 'uservideos' && <UserVideos />}
          {activeView === 'dubbing-results' && <DubbingResults />}
          {activeView === 'clonning-results' && <ClonningResult />}
          {activeView === 'avatar-results' && <DubbingResults />}
        </div>
      </div>
    </div>
  </>
}
