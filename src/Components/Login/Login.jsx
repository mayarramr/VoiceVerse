import React, { useContext, useState } from 'react'
import Style from './Login.module.css'
import axios from 'axios';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../../Context/UserContext';
import { BsApple } from "react-icons/bs";
import { Bars } from 'react-loader-spinner';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import navlogo from '../../Assets/Images/logo.png'

import { useFormik } from 'formik';

import { useMediaQuery } from 'react-responsive';


export default function Login() {
    const isScreenSmall = useMediaQuery({ minWidth: 0, maxWidth: 768 })
    let { setuserToken, userToken } = useContext(userContext)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [visible, setvisible] = useState(false)
    const navigate = useNavigate();

    async function submitLogin(values) {
        setLoading(true)
        try {
            const { data } = await axios.post('http://ec2-51-20-141-173.eu-north-1.compute.amazonaws.com/auth/login', values)
            console.log(data);
            localStorage.setItem("userToken", data.token)
            setuserToken(data.token)
            setLoading(false)
            navigate('/home')
        } catch (err) {
            setLoading(false)
            // console.log(err);
            setError(err.response.data.message)

        }
    }

    let validateSchema = Yup.object({
        email: Yup.string().email('Email is invalid.').required('Email is required.'),
        password: Yup.string().required('Password is required.'),
    })

    let loginFormik = useFormik({
        initialValues: {
            email: '',
            password: '',
        }, validationSchema: validateSchema,
        onSubmit: submitLogin
    })

    return <>
        {loading ? <>
            <div className="position-fixed bottom-0 top-0 start-0 end-0 bgDark d-flex align-items-center justify-content-center">
                <Bars
                    height="50"
                    width="50"
                    color="#5756d5"
                    ariaLabel="bars-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div>
        </>
            :
            <>
                <div className="row position-fixed top-0 bottom-0 end-0 start-0" >
                    <div className={`${Style.gradientBg} col-md-5  d-flex flex-column justify-content-center align-items-center`}>
                        <img src={navlogo} className="w-75" alt="" />
                    </div>

                    <div className="col-md-7 d-flex align-items-center">
                        <div className="w-75 mx-auto">
                            <h3 className="fw-bold textBlue text-capitalize text-center mb-3">Welcome Back, we miss you !</h3>
                            <div className="d-flex justify-content-center align-items-center">
                                <BsApple className="fs-2 me-3" />
                                <Link>
                                    <img alt="svgImg" className="w-75" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCI+CjxwYXRoIGZpbGw9IiNGRkMxMDciIGQ9Ik00My42MTEsMjAuMDgzSDQyVjIwSDI0djhoMTEuMzAzYy0xLjY0OSw0LjY1Ny02LjA4LDgtMTEuMzAzLDhjLTYuNjI3LDAtMTItNS4zNzMtMTItMTJjMC02LjYyNyw1LjM3My0xMiwxMi0xMmMzLjA1OSwwLDUuODQyLDEuMTU0LDcuOTYxLDMuMDM5bDUuNjU3LTUuNjU3QzM0LjA0Niw2LjA1MywyOS4yNjgsNCwyNCw0QzEyLjk1NSw0LDQsMTIuOTU1LDQsMjRjMCwxMS4wNDUsOC45NTUsMjAsMjAsMjBjMTEuMDQ1LDAsMjAtOC45NTUsMjAtMjBDNDQsMjIuNjU5LDQzLjg2MiwyMS4zNSw0My42MTEsMjAuMDgzeiI+PC9wYXRoPjxwYXRoIGZpbGw9IiNGRjNEMDAiIGQ9Ik02LjMwNiwxNC42OTFsNi41NzEsNC44MTlDMTQuNjU1LDE1LjEwOCwxOC45NjEsMTIsMjQsMTJjMy4wNTksMCw1Ljg0MiwxLjE1NCw3Ljk2MSwzLjAzOWw1LjY1Ny01LjY1N0MzNC4wNDYsNi4wNTMsMjkuMjY4LDQsMjQsNEMxNi4zMTgsNCw5LjY1Niw4LjMzNyw2LjMwNiwxNC42OTF6Ij48L3BhdGg+PHBhdGggZmlsbD0iIzRDQUY1MCIgZD0iTTI0LDQ0YzUuMTY2LDAsOS44Ni0xLjk3NywxMy40MDktNS4xOTJsLTYuMTktNS4yMzhDMjkuMjExLDM1LjA5MSwyNi43MTUsMzYsMjQsMzZjLTUuMjAyLDAtOS42MTktMy4zMTctMTEuMjgzLTcuOTQ2bC02LjUyMiw1LjAyNUM5LjUwNSwzOS41NTYsMTYuMjI3LDQ0LDI0LDQ0eiI+PC9wYXRoPjxwYXRoIGZpbGw9IiMxOTc2RDIiIGQ9Ik00My42MTEsMjAuMDgzSDQyVjIwSDI0djhoMTEuMzAzYy0wLjc5MiwyLjIzNy0yLjIzMSw0LjE2Ni00LjA4Nyw1LjU3MWMwLjAwMS0wLjAwMSwwLjAwMi0wLjAwMSwwLjAwMy0wLjAwMmw2LjE5LDUuMjM4QzM2Ljk3MSwzOS4yMDUsNDQsMzQsNDQsMjRDNDQsMjIuNjU5LDQzLjg2MiwyMS4zNSw0My42MTEsMjAuMDgzeiI+PC9wYXRoPgo8L3N2Zz4=" />
                                </Link>
                            </div>
                            {error ? <div className="alert alert-danger my-3 fs-5 text-capitalize py-2">{error}</div> : null}
                            <form onSubmit={loginFormik.handleSubmit}>
                                <input type="email" name="email" id="email" placeholder="Email" value={loginFormik.values.email} onChange={loginFormik.handleChange} onBlur={loginFormik.handleBlur} className={`${Style.input} w-100 mt-4 fs-5 `} />
                                {loginFormik.errors.email && loginFormik.touched.email ? <div className="alert p-2 mt-2 alert-danger fs-5">{loginFormik.errors.email}</div> : ''}
                                <div className="position-relative mt-4">
                                    <input className={`${Style.input} w-100 fs-5`} placeholder="Password" type={visible ? 'text' : 'password'} name="password" id="password" value={loginFormik.values.password} onChange={loginFormik.handleChange} onBlur={loginFormik.handleBlur} />
                                    {loginFormik.errors.password && loginFormik.touched.password ? <div className="alert p-2 mt-2 alert-danger fs-5">{loginFormik.errors.password}</div> : ''}
                                    <div onClick={() => setvisible(!visible)} className="p-2 position-absolute top-0 end-0 textBlue fs-4">{visible ? <><FaEye /></> : <><FaEyeSlash /></>}</div>
                                </div>
                                <div className="my-3">
                                    <Link className="text-decoration-none textBlue" to={'/forget-password'}>Forget Password ?</Link>
                                </div>
                                <div className="row justify-content-center my-3">
                                    <button type="submit" className="btn bgBlue text-white w-75 rounded-5 ">Login</button>
                                </div>
                            </form>
                            <div className={`${isScreenSmall ? "flex-column" : ""} d-flex align-items-center justify-content-around my-3`}>

                                <div className={`${isScreenSmall ? "flex-column" : ""} d-flex align-items-center`}>
                                    <p className="m-0">Don't have an account yet ?</p>
                                    <Link to={'/signup'}><button className="btn textBlue borderBlue rounded-5 mx-2">Register</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>}

    </>
}
