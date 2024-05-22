import React, { useState } from 'react'
import Style from './SignUp.module.css'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { BsApple } from "react-icons/bs";
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useMediaQuery } from 'react-responsive'
import navlogo from '../../Assets/Images/logo.png'

export default function SignUp() {
    const [error, seterror] = useState('')
    const [activateMsg, setactivateMsg] = useState('')
    const [visiblePass, setvisiblePass] = useState(false)
    const [visibleRepass, setvisibleRepass] = useState(false)
    const isScreenSmall = useMediaQuery({ minWidth: 0, maxWidth: 768 })

    async function submitRegister(values) {
        try {
            const { data } = await axios.post(`http://ec2-51-20-141-173.eu-north-1.compute.amazonaws.com/auth/register`, values);
            console.log(data);
            setactivateMsg(data.message)
        } catch (err) {
            console.log(err.response.data.message);
            seterror(err.response.data.message);
        }
    }
    let validateSchema = Yup.object({
        userName: Yup.string().min(3, 'Username must be more than 3 letters').max(15, 'Username can not be more than 15 letters').required('Username is required'),
        email: Yup.string().email('Email is invalid').required('Email is required'),
        password: Yup.string().matches(/^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Z][A-Za-z\d!@#$%^&*(),.?":{}|<>]{7,}$/, 'Password must starts with an uppercase letter and be at least 8 characters long').required('Password is required'),
        cPassword: Yup.string().oneOf([Yup.ref("password")], `Passwords don't match`).required('You must confirm password')
    })

    let formik = useFormik({
        initialValues: {
            userName: '',
            email: '',
            password: '',
            cPassword: ''
        },
        validationSchema: validateSchema,
        onSubmit: submitRegister
    })
    return <>

        <div className="">
            <div className="row vh-100" >
                <div className={`${Style.gradientBg} col-md-5  d-flex flex-column justify-content-center align-items-center`}>
                    <img src={navlogo} className="w-75" alt="" />
                </div>

                <div className="col-md-7 d-flex align-items-center">
                    <div className="w-75 mx-auto">
                        <h3 className="fw-bold textBlue text-capitalize text-center">Start your journey with us - sign up today!</h3>
                        <div className="d-flex justify-content-center align-items-center">
                            <BsApple className="fs-2 me-3" />
                            <Link>
                                <img alt="svgImg" className="w-75" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCI+CjxwYXRoIGZpbGw9IiNGRkMxMDciIGQ9Ik00My42MTEsMjAuMDgzSDQyVjIwSDI0djhoMTEuMzAzYy0xLjY0OSw0LjY1Ny02LjA4LDgtMTEuMzAzLDhjLTYuNjI3LDAtMTItNS4zNzMtMTItMTJjMC02LjYyNyw1LjM3My0xMiwxMi0xMmMzLjA1OSwwLDUuODQyLDEuMTU0LDcuOTYxLDMuMDM5bDUuNjU3LTUuNjU3QzM0LjA0Niw2LjA1MywyOS4yNjgsNCwyNCw0QzEyLjk1NSw0LDQsMTIuOTU1LDQsMjRjMCwxMS4wNDUsOC45NTUsMjAsMjAsMjBjMTEuMDQ1LDAsMjAtOC45NTUsMjAtMjBDNDQsMjIuNjU5LDQzLjg2MiwyMS4zNSw0My42MTEsMjAuMDgzeiI+PC9wYXRoPjxwYXRoIGZpbGw9IiNGRjNEMDAiIGQ9Ik02LjMwNiwxNC42OTFsNi41NzEsNC44MTlDMTQuNjU1LDE1LjEwOCwxOC45NjEsMTIsMjQsMTJjMy4wNTksMCw1Ljg0MiwxLjE1NCw3Ljk2MSwzLjAzOWw1LjY1Ny01LjY1N0MzNC4wNDYsNi4wNTMsMjkuMjY4LDQsMjQsNEMxNi4zMTgsNCw5LjY1Niw4LjMzNyw2LjMwNiwxNC42OTF6Ij48L3BhdGg+PHBhdGggZmlsbD0iIzRDQUY1MCIgZD0iTTI0LDQ0YzUuMTY2LDAsOS44Ni0xLjk3NywxMy40MDktNS4xOTJsLTYuMTktNS4yMzhDMjkuMjExLDM1LjA5MSwyNi43MTUsMzYsMjQsMzZjLTUuMjAyLDAtOS42MTktMy4zMTctMTEuMjgzLTcuOTQ2bC02LjUyMiw1LjAyNUM5LjUwNSwzOS41NTYsMTYuMjI3LDQ0LDI0LDQ0eiI+PC9wYXRoPjxwYXRoIGZpbGw9IiMxOTc2RDIiIGQ9Ik00My42MTEsMjAuMDgzSDQyVjIwSDI0djhoMTEuMzAzYy0wLjc5MiwyLjIzNy0yLjIzMSw0LjE2Ni00LjA4Nyw1LjU3MWMwLjAwMS0wLjAwMSwwLjAwMi0wLjAwMSwwLjAwMy0wLjAwMmw2LjE5LDUuMjM4QzM2Ljk3MSwzOS4yMDUsNDQsMzQsNDQsMjRDNDQsMjIuNjU5LDQzLjg2MiwyMS4zNSw0My42MTEsMjAuMDgzeiI+PC9wYXRoPgo8L3N2Zz4=" />
                            </Link>
                        </div>
                        {error ? <div className="alert alert-danger" >{error}</div> : null}
                        <form action="" onSubmit={formik.handleSubmit}>

                            <div className={`${isScreenSmall ? "my-3" : "my-5"}`}>
                                {activateMsg ? <div className="alert alert-success text-capitalize ">{activateMsg}</div> : null}
                                <input placeholder="Username" className={`${Style.input} w-100 `} name="userName" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                {formik.errors.userName && formik.touched.userName ? <div className="alert alert-danger mt-1 mb-0 p-2 ">{formik.errors.userName}</div> : ''}



                                <input type="email" placeholder="Email" name="email" id="email" className={`${Style.input} w-100 mt-4  `} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                {formik.errors.email && formik.touched.email ? <div className="alert alert-danger p-2 mt-1 ">{formik.errors.email}</div> : ''}

                                <div className="d-flex mt-4">
                                    <div className="d-flex flex-column w-75 me-3">
                                        <div className="position-relative">
                                            <input type={visiblePass ? "text" : "password"} placeholder="Password" name="password" id="password" className={`${Style.input} w-100 me-5`} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                            {formik.errors.password && formik.touched.password ? (
                                                <div className="alert alert-danger mt-1 p-2 ">{formik.errors.password}</div>
                                            ) : null}
                                            <div
                                                onClick={() => setvisiblePass((prevState) => !prevState)}
                                                className="p-2 position-absolute top-50 translate-middle-y end-0 textBlue fs-4"
                                            >
                                                {visiblePass ? <FaEye /> : <FaEyeSlash />}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex flex-column w-75">
                                        <div className="position-relative">
                                            <input placeholder="Confirm Password" type={visibleRepass ? "text" : "password"} name="cPassword" id="cPassword" className={`${Style.input} w-100 `} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                            {formik.errors.cPassword && formik.touched.cPassword ? (
                                                <div className="alert alert-danger p-2 mt-1">{formik.errors.cPassword}</div>
                                            ) : null}
                                            <div
                                                onClick={() => setvisibleRepass((prevState) => !prevState)} // Updated onClick event handler
                                                className="p-2 position-absolute top-50 translate-middle-y end-0 textBlue fs-4"
                                            >
                                                {visibleRepass ? <FaEye /> : <FaEyeSlash />}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="d-flex justify-content-center">
                                <button type="submit" className="btn bgBlue w-75 text-white rounded-5">Sign Up</button>
                            </div>
                        </form>
                        <div className="d-flex align-items-center justify-content-end my-3">
                            <p className="m-0 pe-3">Already have an account ?</p>
                            <Link className="btn borderBlue rounded-5 textBlue btn-sm" to={'/login'}>Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
}
