import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { TokenConfig } from "../users/userSlice"

const initialState = {
    status:"idle",
    posts:[],
    likesCount:0,
    error:null
}


const backendUrl = process.env.REACT_APP_BACKEND_URL

const fetchPostData = createAsyncThunk("posts/loadPosts",async()=>{
    const {data} = await axios.get(`${backendUrl}/feed`)
    console.log(data)
    return data
})

const likePost = createAsyncThunk("posts/likePost",async(userAndpostIds)=>{
    const {postId,userId}=userAndpostIds
    console.log(postId,userId)
    const {data} = await axios.post(`${backendUrl}/${userId}/${postId}/likeUnlikePost`,{}, TokenConfig())
    console.log(data)
    return data
})
const unLikePost = createAsyncThunk("posts/unlikePost",async({userId,postId})=>{
    console.log(postId,userId)
    const {data} = await axios.put(`${backendUrl}/${userId}/${postId}/likeUnlikePost`,{},TokenConfig())
    console.log(data)
    return data
})

export const postSlice = createSlice(
    {
        name:"posts",
        initialState:initialState,
        reducers:{
            // clickedPostLikeButton: (state,action)=>{
            //     const foundPost = state.posts.findIndex(post=>(post.postId = action.payload))
                
            // }
            // getCurrentPost :(state)=>{
                
            //     let currentPost = posts.filter(post=>post._id===postId)
            //     currentPost = currentPost[0]
            // }
        },
        extraReducers:{
            [fetchPostData.pending]:(state) =>{
                state.status="loading"
            },
            [fetchPostData.fulfilled]:(state,action) =>{
                state.status="fulfilled"
                state.posts = action.payload.posts
                // console.log(state.posts)
            },
            [fetchPostData.rejected]:(state,action) =>{
                state.status="error"
                state.posts = action.payload.error
            },
            [likePost.fulfilled]:(state,action)=>{
                // state.status = "fulfilled"
                state.posts = action.payload.posts
            },
            [likePost.rejected]:(state,action)=>{
                state.status = "error"
                localStorage.removeItem("token")
                state.posts = action.payload.posts
            },
            [unLikePost.fulfilled]:(state,action)=>{
                // state.status = "fulfilled"
                state.posts = action.payload.posts
            },
            [unLikePost.rejected]:(state,action)=>{
                // state.status = "fulfilled"
                state.status = "error"
                localStorage.removeItem("token")
                state.posts = action.payload.posts
            },
            
            
        }
    }
)

export {fetchPostData,likePost,unLikePost}
export default postSlice.reducer