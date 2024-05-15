import React, { useContext, useEffect, useState } from 'react'
import Style from './ResetCode.module.css'
import reset from '../../Assets/Images/Enter OTP-amico.png'
import axios from 'axios'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { userContext } from '../../Context/UserContext'
import { ColorRing } from 'react-loader-spinner'
import { useMediaQuery } from 'react-responsive'

export default function ResetCode() {
    const isScreenSmall = useMediaQuery({ minWidth: 0, maxWidth: 768 })
    const navigate = useNavigate()
    const [error, seterror] = useState(null)
    const [loading, setLoading] = useState(false)
    let { verifyCode, setverifyCode } = useContext(userContext)


    async function resetCode(values) {
        try {
            setLoading(true)
            const { data } = await axios.post(`https://voice-verse-livid.vercel.app/auth/forgetCode/set`, values)
            console.log(data);
            setverifyCode(data.results)
            navigate('/change-password')
            setLoading(true)
        } catch (error) {
            console.log(error);
        }
    }




    const resetPasswordValidationSchema = Yup.object({
        forgetCode: Yup.string().max(5, "Invalid code").min(5, "Invalid code").required('Verification code is required')
    });


    const resetCodeFormik = useFormik({
        initialValues: {
            forgetCode: ''
        },
        onSubmit: resetCode,
        validationSchema: resetPasswordValidationSchema
    })

    return <>
        <div className="bgDark vh-100 pt-5">
            <div className="container d-flex flex-column justify-content-center align-items-center">
                <div className="w-50 d-flex justify-content-center">
                    <img src={reset} className={`${isScreenSmall ? "w-50" : "w-25"} my-4`} alt="" />
                </div>
                <div className={`${isScreenSmall ? "w-100 px-3 py-5" : "p-5 w-50"} row bgLightDark rounded-5`}>
                    <div className="textBlue text-center">
                        <h1 className="textBlue fw-bold text-center">Reset Password</h1>
                        <h5 className="my-3">Enter verification code we just sent to your email.</h5>
                        {error ? <div className="alert alert-danger text-capitalize fs-5 py-2">{error}</div> : null}
                    </div>
                    <form action="" onSubmit={resetCodeFormik.handleSubmit}>
                        <input name="forgetCode" placeholder="Enter Code" className={`${Style.input} w-100`} onChange={resetCodeFormik.handleChange} onBlur={resetCodeFormik.handleBlur} />
                        {resetCodeFormik.errors.forgetCode && resetCodeFormik.touched.forgetCode ? <div className="alert alert-danger p-2 mt-1">{resetCodeFormik.errors.forgetCode}</div> : ''}

                        <div className="d-flex justify-content-between my-4">
                            <Link to={'/forget-password'} className="fs-5 btn text-white  rounded-5 border border-white">Edit Email</Link>
                            <button disabled={!(resetCodeFormik.isValid && resetCodeFormik.dirty)} type="Submit" className="btn rounded-5 bgBlue text-white fs-5 border-0" >
                                {loading ? <><ColorRing
                                    visible={true}
                                    height="35"
                                    width="40"
                                    ariaLabel="color-ring-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="color-ring-wrapper"
                                    colors={['#ffffff', '##5756D5', '#ffffff', '#5756D5', '#ffffff']}
                                /></> : 'Continue'}
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
}
