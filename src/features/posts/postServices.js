import axios from "axios"
import { TokenConfig } from "../users/userSlice"


const backendUrl = process.env.REACT_APP_BACKEND_URL

export const getAllPostsService  = async()=>{
    const {data} = await axios.get(`${backendUrl}/feed`)
    
    return data
}

export const addNewUserPostService = async({userId,content})=>{
    await axios.post(`${backendUrl}/${userId}/newPost`,{content},TokenConfig())
    const {data} = await axios.get(`${backendUrl}/feed`)
    return data
}

export const likePostService =async({postId,userId})=>{
    const {data} = await axios.post(`${backendUrl}/${userId}/${postId}/likeUnlikePost`,{}, TokenConfig())
    
    return data
}

export const unLikePostService =async({userId,postId})=>{
    
    const {data} = await axios.put(`${backendUrl}/${userId}/${postId}/likeUnlikePost`,{},TokenConfig())
    
    return data
}