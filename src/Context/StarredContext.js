import axios from "axios";
import { createContext } from "react";

const headers = {
    token: localStorage.getItem("userToken"),
};
const bearerToken = process.env.REACT_APP_bearerToken;

export let starredContext = createContext()
export default function StarredContextProvider(props) {

    function getUserStarredVideos() {
        return axios.get(`https://voice-verse-livid.vercel.app/video/favorites/`,
            { headers: { "token": `${bearerToken}${headers.token}` } })
            .then((response) => response)
            .catch((err) => err)
    }






    return <>
        <starredContext.Provider value={{ bearerToken, headers, getUserStarredVideos }}>
            {props.children}
        </starredContext.Provider>
    </>
}