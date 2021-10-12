import axios from "axios"
import { TokenConfig } from "./userSlice"

const backendUrl = process.env.REACT_APP_BACKEND_URL

export const getCurrentUser = async() =>{
    const {data} = await axios.get(`${backendUrl}/user`,TokenConfig())
    return data
}

export const loginUser = async({email,password})=>{
    
    const {data} = await axios.post(`${backendUrl}/user/login`,{email,password})
   
    return data
}

export const registerUser = async({email,password,firstname,lastname,username,}) =>{
    const {data} = await axios.post(`${backendUrl}/user/register`,{email,password,firstname,lastname,username,})
   
    return data
}

export const editUserData = async({userId,...rest}) =>{
    const {data} = await axios.post(`${backendUrl}/user/${userId}/updateUser`,{...rest},TokenConfig())
    return data
}

export const getAllUsers = async({userId}) =>{
    const {data} = await axios.get(`${backendUrl}/user/${userId}`,TokenConfig())
    return data
}