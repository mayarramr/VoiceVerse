import axios from "axios";
import { createContext, useState } from "react";

const headers = {
  token: localStorage.getItem("userToken"),
};
const bearerToken = process.env.REACT_APP_bearerToken;


export let userContext = createContext()
export default function UserContextProvider(props) {
  const [userToken, setuserToken] = useState('')
  const [verifyCode, setverifyCode] = useState('')
  const [image, setImage] = useState(null)
  const [video, setVideo] = useState(null)
  const [title, settitle] = useState(null)
  const [description, setdescription] = useState(null)
  const [userName, setuserName] = useState('')
  const [email, setEmail] = useState('')
  const [newImage, setnewImage] = useState(null)
  const [videoAddedMessage, setvideoAddedMessage] = useState(null)

  // const logout = async () => {
  //     try {
  //         const {data} = await axios.get("https://voice-verse-livid.vercel.app/auth/logout", {
  //             headers: {
  //                 "token": `@V*ice_Verse ${localStorage.getItem("userToken")}`
  //             }
  //         });
  //         console.log(data);
  //         // localStorage.clear();
  //         // window.location.reload();
  //     } catch (error) {
  //         console.log(error);
  //     }
  // }


  const addNewVideo = async () =>{
    const formData = new FormData();
    formData.append('video', video);
    formData.append('title', title);
    formData.append('description', description);
    try {
      const {data} = await axios.post(`http://ec2-51-20-141-173.eu-north-1.compute.amazonaws.com/video/new` , formData , {
        headers: {
          "token": `${bearerToken}${localStorage.getItem("userToken")}`
        }
      })
      setvideoAddedMessage(data.message)
      // console.log(data);
    } catch (error) {
      console.log(error); 
    }

  }

  const handleVideoChange = (e) => {
    const video = e.target.files[0]
    setVideo(video)
  }

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append('image', image);
    try {
      const { data } = await axios.post('http://ec2-51-20-141-173.eu-north-1.compute.amazonaws.com/auth/profile/picture', formData, {
        headers: {
          "token": `${bearerToken}${localStorage.getItem("userToken")}`
        }
      });
      // console.log(data);
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
      let { data } = await axios.get(`http://ec2-51-20-141-173.eu-north-1.compute.amazonaws.com/auth/profile`,
        {
          headers: {
            "token": `${bearerToken}${localStorage.getItem("userToken")}`
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
      let {data} = await axios.delete(`http://ec2-51-20-141-173.eu-north-1.compute.amazonaws.com/auth/account/delete` , 
      {
        headers:{
          "token" :  `${bearerToken}${localStorage.getItem("userToken")}`
        }
      }
      )
      // console.log(data);
    } catch (error) {
      
    }
  }

 
  return <>
    <userContext.Provider value={{deleteAccount , handleImageChange, headers, bearerToken, email, userName, newImage, getUserData, handleImageUpload, userToken, setuserToken, verifyCode, setverifyCode , addNewVideo , handleVideoChange , videoAddedMessage , settitle , setdescription , description , title , video }}>
      {props.children}
    </userContext.Provider>
  </>
}