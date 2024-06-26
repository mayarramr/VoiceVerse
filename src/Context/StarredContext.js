import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";
import { IoIosCheckmarkCircle } from "react-icons/io";

const headers = {
  token: localStorage.getItem("userToken"),
};
const bearerToken = process.env.REACT_APP_bearerToken;

export let starredContext = createContext()
export default function StarredContextProvider(props) {
  const [starredVideos, setStarredVideos] = useState(() => {
    const storedVideos = localStorage.getItem('starredVideos');
    return storedVideos ? JSON.parse(storedVideos) : [];
  });


  const favnotify = () => toast(<>
    <div className="d-flex align-items-center fs-5 text-capitalize">
      <IoIosCheckmarkCircle className="textBlue mx-2" />
      Added to favorites
    </div>
  </>
  )
  const Errfavnotify = () => toast(<>
    <div className="d-flex align-items-center fs-5 text-capitalize">
      <IoIosCheckmarkCircle className="textBlue mx-2" />
      Already added to favorites
    </div>
  </>
  )
  const addToStarred = async (id) => {
    try {
      await axios.post(
        `http://ec2-51-20-141-173.eu-north-1.compute.amazonaws.com/video/favorites/add/${id}`,
        {},
        { headers: { token: `${bearerToken}${localStorage.getItem("userToken")}` } }
      );
      setStarredVideos([...starredVideos, id]);
      favnotify();
    } catch (error) {
      Errfavnotify();
    }
  };
  const removeFromStarred = async (id) => {
    let { data } = await axios.delete(`http://ec2-51-20-141-173.eu-north-1.compute.amazonaws.com/video/favorites/delete/${id}`,
      { headers: { token: `${bearerToken}${headers.token}` } }
    )
    const updatedStarredVideos = starredVideos.filter((videoId) => videoId !== id);
    setStarredVideos(updatedStarredVideos);
    localStorage.setItem('starredVideos', JSON.stringify(updatedStarredVideos));
    // console.log(data);
  }


  return <>
    <starredContext.Provider value={{ bearerToken, headers, removeFromStarred , addToStarred , starredVideos}}>
      {props.children}
    </starredContext.Provider>
  </>
}