import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    status:"idle",
    posts:[],
    likesCount:0,
    error:null
}

const backendUrl = process.env.REACT_APP_BACKEND_URL

const fetchPostData = createAsyncThunk("posts/loadPosts",async()=>{
    const {data} = await axios.get(`${backendUrl}/feed`)
    return data
})

const likePost = createAsyncThunk("posts/likePost",async(userId,postId)=>{
    const {data} = await axios.post(`${backendUrl}/${userId}/${postId}/likeUnlikePost`)
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
        },
        extraReducers:{
            [fetchPostData.pending]:(state) =>{
                state.status="loading"
            },
            [fetchPostData.fulfilled]:(state,action) =>{
                state.status="fulfilled"
                state.posts = action.payload.posts
                console.log(state.posts)
            },
            [fetchPostData.rejected]:(state,action) =>{
                state.posts="error"
                state.posts = action.payload.error
            },
            [likePost.fulfilled]:(state,action)=>{
                // state.status = "fulfilled"
                state.posts = action.payload.posts
            }
            
            
        }
    }
)

export {fetchPostData,likePost}
export default postSlice.reducer