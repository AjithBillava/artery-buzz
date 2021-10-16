import axios from "axios"
import { toast } from "react-toastify"
import { TokenConfig } from "./userSlice"

const backendUrl = process.env.REACT_APP_BACKEND_URL

export const getCurrentUserService = async() =>{
    const {data} = await axios.get(`${backendUrl}/user`,TokenConfig())
    
    return data
}

export const loginUserService = async({email,password})=>{
    
    const {data} = await axios.post(`${backendUrl}/user/login`,{email,password})
   
    return data
}

export const registerUserService = async({email,password,firstname,lastname,username,}) =>{
    try {
        const {data} = await axios.post(`${backendUrl}/user/register`,{email,password,firstname,lastname,username,})
   
        return data
    } catch (error) {
        toast.error(error.response.data.message, {
            style: { backgroundColor: "##15b996", letterSpacing: "0.8px" },
            autoClose: 2000,
            hideProgressBar: true,
        });
    }
}

export const editUserDataService = async({userId,...rest}) =>{
    
    await axios.post(`${backendUrl}/user/${userId}/updateUser`,{...rest},TokenConfig())
    const {data} = await axios.get(`${backendUrl}/user`,TokenConfig())
    return data
}

export const getAllUsersService = async(userId) =>{
    const {data} = await axios.get(`${backendUrl}/user/${userId}`,TokenConfig())
    return data
}
export const getUserNotificationService = async({userId}) =>{
    const {data} = await axios.get(`${backendUrl}/user/${userId}/notifications`,TokenConfig())
    return data
}
export const readUserNotificationService = async({userId,notificationId}) =>{
    const {data} = await axios.post(`${backendUrl}/user/${userId}/notifications`,{notificationId},TokenConfig())
    return data
}
export const unFollowUserService = async({userId,unfollowedUserId}) =>{
    await axios.post(`${backendUrl}/user/${userId}/unfollow`,{userId:unfollowedUserId},TokenConfig())
    const {data} = await axios.get(`${backendUrl}/user`,TokenConfig())
    
    return data
}
export const followUserService = async({userId,followedUserId}) =>{
    await axios.post(`${backendUrl}/user/${userId}/follow`,{userId:followedUserId},TokenConfig())
    const {data} = await axios.get(`${backendUrl}/user`,TokenConfig())
    return data
}


