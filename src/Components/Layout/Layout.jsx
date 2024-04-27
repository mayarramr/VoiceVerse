import React, { useContext, useEffect } from 'react'
import Style from './Layout.module.css'
import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'
import { Outlet } from 'react-router-dom'
import { Offline } from 'react-detect-offline'
import { Toaster } from 'react-hot-toast'
import { MdOutlineWifiOff } from "react-icons/md";
import { userContext } from '../../Context/UserContext'

export default function Layout() {
    let { setuserToken } = useContext(userContext)
    useEffect(() => {
        if (localStorage.getItem('userToken') !== null) {
            setuserToken(localStorage.getItem('userToken'))
        }
    }, [])
    return <>
        <div className="d-flex">
            <Navbar />
            <Outlet></Outlet>
            <Toaster />
        </div>
        <div>
            <Offline>
                <div className="network"><MdOutlineWifiOff /> You're Offline</div>
            </Offline>
        </div>
        <Footer />
    </>
}