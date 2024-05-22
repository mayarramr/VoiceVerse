import React, { useState } from 'react'
import Style from './ForgetPassword.module.css'
import axios from 'axios'
import { Formik, useFormik } from 'formik';
import * as Yup from "yup";
import { Link, useNavigate } from 'react-router-dom';
import email from '../../Assets/Images/Email campaign-amico.png'
import { ImSpinner6 } from 'react-icons/im';
import { ColorRing } from 'react-loader-spinner';
import { useMediaQuery } from 'react-responsive';

export default function ForgetPassword() {
    const isScreenSmall = useMediaQuery({minWidth:0 , maxWidth:768})
    const navigate = useNavigate()
    const [error, seterror] = useState(null)
    const [loading, setloading] = useState(null)

    async function sendEmail(values) {
        setloading(true)
        try {
            let { data } = await axios.patch("http://ec2-51-20-141-173.eu-north-1.compute.amazonaws.com/auth/forgetCode/send", values)
            console.log(data);
            setloading(false)
            navigate('/reset-code')


        } catch (error) {
            setloading(false)
            console.log(error);
            seterror(error.response.data.message)
        }

    }

    let forgetPasswordValidationSchema = Yup.object({
        email: Yup.string().email('Email is invalid').required('Email is required')
    })


    let forgetPasswordFormik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: forgetPasswordValidationSchema,
        onSubmit: sendEmail,
    });


    return <>
        <div className="bgDark vh-100 pt-5">
            <div className="container d-flex flex-column justify-content-center align-items-center">
                <div className="w-75 d-flex justify-content-center">
                    <img src={email} className={`${isScreenSmall ? "w-50" : "w-25"} my-4`} alt="" />
                </div>
                <div className={`${isScreenSmall ? "w-100 py-5 px-2" : "w-50 px-5"} row bgLightDark rounded-5`}>
                    <div className="textBlue text-center">
                        <h1 className="textBlue fw-bold text-center">Forget Password ?</h1>
                        <h5 className="my-3">Please enter the email address linked to your account</h5>
                        {error ? <div className="alert alert-danger text-capitalize fs-5 py-2">{error}</div> : null}
                    </div>
                    <form action="" onSubmit={forgetPasswordFormik.handleSubmit}>
                        <input type="email" placeholder="Enter Your Email" name="email" id="email" className={`${Style.input} w-100`} onChange={forgetPasswordFormik.handleChange} onBlur={forgetPasswordFormik.handleBlur} />
                        {forgetPasswordFormik.errors.email && forgetPasswordFormik.touched.email ? <div className="alert alert-danger p-2 mt-1">{forgetPasswordFormik.errors.email}</div> : ''}

                        <div className="d-flex justify-content-between my-4">
                            <Link to={'/login'} className="fs-5 btn text-white  rounded-5 border border-white">Back to Login</Link>
                            <button type="submit" className="bgBlue btn border-0 text-white rounded-5 fs-5" disabled={!(forgetPasswordFormik.isValid && forgetPasswordFormik.dirty)}>
                                {loading ? <><ColorRing
                                    visible={true}
                                    height="35"
                                    width="40"
                                    ariaLabel="color-ring-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="color-ring-wrapper"
                                    colors={['#ffffff', '##5756D5', '#ffffff', '#DCDCF6', '#ffffff']}
                                /></> : 'Send Email'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </>
}
