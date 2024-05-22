import React, { useContext, useState } from 'react'
import Style from './UserPassChange.module.css'
import logo from '../../Assets/Images/logo.png'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { userContext } from '../../Context/UserContext'
import { Bars, ColorRing } from 'react-loader-spinner'
import { Link } from 'react-router-dom'

export default function UserPassChange() {
    const { bearerToken } = useContext(userContext)
    const [OldPass, setOldPass] = useState(false)
    const [Pass, setPass] = useState(false)
    const [ConfirmPass, setConfirmPass] = useState(false)
    const [error, seterror] = useState(null)
    const [msg, setmsg] = useState(null)
    const [loading, setloading] = useState(false)

    async function changeUserPassword(values) {
        setloading(true)
        try {
            let { data } = await axios.patch(`http://ec2-51-20-141-173.eu-north-1.compute.amazonaws.com/auth/changePassword`, values,
                {
                    headers: {
                        "token": `${bearerToken}${localStorage.getItem("userToken")}`
                    }
                }
            )
            setmsg(data.results)
            setloading(false)
        } catch (error) {
            setloading(true)
            seterror(error.response.data.message)
            setloading(false)
        }
    }
    let userPassValidationSchema = Yup.object({
        oldPassword: Yup.string().required('Old password is required'),
        newPassword: Yup.string().matches(/^[A-Z].{7,}$/, 'Password must starts with an uppercase letter and be at least 8 characters long').required('Password is required'),
        cPassword: Yup.string().oneOf([Yup.ref("newPassword")], `Passwords don't match`).required('Confirm password is required')
    })

    let changeUserPassFormik = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            cPassword: ''
        },
        onSubmit: changeUserPassword,
        validationSchema: userPassValidationSchema
    })
    return <>
        <div className=" mt-5 py-5 bgDark ">
            <div className="row justify-content-center pb-5">
                <div className="col-md-5 d-flex flex-column align-items-center">
                    <img src={logo} className="w-50 my-3" alt="" />
                    <div className="d-flex flex-column justify-content-center align-items-center rounded-4 py-4 bgLightDark w-100">
                        <h1 className="textBlue m-0">Change Password</h1>
                        <form action="" className="w-100" onSubmit={changeUserPassFormik.handleSubmit}>
                            <div className="w-100 d-flex flex-column align-items-center">
                                <div className="w-75 d-flex flex-column align-items-center my-4">
                                    {error ? <div className="alert alert-danger py-2 w-100">{error}</div> : null}
                                    {msg ? <div className="alert alert-success py-2 w-100">{msg}</div> : null}

                                    <div className="position-relative w-100 my-">
                                        <input className={`${Style.input} w-100 fs-5`} placeholder="Old Password" type={OldPass ? 'text' : 'password'} name="oldPassword" id="oldPassword" value={changeUserPassFormik.values.oldPassword} onChange={changeUserPassFormik.handleChange} onBlur={changeUserPassFormik.handleBlur} />
                                        {changeUserPassFormik.errors.oldPassword && changeUserPassFormik.touched.oldPassword ? <div className="alert p-2 my-2 alert-danger fs-5">{changeUserPassFormik.errors.oldPassword}</div> : ''}
                                        <div onClick={() => setOldPass(!OldPass)} className="p-2 position-absolute top-0 end-0 textBlue fs-4">{OldPass ? <><FaEye /></> : <><FaEyeSlash /></>}</div>
                                    </div>

                                    <div className="position-relative w-100 my-3">
                                        <input className={`${Style.input} w-100 fs-5`} placeholder="New Password" type={Pass ? 'text' : 'password'} name="newPassword" id="newPassword" value={changeUserPassFormik.values.newPassword} onChange={changeUserPassFormik.handleChange} onBlur={changeUserPassFormik.handleBlur} />
                                        {changeUserPassFormik.errors.newPassword && changeUserPassFormik.touched.newPassword ? <div className="alert p-2 my-2 alert-danger fs-5">{changeUserPassFormik.errors.newPassword}</div> : ''}
                                        <div onClick={() => setPass(!Pass)} className="p-2 position-absolute top-0 end-0 textBlue fs-4">{Pass ? <><FaEye /></> : <><FaEyeSlash /></>}</div>
                                    </div>

                                    <div className="position-relative w-100">
                                        <input className={`${Style.input} w-100 fs-5`} placeholder="Confirm Password" type={ConfirmPass ? 'text' : 'password'} name="cPassword" id="cPassword" value={changeUserPassFormik.values.cPassword} onChange={changeUserPassFormik.handleChange} onBlur={changeUserPassFormik.handleBlur} />
                                        {changeUserPassFormik.errors.cPassword && changeUserPassFormik.touched.cPassword ? <div className="alert p-2 mt-2 alert-danger fs-5">{changeUserPassFormik.errors.cPassword}</div> : ''}
                                        <div onClick={() => setConfirmPass(!ConfirmPass)} className="p-2 position-absolute top-0 end-0 textBlue fs-4">{ConfirmPass ? <><FaEye /></> : <><FaEyeSlash /></>}</div>
                                    </div>

                                    <div className="d-flex justify-content-between w-100 mt-4 text-white ">
                                        <Link to={'/home'} className="btn textBlue borderBlue">Back to home</Link>
                                        {loading ? <>
                                            <button className="btn bgBlue">
                                                <ColorRing
                                                    visible={true}
                                                    height="35"
                                                    width="40"
                                                    ariaLabel="color-ring-loading"
                                                    wrapperStyle={{}}
                                                    wrapperClass="color-ring-wrapper"
                                                    colors={['#ffffff', '##5756D5', '#ffffff', '#ffffff', '#ffffff']}
                                                /></button>
                                        </> : <>
                                            <button className="btn text-white bgBlue" type="submit">Save</button>
                                        </>}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
}
