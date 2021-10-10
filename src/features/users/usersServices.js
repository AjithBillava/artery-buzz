import axios from "axios"
import { TokenConfig } from "./userSlice"

const backendUrl = process.env.REACT_APP_BACKEND_URL

export const getCurrentUser = async() =>{
    const {data} = await axios.get(`${backendUrl}/user`,TokenConfig())
    return data
}

export const loginUser = async({email,password})=>{
    console.log(password,email)
    const {data} = await axios.post(`${backendUrl}/user/login`,{email,password})
    // const {data} = await axios.post(`${backendUrl}/user/login`,{email:"test@gmail.com",password:"123456"})
    console.log(data)
    // navigate(state?.from?state.from:"/")
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