import axios from "axios"
import { TokenConfig } from "./userSlice"

const backendUrl = process.env.REACT_APP_BACKEND_URL

export const getCurrentUserService = async() =>{
    const {data} = await axios.get(`${backendUrl}/user`,TokenConfig())
    console.log({data})
    return data
}

export const loginUserService = async({email,password})=>{
    
    const {data} = await axios.post(`${backendUrl}/user/login`,{email,password})
   
    return data
}

export const registerUserService = async({email,password,firstname,lastname,username,}) =>{
    const {data} = await axios.post(`${backendUrl}/user/register`,{email,password,firstname,lastname,username,})
   
    return data
}

export const editUserDataService = async({userId,...rest}) =>{
    console.log(userId)
    await axios.post(`${backendUrl}/user/${userId}/updateUser`,{...rest},TokenConfig())
    const {data} = await axios.get(`${backendUrl}/user`,TokenConfig())
    console.log(data)
    return data
}

export const getAllUsersService = async(userId) =>{
    const {data} = await axios.get(`${backendUrl}/user/${userId}`,TokenConfig())
    console.log({data})
    return data
}
export const getUserNotificationService = async({userId}) =>{
    console.log(userId)
    const {data} = await axios.get(`${backendUrl}/user/${userId}/notifications`,TokenConfig())
    console.log({data})
    return data
}
export const readUserNotificationService = async({userId,notificationId}) =>{
    const {data} = await axios.post(`${backendUrl}/user/${userId}/notifications`,{notificationId},TokenConfig())
    return data
}
export const unFollowUserService = async({userId,unfollowedUserId}) =>{
    console.log(userId,unfollowedUserId)
    await axios.post(`${backendUrl}/user/${userId}/unfollow`,{userId:unfollowedUserId},TokenConfig())
    const {data} = await axios.get(`${backendUrl}/user`,TokenConfig())
    console.log(data)
    return data
}
export const followUserService = async({userId,followedUserId}) =>{
    await axios.post(`${backendUrl}/user/${userId}/follow`,{userId:followedUserId},TokenConfig())
    const {data} = await axios.get(`${backendUrl}/user`,TokenConfig())
    console.log(data)
    return data
}

// export const getUserProfileService = async({loggedUserId,userId}) =>{
//     const {data} =await axios.get(`${backendUrl}/user/${loggedUserId}/userProfile/${userId}`,TokenConfig())
//     console.log({data})
// }

