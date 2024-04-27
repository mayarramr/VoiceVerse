import axios from "axios";
import { useFormik } from "formik";
import { createContext, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const headers = {
  token: localStorage.getItem("userToken"),
};
const bearerToken = process.env.REACT_APP_bearerToken;


export let userContext = createContext()
export default function UserContextProvider(props) {
  const [userToken, setuserToken] = useState('')
  const [verifyCode, setverifyCode] = useState('')
  const [image, setImage] = useState(null)
  const [userName, setuserName] = useState('')
  const [email, setEmail] = useState('')
  const [newImage, setnewImage] = useState(null)

  // const logout = async () => {
  //     try {
  //         const {data} = await axios.get("https://voice-verse-livid.vercel.app/auth/logout", {
  //             headers: {
  //                 "token": `@V*ice_Verse ${headers.token}`
  //             }
  //         });
  //         console.log(data);
  //         // localStorage.clear();
  //         // window.location.reload();
  //     } catch (error) {
  //         console.log(error);
  //     }
  // }


  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append('image', image);
    try {
      const { data } = await axios.post('https://voice-verse-livid.vercel.app/auth/profile/picture', formData, {
        headers: {
          "token": `${bearerToken}${headers.token}`
        }
      });
      console.log(data);
    } catch (error) {
      console.error('Error uploading profile image:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  async function getUserData() {
    try {
      let { data } = await axios.get(`https://voice-verse-livid.vercel.app/auth/profile`,
        {
          headers: {
            "token": `${bearerToken}${headers.token}`
          }
        }
      )
      // console.log(data);
      setnewImage(data.result.profileImage.url)
      setuserName(data.result.userName)
      setEmail(data.result.email)
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteAccount() {
    try {
      let {data} = await axios.delete(`https://voice-verse-livid.vercel.app/auth/account/delete` , 
      {
        headers:{
          "token" :  `${bearerToken}${headers.token}`
        }
      }
      )
      console.log(data);
    } catch (error) {
      
    }
  }

  return <>
    <userContext.Provider value={{deleteAccount , handleImageChange, headers, bearerToken, email, userName, newImage, getUserData, handleImageUpload, userToken, setuserToken, verifyCode, setverifyCode }}>
      {props.children}
    </userContext.Provider>
  </>
}