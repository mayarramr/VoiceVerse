import React, { useContext, useEffect, useState } from 'react'
import Style from './ChangePassword.module.css'
import change from '../../Assets/Images/Key-rafiki.png'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { FaEyeSlash, FaEye } from "react-icons/fa";
import axios from 'axios'
import * as Yup from 'yup';
import { userContext } from '../../Context/UserContext'
import { toast } from 'react-toastify'
import { useMediaQuery } from 'react-responsive'

export default function ChangePassword() {
    const isScreenSmall = useMediaQuery({ minWidth: 0, maxWidth: 768 })
    const [visible, setvisible] = useState(false)
    const [cVisible, setCVisible] = useState(false)
    const [error, seterror] = useState(null)
    const [msg, setmsg] = useState(null)
    let { verifyCode } = useContext(userContext)
    async function changePassword(values) {
        try {
            const { data } = await axios.patch(
                'https://voice-verse-livid.vercel.app/auth/resetPassword',
                values,
                {
                    forgetCode: { verifyCode }

                }
            );
            console.log(data);
            setmsg(data.message)
        } catch (error) {
            console.log(error);
        }
    }


    let changePasswordValidateSchema = Yup.object({
        password: Yup.string().matches(/^[A-Z].{7,}$/, 'Password must starts with an uppercase letter and be at least 8 characters long').required('Password is required'),
        cPassword: Yup.string().oneOf([Yup.ref("password")], `Passwords don't match`).required('Confirm password is required')
    })


    const changePasswordFormik = useFormik({
        initialValues: {
            forgetCode: '',
            password: '',
            cPassword: ''
        },
        onSubmit: changePassword,
        validationSchema: changePasswordValidateSchema
    })
    useEffect(() => {
        changePasswordFormik.setValues({
            ...changePasswordFormik.values,
            forgetCode: verifyCode
        });
        // console.log(verifyCode);
    }, [verifyCode, changePasswordFormik.setValues]);



    return <>
        <div className="position-fixed bgDark h-100 w-100">
            <div className="container py-5">
                <div className="d-flex justify-content-end">
                    <Link to={'/login'}>
                    <button className="btn bgBlue text-white rounded-4">Login</button>
                    </Link>
                </div>

                <div className="d-flex flex-column justify-content-center align-items-center">
                <div className="w-50 d-flex justify-content-center">
                    <img src={change} className={`${isScreenSmall ? "w-50" : "w-25"} my-4`} alt="" />
                </div>
                <div className={`${isScreenSmall ? "w-100 px-3 py-5" : "p-5 w-50"} row bgLightDark rounded-5`}>
                    <div className="textBlue text-center">
                        <h1 className="textBlue fw-bold text-center">Reset Password</h1>
                        {error ? <div className="alert alert-danger text-capitalize py-2">{error}</div> : null}
                        {msg ? <div className="alert alert-success text-capitalize py-2">{msg}</div> : null}
                    </div>
                    <form action="" onSubmit={changePasswordFormik.handleSubmit}>
                        <div className="position-relative">
                            <input type={visible ? "text" : "password"} placeholder="Password" name="password" id="password" className={`${Style.input} w-100 fs-5`} onChange={changePasswordFormik.handleChange} onBlur={changePasswordFormik.handleBlur} />
                            {changePasswordFormik.errors.password && changePasswordFormik.touched.password ? <div className="alert alert-danger mt-1 p-2">{changePasswordFormik.errors.password}</div> : ''}
                            <div onClick={() => setvisible(!visible)} className="p-2 position-absolute top-50 translate-middle-y end-0">{visible ? <><FaEye className="fs-5 text-white" /></> : <><FaEyeSlash className="fs-5 text-white" /></>}</div>
                        </div>
                        <div className="position-relative my-2">
                            <input type={cVisible ? "text" : "password"} placeholder="cPassword" name="cPassword" id="cPassword" className={`${Style.input} w-100 fs-5`} onChange={changePasswordFormik.handleChange} onBlur={changePasswordFormik.handleBlur} />
                            {changePasswordFormik.errors.cPassword && changePasswordFormik.touched.cPassword ? <div className="alert alert-danger mt-1 p-2">{changePasswordFormik.errors.cPassword}</div> : ''}
                            <div onClick={() => setCVisible(!cVisible)} className="p-2 position-absolute top-50 translate-middle-y end-0">{cVisible ? <><FaEye className="fs-5 text-white" /></> : <><FaEyeSlash className="fs-5 text-white" /></>}</div>
                        </div>
                        <div className="d-flex justify-content-between my-4">
                            <Link to={'/login'} className="fs-5 btn text-white  rounded-5 border border-white">Cancel</Link>
                            <button type="submit" className="btn bgBlue text-white rounded-5 fs-5">Confirm</button>
                        </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
    </>
}
